import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '../config/api';

const SOCKET_SERVER_URL = API_BASE_URL;

export const useSocket = (role, id) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // For delivery role, we still need to connect even if personal id is missing
    // so we can join the general 'delivery_boys' broadcast room.
    if (!role) return;
    if (!id && role !== 'delivery') return;

    console.log(`[useSocket] Connecting as ${role} ${id || 'anonymous'}`);

    const newSocket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
    });

    newSocket.on('connect', () => {
      console.log(`[useSocket] Connected to socket server with ID: ${newSocket.id}, role: ${role}, userId: ${id || 'N/A'}`);
      if (id) {
        newSocket.emit('joinRoom', { role, id });
        console.log(`[useSocket] Emitted joinRoom for ${role}_${id}`);
      }
      
      // If delivery boy, join general delivery room as well
      if (role === 'delivery') {
        newSocket.emit('joinDeliveryRoom');
        console.log(`[useSocket] Emitted joinDeliveryRoom for delivery boy`);
      }
    });

    newSocket.on('connect_error', (error) => {
      console.error(`[useSocket] Connection error:`, error);
    });

    newSocket.on('disconnect', () => {
      console.log(`[useSocket] Disconnected from socket server`);
    });

    setSocket(newSocket);

    return () => {
      console.log(`[useSocket] Cleaning up socket connection for ${role}`);
      newSocket.disconnect();
    };
  }, [role, id]);

  return socket;
};
