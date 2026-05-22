import React, { useState } from 'react';
import { Search, Filter, Eye, Ban, MapPin, Phone, Star, Bike, Navigation } from 'lucide-react';
import './AdminDeliveryPartners.css';

const MOCK_PARTNERS = [
  {
    id: 'RID-101',
    name: 'Ramesh Singh',
    phone: '+91 9876543210',
    vehicleNo: 'MH-12-AB-1234',
    vehicleType: 'Two Wheeler (Bike)',
    rating: 4.9,
    deliveries: 1245,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    location: 'Sector 4, Rohini',
    joinDate: '12 Jan 2023'
  },
  {
    id: 'RID-102',
    name: 'Suresh Kumar',
    phone: '+91 9876543211',
    vehicleNo: 'MH-14-CD-5678',
    vehicleType: 'Electric Scooter',
    rating: 4.8,
    deliveries: 890,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    location: 'Andheri West',
    joinDate: '05 Mar 2023'
  },
  {
    id: 'RID-103',
    name: 'Abdul Rahman',
    phone: '+91 9876543212',
    vehicleNo: 'DL-01-XY-9012',
    vehicleType: 'Two Wheeler (Bike)',
    rating: 4.6,
    deliveries: 156,
    status: 'Offline',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    location: 'Koramangala',
    joinDate: '20 Apr 2024'
  },
  {
    id: 'RID-104',
    name: 'Vikram Mehta',
    phone: '+91 9876543213',
    vehicleNo: 'KA-05-PQ-3456',
    vehicleType: 'Bicycle',
    rating: 4.2,
    deliveries: 45,
    status: 'Suspended',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    location: 'HSR Layout',
    joinDate: '10 May 2024'
  }
];

export default function AdminDeliveryPartners() {
  const [partners, setPartners] = useState(MOCK_PARTNERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPartner, setSelectedPartner] = useState(null);

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAction = (id, action) => {
    if (action === 'block') {
      setPartners(partners.map(p => p.id === id ? { ...p, status: 'Suspended' } : p));
    } else if (action === 'assign') {
      alert(`Assigning order to rider ID: ${id}`);
    }
  };

  return (
    <div className="admin-delivery-partners">
      <div className="page-header">
        <div className="header-title">
          <h2>Delivery Partners</h2>
          <p>Manage your fleet of delivery riders</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Offline">Offline</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div className="partners-grid">
        {filteredPartners.map((partner) => (
          <div className="partner-card" key={partner.id}>
            <div className="partner-card-header">
              <img src={partner.image} alt={partner.name} className="partner-img" />
              <div className="partner-title">
                <h3>{partner.name}</h3>
                <p>ID: {partner.id}</p>
              </div>
              <span className={`status-dot ${partner.status.toLowerCase()}`}></span>
            </div>

            <div className="partner-stats-row">
              <div className="stat-badge rating">
                <Star size={14} className="star-icon" />
                <span>{partner.rating}</span>
              </div>
              <div className="stat-badge deliveries">
                <strong>{partner.deliveries}</strong> Deliveries
              </div>
              <div className={`stat-badge status-label ${partner.status.toLowerCase()}`}>
                {partner.status}
              </div>
            </div>

            <div className="partner-details">
              <div className="detail-item">
                <Phone size={16} className="detail-icon" />
                <span>{partner.phone}</span>
              </div>
              <div className="detail-item">
                <Bike size={16} className="detail-icon" />
                <span>{partner.vehicleNo} • {partner.vehicleType}</span>
              </div>
              <div className="detail-item">
                <MapPin size={16} className="detail-icon" />
                <span>{partner.location}</span>
              </div>
            </div>

            <div className="partner-actions">
              <button className="btn-action view" onClick={() => setSelectedPartner(partner)}>
                <Eye size={16} /> View
              </button>
              <div className="action-row">
                <button 
                  className="btn-action block flex-1" 
                  onClick={() => handleAction(partner.id, 'block')}
                  disabled={partner.status === 'Suspended'}
                >
                  <Ban size={16} /> {partner.status === 'Suspended' ? 'Blocked' : 'Block'}
                </button>
                <button 
                  className="btn-action assign flex-1"
                  onClick={() => handleAction(partner.id, 'assign')}
                  disabled={partner.status !== 'Active'}
                >
                  <Navigation size={16} /> Assign Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Details Panel */}
      {selectedPartner && (
        <div className="partner-modal-overlay" onClick={() => setSelectedPartner(null)}>
          <div className="partner-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Rider Profile</h2>
              <button className="close-btn" onClick={() => setSelectedPartner(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="profile-hero">
                <img src={selectedPartner.image} alt={selectedPartner.name} />
                <div className="hero-info">
                  <h2>{selectedPartner.name}</h2>
                  <p>ID: {selectedPartner.id}</p>
                  <span className={`status-badge ${selectedPartner.status.toLowerCase()}`}>
                    {selectedPartner.status}
                  </span>
                </div>
              </div>
              
              <div className="details-grid">
                <div className="info-box">
                  <label>Phone Number</label>
                  <p>{selectedPartner.phone}</p>
                </div>
                <div className="info-box">
                  <label>Joined Date</label>
                  <p>{selectedPartner.joinDate}</p>
                </div>
                <div className="info-box">
                  <label>Vehicle Number</label>
                  <p>{selectedPartner.vehicleNo}</p>
                </div>
                <div className="info-box">
                  <label>Vehicle Type</label>
                  <p>{selectedPartner.vehicleType}</p>
                </div>
                <div className="info-box">
                  <label>Current Location</label>
                  <p>{selectedPartner.location}</p>
                </div>
                <div className="info-box">
                  <label>Rating & Experience</label>
                  <p>{selectedPartner.rating} Star • {selectedPartner.deliveries} Deliveries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
