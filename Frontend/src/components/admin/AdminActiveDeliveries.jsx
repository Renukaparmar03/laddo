import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, User, Package, Navigation, Phone, MessageCircle } from 'lucide-react';
import './AdminActiveDeliveries.css';

export default function AdminActiveDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  React.useEffect(() => {
    fetchActiveDeliveries();
  }, []);

  const fetchActiveDeliveries = async () => {
    try {
      setLoading(true);
      const [delRes, sellersRes] = await Promise.all([
        fetch('http://localhost:5000/api/delivery'),
        fetch('http://localhost:5000/api/sellers')
      ]);

      const riders = await delRes.json();
      const sellers = await sellersRes.json();

      let allOrders = [];
      await Promise.all(sellers.map(async (seller) => {
        try {
          const orderRes = await fetch(`http://localhost:5000/api/orders/seller/${seller._id}`);
          const orderData = await orderRes.json();
          if (orderData.orders) {
            orderData.orders.forEach(o => o.sellerInfo = seller);
            allOrders = [...allOrders, ...orderData.orders];
          }
        } catch (e) {}
      }));

      const uniqueOrdersMap = new Map();
      allOrders.forEach(o => uniqueOrdersMap.set(o._id, o));
      const uniqueOrders = Array.from(uniqueOrdersMap.values());

      const activeOrderStatuses = ['Assigned', 'Picked Up', 'Out for Delivery'];
      const active = uniqueOrders.filter(o => activeOrderStatuses.includes(o.status));

      const dynamicDeliveries = active.reduce((acc, order) => {
        const dBoyId = order.deliveryBoy?._id || order.deliveryBoy;
        const rider = riders.find(r => r._id === dBoyId && r.status === 'approved');
        
        if (!rider) return acc; // Skip if no active delivery partner
        
        let progress = 10;
        let estimatedTime = '30 mins';
        let uiStatus = 'Assigned';
        
        if (order.status === 'Picked Up') {
          progress = 50;
          estimatedTime = '15 mins';
          uiStatus = 'Picking up';
        } else if (order.status === 'Out for Delivery') {
          progress = 80;
          estimatedTime = '5 mins';
          uiStatus = 'On the way';
        }

        acc.push({
          orderId: order.orderId || order._id.substring(0,8).toUpperCase(),
          riderName: rider.name || rider.fullName,
          customerName: 'Customer',
          customerLocation: `${order.shippingAddress?.address || ''}, ${order.shippingAddress?.city || ''}`,
          restaurantName: order.sellerInfo ? (order.sellerInfo.businessName || order.sellerInfo.ownerName) : 'Unknown Store',
          status: uiStatus,
          estimatedTime,
          progress
        });

        return acc;
      }, []);

      setDeliveries(dynamicDeliveries);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = d.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.riderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || d.status.includes(filterStatus);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="admin-active-deliveries"><div style={{padding: '50px', textAlign: 'center'}}>Tracking live active deliveries...</div></div>;
  }

  return (
    <div className="admin-active-deliveries">
      <div className="page-header">
        <div className="header-title">
          <h2>Active Deliveries</h2>
          <p>Track live orders and delivery progress</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Order ID or Rider..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Picking up">Picking up</option>
              <option value="On the way">On the way</option>
              <option value="Arrived">Arrived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="deliveries-grid">
        {filteredDeliveries.length === 0 ? (
          <div className="empty-state">
            <Package size={48} className="empty-icon" />
            <h3>No Active Deliveries</h3>
            <p>There are currently no live orders matching your criteria.</p>
          </div>
        ) : (
          filteredDeliveries.map((delivery) => (
            <div className="delivery-card" key={delivery.orderId}>
              <div className="card-top">
                <div className="order-id-badge">
                  <Package size={14} /> {delivery.orderId}
                </div>
                <div className={`status-pill ${delivery.status.toLowerCase().replace(/ /g, '-')}`}>
                  <Navigation size={14} /> {delivery.status}
                </div>
              </div>

              <div className="progress-section">
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${delivery.progress}%` }}></div>
                </div>
                <div className="time-estimate">
                  <Clock size={14} className="text-blue" />
                  <span>Est. Time: <strong>{delivery.estimatedTime}</strong></span>
                </div>
              </div>

              <div className="route-details">
                <div className="route-point">
                  <div className="point-icon store"><MapPin size={12} /></div>
                  <div className="point-info">
                    <span className="label">Pickup</span>
                    <span className="value">{delivery.restaurantName}</span>
                  </div>
                </div>
                <div className="route-line"></div>
                <div className="route-point">
                  <div className="point-icon customer"><MapPin size={12} /></div>
                  <div className="point-info">
                    <span className="label">Dropoff</span>
                    <span className="value">{delivery.customerLocation}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="rider-info">
                  <div className="rider-avatar">{delivery.riderName.charAt(0)}</div>
                  <div className="rider-name">
                    <span className="label">Assigned Rider</span>
                    <span className="value">{delivery.riderName}</span>
                  </div>
                </div>
                <div className="footer-actions">
                  <button className="icon-btn" title="Call Rider"><Phone size={16} /></button>
                  <button className="icon-btn" title="Message Support"><MessageCircle size={16} /></button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
