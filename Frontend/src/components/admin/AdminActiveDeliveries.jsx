import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, User, Package, Navigation, Phone, MessageCircle } from 'lucide-react';
import './AdminActiveDeliveries.css';

const MOCK_ACTIVE_DELIVERIES = [
  {
    orderId: 'ORD-54321',
    riderName: 'Ramesh Singh',
    customerName: 'Aarti Sharma',
    customerLocation: 'B-12, Sector 4, Rohini',
    restaurantName: 'Fresh Mart Grocery',
    status: 'On the way',
    estimatedTime: '12 mins',
    progress: 75
  },
  {
    orderId: 'ORD-54322',
    riderName: 'Suresh Kumar',
    customerName: 'Vikas Gupta',
    customerLocation: '45 Green Avenue, Andheri West',
    restaurantName: 'ElectroWorld',
    status: 'Picking up',
    estimatedTime: '25 mins',
    progress: 20
  },
  {
    orderId: 'ORD-54323',
    riderName: 'Vikram Mehta',
    customerName: 'Priya Patel',
    customerLocation: 'Sector 17, Fashion Street',
    restaurantName: 'Fashion Hub',
    status: 'Arrived at destination',
    estimatedTime: '2 mins',
    progress: 95
  },
  {
    orderId: 'ORD-54324',
    riderName: 'Abdul Rahman',
    customerName: 'Neha Singh',
    customerLocation: 'Shop 2, Tech Park',
    restaurantName: 'Tech Hub Solutions',
    status: 'On the way',
    estimatedTime: '18 mins',
    progress: 45
  }
];

export default function AdminActiveDeliveries() {
  const [deliveries, setDeliveries] = useState(MOCK_ACTIVE_DELIVERIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = d.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.riderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || d.status.includes(filterStatus);
    return matchesSearch && matchesStatus;
  });

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
