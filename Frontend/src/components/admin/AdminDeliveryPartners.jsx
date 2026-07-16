import React, { useState } from 'react';
import { Search, Filter, Eye, Ban, MapPin, Phone, Star, Bike, Navigation } from 'lucide-react';
import './AdminDeliveryPartners.css';

export default function AdminDeliveryPartners() {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPartner, setSelectedPartner] = useState(null);

  React.useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const [delRes, ordersRes] = await Promise.all([
        fetch('http://localhost:5000/api/delivery'),
        fetch('http://localhost:5000/api/orders')
      ]);
      const data = await delRes.json();
      const allOrders = await ordersRes.json();
      
      const riderDeliveries = {};
      allOrders.forEach(o => {
        if (o.status === 'Delivered') {
          const dBoyId = o.deliveryBoy?._id || o.deliveryBoy;
          if (dBoyId) {
             riderDeliveries[dBoyId] = (riderDeliveries[dBoyId] || 0) + 1;
          }
        }
      });
      
      const approvedPartners = data
        .filter(p => p.status === 'approved')
        .map(p => ({
          id: p._id,
          name: p.name,
          phone: p.phone,
          vehicleNo: p.licenseNo || 'N/A',
          vehicleType: p.vehicle,
          rating: 4.8, // Fallback realistic rating
          deliveries: riderDeliveries[p._id] || 0, // Real delivery count
          status: 'Active', 
          image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
          location: p.city,
          joinDate: new Date(p.createdAt).toLocaleDateString()
        }));
        
      setPartners(approvedPartners);
    } catch (err) {
      console.error(err);
    }
  };

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

      <div className="table-responsive" style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Rider Info</th>
              <th>Contact & Location</th>
              <th>Vehicle Details</th>
              <th>Status</th>
              <th>Performance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartners.map((partner) => (
              <tr key={partner.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={partner.image} alt={partner.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#1f2937' }}>{partner.name}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>ID: {partner.id}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><Phone size={12} /> {partner.phone}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={12} /> {partner.location}</div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><Bike size={12} /> {partner.vehicleNo}</div>
                    <div style={{ color: '#6b7280' }}>{partner.vehicleType}</div>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${partner.status.toLowerCase()}`} style={{ padding: '4px 8px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '500' }}>
                    {partner.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: '#f59e0b', fontWeight: '600' }}>
                      <Star size={14} fill="currentColor" /> {partner.rating}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {partner.deliveries} deliveries
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setSelectedPartner(partner)} style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#3b82f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="View">
                      <Eye size={16} />
                    </button>
                    <button onClick={() => handleAction(partner.id, 'assign')} disabled={partner.status !== 'Active'} style={{ padding: '6px', borderRadius: '6px', backgroundColor: partner.status === 'Active' ? '#ecfdf5' : '#f3f4f6', color: partner.status === 'Active' ? '#10b981' : '#9ca3af', border: 'none', cursor: partner.status === 'Active' ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Assign Order">
                      <Navigation size={16} />
                    </button>
                    <button onClick={() => handleAction(partner.id, 'block')} disabled={partner.status === 'Suspended'} style={{ padding: '6px', borderRadius: '6px', backgroundColor: partner.status === 'Suspended' ? '#f3f4f6' : '#fff7ed', color: partner.status === 'Suspended' ? '#9ca3af' : '#f97316', border: 'none', cursor: partner.status === 'Suspended' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={partner.status === 'Suspended' ? 'Blocked' : 'Block'}>
                      <Ban size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
