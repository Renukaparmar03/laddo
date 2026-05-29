import React, { useState, useEffect } from 'react';
import { Bell, Store, Truck, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminApp.css'; // Reuse general admin styles or inline styles

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const [sellersRes, deliveryRes] = await Promise.all([
        fetch('http://localhost:5000/api/sellers?status=pending'),
        fetch('http://localhost:5000/api/delivery')
      ]);

      const sellersData = await sellersRes.json();
      const deliveryData = await deliveryRes.json();

      const notifs = [];

      // Add Seller Requests
      if (Array.isArray(sellersData)) {
        sellersData.forEach(seller => {
          notifs.push({
            id: `seller_${seller._id}`,
            type: 'seller',
            title: 'New Seller Registration',
            message: `${seller.businessName || seller.ownerName} has registered and is waiting for approval.`,
            time: seller.createdAt,
            icon: <Store size={20} className="text-blue" />,
            action: () => navigate('/admin/seller-requests')
          });
        });
      }

      // Add Delivery Partner Requests
      if (Array.isArray(deliveryData)) {
        const pendingDeliveries = deliveryData.filter(d => d.status === 'pending');
        pendingDeliveries.forEach(delivery => {
          notifs.push({
            id: `delivery_${delivery._id}`,
            type: 'delivery',
            title: 'New Delivery Partner',
            message: `${delivery.name || delivery.fullName} has applied as a delivery partner.`,
            time: delivery.createdAt || new Date(),
            icon: <Truck size={20} className="text-orange" />,
            action: () => navigate('/admin/delivery-requests')
          });
        });
      }

      // Sort by newest first
      notifs.sort((a, b) => new Date(b.time) - new Date(a.time));
      
      setNotifications(notifs);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Loading notifications...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
        <Bell size={28} className="text-green" />
        <h2>All Notifications</h2>
      </div>

      {notifications.length === 0 ? (
        <div className="card" style={{ padding: '50px', textAlign: 'center' }}>
          <Bell size={48} style={{ color: '#ccc', margin: '0 auto 15px' }} />
          <h3>All caught up!</h3>
          <p style={{ color: '#666' }}>You have no pending requests or alerts.</p>
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
                borderLeft: notif.type === 'seller' ? '4px solid #3b82f6' : '4px solid #f97316'
              }}
              onClick={notif.action}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ 
                  padding: '10px', 
                  borderRadius: '10px', 
                  backgroundColor: notif.type === 'seller' ? '#eff6ff' : '#fff7ed' 
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
                  Review <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
