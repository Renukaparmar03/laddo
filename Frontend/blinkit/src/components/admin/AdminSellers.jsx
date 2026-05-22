import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, ShoppingCart, IndianRupee, Shield, ShieldAlert, Star, MapPin, X, Calendar, Package, FileText, Briefcase, Eye, Edit, Ban, Trash2 } from 'lucide-react';
import './AdminSellers.css';

const MOCK_SELLERS = [
  {
    id: 'SLR-1001',
    shopName: 'ElectroWorld',
    ownerName: 'Rahul Sharma',
    email: 'rahul@electroworld.com',
    phone: '+91 9876543210',
    gstStatus: 'Verified',
    revenue: '₹4,250,000',
    orders: 1245,
    status: 'Active',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    address: '123 Tech Park, Sector 4, New Delhi, 110001',
    category: 'Electronics',
    fssai: 'Not Applicable',
    gstin: '07AAPCE4332F1Z1',
    pan: 'AAPCE4332F',
    bankName: 'HDFC Bank',
    accountNo: 'XXXX-XXXX-1234',
    ifsc: 'HDFC0001234',
    accountHolder: 'Rahul Sharma',
    productsCount: 450,
    joinDate: '12 Jan 2023',
  },
  {
    id: 'SLR-1002',
    shopName: 'Fresh Mart Grocery',
    ownerName: 'Priya Patel',
    email: 'priya.p@freshmart.in',
    phone: '+91 9123456780',
    gstStatus: 'Pending',
    revenue: '₹3,800,000',
    orders: 3412,
    status: 'Active',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
    address: '45 Green Avenue, Andheri West, Mumbai, 400053',
    category: 'Groceries & Staples',
    fssai: '11521014000456',
    gstin: '27AABCP1234F1Z5',
    pan: 'AABCP1234F',
    bankName: 'ICICI Bank',
    accountNo: 'XXXX-XXXX-5678',
    ifsc: 'ICIC0005678',
    accountHolder: 'Priya Patel',
    productsCount: 1200,
    joinDate: '05 Mar 2023',
  },
  {
    id: 'SLR-1003',
    shopName: 'Fashion Hub',
    ownerName: 'Amit Kumar',
    email: 'contact@fashionhub.com',
    phone: '+91 9988776655',
    gstStatus: 'Verified',
    revenue: '₹2,900,000',
    orders: 856,
    status: 'Suspended',
    rating: 3.2,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    address: 'Shop No 12, Fashion Street, Pune, 411001',
    category: 'Apparel & Fashion',
    fssai: 'Not Applicable',
    gstin: '27AAICA9876C1Z2',
    pan: 'AAICA9876C',
    bankName: 'State Bank of India',
    accountNo: 'XXXX-XXXX-9012',
    ifsc: 'SBIN0009012',
    accountHolder: 'Amit Kumar Fashion',
    productsCount: 320,
    joinDate: '22 Aug 2023',
  },
  {
    id: 'SLR-1004',
    shopName: 'Daily Needs',
    ownerName: 'Vikram Singh',
    email: 'vikram.s@dailyneeds.in',
    phone: '+91 9876501234',
    gstStatus: 'Unverified',
    revenue: '₹850,000',
    orders: 420,
    status: 'Under Review',
    rating: 0,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
    address: 'Sector 18 Market, Noida, 201301',
    category: 'Daily Essentials',
    fssai: '12719055000321',
    gstin: '09AABCU4321R1Z9',
    pan: 'AABCU4321R',
    bankName: 'Axis Bank',
    accountNo: 'XXXX-XXXX-3456',
    ifsc: 'UTIB0003456',
    accountHolder: 'Vikram Singh',
    productsCount: 85,
    joinDate: '15 Oct 2023',
  }
];

export default function AdminSellers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedSeller, setSelectedSeller] = useState(null);

  const filteredSellers = MOCK_SELLERS.filter(seller => {
    const matchesSearch = seller.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          seller.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || seller.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-all-sellers">
      <div className="page-header">
        <div className="header-title">
          <h2>Seller Management</h2>
          <p>Manage and monitor all registered sellers on the platform</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search sellers by name or shop..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Under Review">Under Review</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div className="sellers-grid">
        {filteredSellers.map((seller) => (
          <div className="seller-card" key={seller.id}>
            <div className="seller-card-header">
              <img src={seller.image} alt={seller.ownerName} className="seller-image" />
              <div className="seller-header-info">
                <h3>{seller.shopName}</h3>
                <p className="owner-name">{seller.ownerName}</p>
              </div>
            </div>

            <div className="seller-status-row">
              <span className={`status-badge ${seller.status.toLowerCase().replace(' ', '-')}`}>
                {seller.status}
              </span>
              <div className={`gst-status ${seller.gstStatus.toLowerCase()}`}>
                {seller.gstStatus === 'Verified' ? <Shield size={14} /> : <ShieldAlert size={14} />}
                <span>GST {seller.gstStatus}</span>
              </div>
            </div>

            <div className="seller-contact-info">
              <div className="contact-item">
                <Mail size={14} />
                <span>{seller.email}</span>
              </div>
              <div className="contact-item">
                <Phone size={14} />
                <span>{seller.phone}</span>
              </div>
            </div>

            <div className="seller-stats-grid">
              <div className="stat-box">
                <div className="stat-icon-small bg-green">
                  <IndianRupee size={16} />
                </div>
                <div className="stat-data">
                  <span>Revenue</span>
                  <strong>{seller.revenue}</strong>
                </div>
              </div>
              
              <div className="stat-box">
                <div className="stat-icon-small bg-blue">
                  <ShoppingCart size={16} />
                </div>
                <div className="stat-data">
                  <span>Orders</span>
                  <strong>{seller.orders}</strong>
                </div>
              </div>
            </div>

            <div className="seller-card-actions">
              <button className="btn-action view" onClick={() => setSelectedSeller(seller)}>
                <Eye size={16} /> View Full Detail
              </button>
              <div className="action-row">
                <button className="btn-action block flex-1">
                  <Ban size={16} /> Block Seller
                </button>
                <button className="btn-action delete flex-1">
                  <Trash2 size={16} /> Delete Seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Seller Full Profile Modal */}
      {selectedSeller && (
        <div className="seller-modal-overlay" onClick={() => setSelectedSeller(null)}>
          <div className="seller-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Seller Profile</h2>
              <button className="close-modal-btn" onClick={() => setSelectedSeller(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="profile-hero">
                <img src={selectedSeller.image} alt={selectedSeller.ownerName} className="profile-hero-img" />
                <div className="profile-hero-info">
                  <h2>{selectedSeller.ownerName}</h2>
                  <p className="profile-id">ID: {selectedSeller.id}</p>
                  <span className={`status-badge ${selectedSeller.status.toLowerCase().replace(' ', '-')}`} style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                    {selectedSeller.status}
                  </span>
                </div>
              </div>

              <div className="profile-details-grid">
                {/* Shop Information */}
                <div className="detail-section">
                  <h3><Store size={18} /> Shop Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Shop Name</span>
                    <span className="detail-value">{selectedSeller.shopName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Address</span>
                    <span className="detail-value"><MapPin size={14} className="inline-icon" /> {selectedSeller.address}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value"><Mail size={14} className="inline-icon" /> {selectedSeller.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value"><Phone size={14} className="inline-icon" /> {selectedSeller.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Category</span>
                    <span className="detail-value">{selectedSeller.category}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">GST Status</span>
                    <span className="detail-value">{selectedSeller.gstStatus} ({selectedSeller.gstin})</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">FSSAI Number</span>
                    <span className="detail-value">{selectedSeller.fssai}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Joined On</span>
                    <span className="detail-value"><Calendar size={14} className="inline-icon" /> {selectedSeller.joinDate}</span>
                  </div>
                </div>

                {/* Business Information */}
                <div className="detail-section">
                  <h3><Briefcase size={18} /> Business Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">PAN Number</span>
                    <span className="detail-value">{selectedSeller.pan}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Bank Name</span>
                    <span className="detail-value">{selectedSeller.bankName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Account Number</span>
                    <span className="detail-value">{selectedSeller.accountNo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">IFSC Code</span>
                    <span className="detail-value">{selectedSeller.ifsc}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Account Holder</span>
                    <span className="detail-value">{selectedSeller.accountHolder}</span>
                  </div>
                </div>

                {/* Statistics */}
                <div className="detail-section full-width">
                  <h3><TrendingUp size={18} /> Statistics</h3>
                  <div className="stats-cards-mini">
                    <div className="stat-card-mini">
                      <Package size={20} className="text-purple" />
                      <div>
                        <p>Total Products</p>
                        <h4>{selectedSeller.productsCount}</h4>
                      </div>
                    </div>
                    <div className="stat-card-mini">
                      <ShoppingCart size={20} className="text-blue" />
                      <div>
                        <p>Orders Completed</p>
                        <h4>{selectedSeller.orders}</h4>
                      </div>
                    </div>
                    <div className="stat-card-mini">
                      <IndianRupee size={20} className="text-green" />
                      <div>
                        <p>Total Revenue</p>
                        <h4>{selectedSeller.revenue}</h4>
                      </div>
                    </div>
                    <div className="stat-card-mini">
                      <Star size={20} className="text-yellow" />
                      <div>
                        <p>Seller Ratings</p>
                        <h4>{selectedSeller.rating > 0 ? `${selectedSeller.rating} / 5.0` : 'No Ratings'}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedSeller(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
