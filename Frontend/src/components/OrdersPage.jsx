import React from 'react';
import ProductCard from './ProductCard';
import { RefreshCw, Sparkles, ShoppingBag } from 'lucide-react';
import { useSocket } from '../hooks/useSocket';

const OrdersPage = ({ onProductSelect }) => {
  const [orders, setOrders] = React.useState([]);

  const userInfoStr = localStorage.getItem('user_info');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userId = userInfo ? (userInfo._id || userInfo.id) : null;

  const socket = useSocket('user', userId);

  React.useEffect(() => {
    if (!socket) return;

    const playNotificationSound = () => {
      const audio = new Audio('/assets/notification.mpeg');
      audio.play().catch(e => {
        // Silently catch autoplay restriction errors on the user panel
        console.warn('Audio autoplay blocked for user order panel:', e.message);
      });
    };

    const handleOrderUpdated = (updatedOrder) => {
      // Play sound and show generic alert if rejected by seller
      if (updatedOrder.status === 'Rejected') {
        playNotificationSound();
        alert(`Your order #${updatedOrder.orderId || updatedOrder._id.substring(0,8).toUpperCase()} was rejected. Reason: ${updatedOrder.rejectionReason}`);
      } else {
        // Just play a tiny sound for other updates
        playNotificationSound();
      }

      setOrders(prevOrders => prevOrders.map(order => 
        order._id === updatedOrder._id ? updatedOrder : order
      ));
    };

    socket.on('orderUpdated', handleOrderUpdated);

    return () => {
      socket.off('orderUpdated', handleOrderUpdated);
    };
  }, [socket]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userId) {
          const res = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        }
      } catch (err) {
        console.error('Error fetching user orders:', err);
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="orders-page">
      {/* Reordering Banner */}
      <div className="reorder-banner">
        <div className="banner-glow"></div>
        <div className="reorder-banner-content">
          <div className="reorder-icon-wrapper">
            <RefreshCw size={24} className="reorder-spin-icon" />
          </div>
          <div className="reorder-text-content">
            <h2>reordering will be easy</h2>
            <p>Get your favorite essentials delivered in one click</p>
          </div>
          <div className="banner-sparkle">
            <Sparkles size={20} fill="#fff" color="#fff" />
          </div>
        </div>
      </div>

      {/* Past Orders Section */}
      <section className="past-orders-section">
        <div className="orders-section-header">
          <ShoppingBag size={18} className="orders-section-icon" />
          <h3 className="section-title">Your Order History</h3>
        </div>
        <div style={{ padding: '0 16px' }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666', background: '#fff', borderRadius: '12px', marginTop: '16px' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <h3>No orders yet</h3>
              <p>Looks like you haven't placed any orders yet.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order._id} style={{ background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Order ID: {order._id.substring(0,8).toUpperCase()}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#999' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px',
                      background: order.status === 'Rejected' || order.status === 'Cancelled' ? '#fee2e2' : order.status === 'Delivered' ? '#dcfce7' : '#fef9c3',
                      color: order.status === 'Rejected' || order.status === 'Cancelled' ? '#ef4444' : order.status === 'Delivered' ? '#16a34a' : '#ca8a04'
                    }}>
                      {order.status === 'Delivery Rejected' ? 'Preparing' : order.status}
                    </span>
                  </div>
                </div>
                
                {order.status === 'Rejected' && order.rejectionReason && (
                  <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '12px', margin: '0 0 12px 0', fontSize: '13px', color: '#b91c1c', borderRadius: '4px' }}>
                    <strong>Reason for rejection:</strong> {order.rejectionReason}
                  </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {order.orderItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.title} style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: '#333' }}>{item.title}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Qty: {item.qty}</p>
                      </div>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>₹{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #eee', paddingTop: '12px', marginTop: '12px', fontWeight: 'bold' }}>
                  <span>Total Amount</span>
                  <span>₹{order.totalPrice}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
