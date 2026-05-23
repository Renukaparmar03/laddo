import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, PlusCircle, MoreVertical, Star, 
  MapPin, Phone, Bike, Navigation, X, ShieldAlert, 
  CheckCircle, Package, User, Clock, MoreHorizontal
} from 'lucide-react';
import './AdminDelivery.css';

const INITIAL_PARTNERS = [
  {
    id: 'RDR-101',
    name: 'Rahul Kumar',
    phone: '+91 9876543210',
    vehicle: 'Honda Activa',
    vehicleNo: 'MH 01 AB 1234',
    rating: 4.8,
    assignedOrders: 1,
    completedDeliveries: 452,
    status: 'Active',
    earnings: '₹12,450',
    joinDate: '12 Jan 2024',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80'
  },
  {
    id: 'RDR-102',
    name: 'Suresh Patil',
    phone: '+91 9876543211',
    vehicle: 'Bajaj Pulsar',
    vehicleNo: 'MH 02 CD 5678',
    rating: 4.5,
    assignedOrders: 3,
    completedDeliveries: 890,
    status: 'Busy',
    earnings: '₹24,100',
    joinDate: '05 Nov 2023',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'
  },
  {
    id: 'RDR-103',
    name: 'Amit Singh',
    phone: '+91 9876543212',
    vehicle: 'Hero Splendor',
    vehicleNo: 'UP 14 XY 9999',
    rating: 4.2,
    assignedOrders: 0,
    completedDeliveries: 120,
    status: 'Offline',
    earnings: '₹3,200',
    joinDate: '01 Mar 2024',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&q=80'
  },
  {
    id: 'RDR-104',
    name: 'Vikash Sharma',
    phone: '+91 9876543213',
    vehicle: 'TVS Jupiter',
    vehicleNo: 'DL 04 ZX 8888',
    rating: 3.8,
    assignedOrders: 0,
    completedDeliveries: 45,
    status: 'Blocked',
    earnings: '₹1,150',
    joinDate: '15 Apr 2024',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
  }
];

export default function AdminDelivery() {
  const [partners, setPartners] = useState(INITIAL_PARTNERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedRider, setSelectedRider] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: 'Honda Activa',
    vehicleNo: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.vehicleNo.trim()) newErrors.vehicleNo = 'Vehicle number is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPartner = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newPartner = {
        id: `RDR-${Date.now().toString().slice(-3)}`,
        name: formData.name,
        phone: formData.phone,
        vehicle: formData.vehicle,
        vehicleNo: formData.vehicleNo.toUpperCase(),
        rating: 5.0,
        assignedOrders: 0,
        completedDeliveries: 0,
        status: 'Active',
        earnings: '₹0',
        joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        image: formData.image
      };

      setPartners([newPartner, ...partners]);
      setIsAddModalOpen(false);
      setFormData({ name: '', phone: '', vehicle: 'Honda Activa', vehicleNo: '', image: '' });
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  // Filter riders based on search and status
  const filteredRiders = useMemo(() => {
    return partners.filter(rider => {
      const matchesSearch = 
        rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rider.phone.includes(searchTerm) ||
        rider.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || rider.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, partners]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active': return <span className="status-badge success">Active</span>;
      case 'Busy': return <span className="status-badge warning">Busy</span>;
      case 'Offline': return <span className="status-badge neutral">Offline</span>;
      case 'Blocked': return <span className="status-badge danger">Blocked</span>;
      default: return <span className="status-badge neutral">{status}</span>;
    }
  };

  return (
    <div className="admin-delivery-page">
      {/* Success Toast */}
      {showSuccess && (
        <div className="success-toast">
          <CheckCircle size={20} />
          <span>Partner added successfully!</span>
        </div>
      )}

      {/* Header Section */}
      <div className="page-header">
        <div className="header-title">
          <h1>Delivery Partners</h1>
          <p>Manage fleet, track riders, and monitor delivery performance</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name, phone, or vehicle..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Busy">Busy</option>
            <option value="Offline">Offline</option>
            <option value="Blocked">Blocked</option>
          </select>
          <button className="btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <PlusCircle size={18} /> Add Partner
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-light"><Bike size={24} className="text-blue" /></div>
          <div className="stat-info">
            <p>Total Partners</p>
            <h3>{partners.length}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green-light"><Navigation size={24} className="text-green" /></div>
          <div className="stat-info">
            <p>Active Riders</p>
            <h3>86</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange-light"><Package size={24} className="text-orange" /></div>
          <div className="stat-info">
            <p>Orders Delivered</p>
            <h3>1,507</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-purple-light"><Star size={24} className="text-purple" /></div>
          <div className="stat-info">
            <p>Average Rating</p>
            <h3>4.6/5.0</h3>
          </div>
        </div>
      </div>

      <div className="delivery-layout">
        {/* Main Table Area */}
        <div className="delivery-table-card card">
          <div className="card-header">
            <h3>Fleet Directory</h3>
          </div>
          
          {filteredRiders.length > 0 ? (
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Rider Info</th>
                    <th>Vehicle</th>
                    <th>Assigned</th>
                    <th>Completed</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRiders.map((rider) => (
                    <tr key={rider.id}>
                      <td>
                        <div className="rider-cell">
                          <img src={rider.image} alt={rider.name} className="rider-avatar" />
                          <div className="rider-info-txt">
                            <h4 className="font-medium">{rider.name}</h4>
                            <p className="text-sm text-gray">{rider.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="vehicle-cell">
                          <span className="font-medium">{rider.vehicle}</span>
                          <span className="text-xs text-gray">{rider.vehicleNo}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`assigned-badge ${rider.assignedOrders > 0 ? 'active' : ''}`}>
                          {rider.assignedOrders} Orders
                        </span>
                      </td>
                      <td><span className="font-medium">{rider.completedDeliveries}</span></td>
                      <td>
                        <div className="rating-cell">
                          <Star size={14} className="star-icon" fill="currentColor" />
                          <span>{rider.rating}</span>
                        </div>
                      </td>
                      <td>{getStatusBadge(rider.status)}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon" title="View Details" onClick={() => setSelectedRider(rider)}>
                            <User size={18} />
                          </button>
                          <button className="btn-icon text-blue" title="Assign Order">
                            <PlusCircle size={18} />
                          </button>
                          <button className="btn-icon text-red" title="Block Rider">
                            <ShieldAlert size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <Bike size={48} className="empty-icon" />
              <h3>No Delivery Partners Found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>

        {/* Recent Activity Sidebar */}
        <div className="recent-activity-card card">
          <div className="card-header">
            <h3>Live Activity</h3>
          </div>
          <div className="activity-timeline">
            <div className="activity-item">
              <div className="act-icon bg-green"><CheckCircle size={14} /></div>
              <div className="act-content">
                <p><strong>Order Delivered</strong></p>
                <span>Suresh Patil delivered #ORD-8921</span>
                <div className="act-time">2 mins ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="act-icon bg-blue"><Navigation size={14} /></div>
              <div className="act-content">
                <p><strong>Rider Assigned</strong></p>
                <span>Rahul Kumar assigned to #ORD-8923</span>
                <div className="act-time">15 mins ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="act-icon bg-orange"><User size={14} /></div>
              <div className="act-content">
                <p><strong>New Rider Joined</strong></p>
                <span>Vikash Sharma completed onboarding</span>
                <div className="act-time">1 hour ago</div>
              </div>
            </div>
            <div className="activity-item">
              <div className="act-icon bg-purple"><Star size={14} /></div>
              <div className="act-content">
                <p><strong>5-Star Rating</strong></p>
                <span>Amit Singh received 5 stars</span>
                <div className="act-time">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedRider && (
        <div className="modal-overlay" onClick={() => setSelectedRider(null)}>
          <div className="modal-content rider-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Partner Details</h3>
              <button className="close-btn" onClick={() => setSelectedRider(null)}><X size={20} /></button>
            </div>
            
            <div className="modal-body">
              <div className="rider-modal-header">
                <img src={selectedRider.image} alt={selectedRider.name} className="rider-modal-img" />
                <div className="rider-modal-title">
                  <h2>{selectedRider.name}</h2>
                  <p>{selectedRider.id}</p>
                  <div className="mt-2">{getStatusBadge(selectedRider.status)}</div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-box">
                  <span className="info-label"><Phone size={14} /> Phone</span>
                  <span className="info-value">{selectedRider.phone}</span>
                </div>
                <div className="info-box">
                  <span className="info-label"><Clock size={14} /> Joined</span>
                  <span className="info-value">{selectedRider.joinDate}</span>
                </div>
                <div className="info-box">
                  <span className="info-label"><Bike size={14} /> Vehicle</span>
                  <span className="info-value">{selectedRider.vehicle}</span>
                  <span className="info-subtext">{selectedRider.vehicleNo}</span>
                </div>
                <div className="info-box">
                  <span className="info-label"><IndianRupee size={14} /> Total Earnings</span>
                  <span className="info-value text-green">{selectedRider.earnings}</span>
                </div>
              </div>

              <div className="stats-box mt-4">
                <h4>Performance Overview</h4>
                <div className="perf-grid">
                  <div className="perf-item">
                    <p>Total Deliveries</p>
                    <h3>{selectedRider.completedDeliveries}</h3>
                  </div>
                  <div className="perf-item">
                    <p>Avg Rating</p>
                    <div className="rating-flex">
                      <h3>{selectedRider.rating}</h3>
                      <Star size={16} className="star-icon" fill="currentColor" />
                    </div>
                  </div>
                  <div className="perf-item">
                    <p>Current Assigned</p>
                    <h3>{selectedRider.assignedOrders}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-outline text-red" onClick={() => {
                setPartners(partners.filter(p => p.id !== selectedRider.id));
                setSelectedRider(null);
              }}>Delete Rider</button>
              <div className="modal-actions-right">
                <button className="btn-outline" onClick={() => setSelectedRider(null)}>Cancel</button>
                <button className="btn-primary">Assign Order</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Partner Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content rider-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Delivery Partner</h3>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleAddPartner}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Profile Image URL</label>
                  <input 
                    type="text" 
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleInputChange}
                    className={errors.image ? 'input-error' : ''}
                  />
                  {errors.image && <span className="error-text">{errors.image}</span>}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      placeholder="e.g. Rahul Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'input-error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label>Vehicle Type</label>
                    <select 
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleInputChange}
                    >
                      <option value="Honda Activa">Honda Activa</option>
                      <option value="Bajaj Pulsar">Bajaj Pulsar</option>
                      <option value="Hero Splendor">Hero Splendor</option>
                      <option value="TVS Jupiter">TVS Jupiter</option>
                      <option value="Electric Bike">Electric Bike</option>
                      <option value="Bicycle">Bicycle</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Vehicle Registration Number</label>
                    <input 
                      type="text" 
                      name="vehicleNo"
                      placeholder="e.g. MH 01 AB 1234"
                      value={formData.vehicleNo}
                      onChange={handleInputChange}
                      className={errors.vehicleNo ? 'input-error' : ''}
                    />
                    {errors.vehicleNo && <span className="error-text">{errors.vehicleNo}</span>}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Register Partner</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
