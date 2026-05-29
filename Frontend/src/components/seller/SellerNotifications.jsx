import React, { useState, useEffect } from 'react';
import { Bell, ShoppingCart, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SellerApp.css'; // Using the global layout styles

export default function SellerNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellerNotifications();
  }, []);

  const fetchSellerNotifications = async () => {
    try {
      setLoading(true);
      const info = localStorage.getItem('seller_info');
      if (info) {
        const parsed = JSON.parse(info);
        const sellerId = parsed._id || parsed.id;

        if (sellerId) {
          const res = await fetch(`http://localhost:5000/api/orders/seller/${sellerId}`);
          if (res.ok) {
            const data = await res.json();
            const notifs = [];

            if (data.orders) {
              const pendingOrders = data.orders.filter(o => o.status === 'Pending');
              
              pendingOrders.forEach(order => {
                notifs.push({
                  id: order._id,
                  type: 'order',
                  title: 'New Order Request',
                  message: `You have received a new order for ${order.orderItems?.[0]?.title || 'items'} worth ₹${order.totalPrice}.`,
                  time: order.createdAt,
                  icon: <ShoppingCart size={20} className="text-blue" />,
                  action: () => navigate('/seller/orders')
                });
              });
            }

            // Sort by newest first
            notifs.sort((a, b) => new Date(b.time) - new Date(a.time));
            setNotifications(notifs);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch seller notifications', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading your notifications...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
        <Bell size={28} className="text-green" />
        <h2>Seller Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <div className="card" style={{ padding: '50px', textAlign: 'center' }}>
          <Bell size={48} style={{ color: '#ccc', margin: '0 auto 15px' }} />
          <h3>All caught up!</h3>
          <p style={{ color: '#666' }}>You have no pending orders or alerts at this time.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {notifications.map(notif => (
            <div 
              key={notif.id} 
              className="card" 
              style={{ 
                padding: '20px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                borderLeft: '4px solid #3b82f6'
              }}
              onClick={notif.action}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ 
                  padding: '10px', 
                  borderRadius: '10px', 
                  backgroundColor: '#eff6ff' 
                }}>
                  {notif.icon}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{notif.title}</h4>
                  <p style={{ margin: '0 0 8px 0', color: '#4b5563' }}>{notif.message}</p>
                  <span style={{ fontSize: '0.85rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={12} />
                    {new Date(notif.time).toLocaleString()}
                  </span>
                </div>
              </div>
              <div>
                <button 
                  className="btn-text" 
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#3b82f6' }}
                >
                  Manage Order <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
