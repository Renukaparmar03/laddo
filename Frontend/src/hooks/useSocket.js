import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000';

export const useSocket = (role, id) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // For delivery role, we still need to connect even if personal id is missing
    // so we can join the general 'delivery_boys' broadcast room.
    if (!role) return;
    if (!id && role !== 'delivery') return;

    const newSocket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log(`Connected to socket server as ${role} ${id || 'anonymous'}`);
      if (id) {
        newSocket.emit('joinRoom', { role, id });
      }
      
      // If delivery boy, join general delivery room as well
      if (role === 'delivery') {
        newSocket.emit('joinDeliveryRoom');
        console.log('Joined delivery_boys broadcast room');
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [role, id]);

  return socket;
};
