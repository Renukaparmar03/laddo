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

    const handleOrderUpdated = (updatedOrder) => {
      // Show generic alert if rejected by seller
      if (updatedOrder.status === 'Rejected') {
        alert(`Your order #${updatedOrder.orderId || updatedOrder._id.substring(0,8).toUpperCase()} was rejected. Reason: ${updatedOrder.rejectionReason}`);
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
            <div className="order-empty-state">
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <h3 className="order-text-primary">No orders yet</h3>
              <p className="order-text-secondary">Looks like you haven't placed any orders yet.</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order._id} className="order-history-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color, #eee)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div>
                    <p className="order-text-secondary" style={{ margin: 0, fontSize: '12px' }}>Order ID: {order._id.substring(0,8).toUpperCase()}</p>
                    <p className="order-text-muted" style={{ margin: '4px 0 0 0', fontSize: '12px' }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="order-status-badge" style={{ 
                      fontSize: '12px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px',
                      background: order.status === 'Rejected' || order.status === 'Cancelled' ? '#fee2e2' : order.status === 'Delivered' ? '#dcfce7' : '#fef9c3',
                      color: order.status === 'Rejected' || order.status === 'Cancelled' ? '#ef4444' : order.status === 'Delivered' ? '#16a34a' : '#ca8a04'
                    }}>
                      {order.status === 'Delivery Rejected' ? 'Preparing' : order.status}
                    </span>
                  </div>
                </div>
                
                {order.status === 'Rejected' && order.rejectionReason && (
                  <div className="order-alert rejected-alert">
                    <strong>Reason for rejection:</strong> {order.rejectionReason}
                  </div>
                )}

                {(order.status === 'Assigned' || order.status === 'Picked Up' || order.status === 'Out for Delivery') && (
                  <div className="order-alert assigned-alert">
                    <strong>Delivery OTP: {order.deliveryOtp || '5678'}</strong><br/>
                    <span style={{ fontSize: '12px' }}>Share this code with the delivery partner to receive your order.</span>
                  </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {order.orderItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.image} alt={item.title} className="order-item-img" />
                      <div style={{ flex: 1 }}>
                        <p className="order-text-primary" style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>{item.title}</p>
                        <p className="order-text-secondary" style={{ margin: 0, fontSize: '12px' }}>Qty: {item.qty}</p>
                      </div>
                      <p className="order-text-primary" style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>₹{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="order-total-row">
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
