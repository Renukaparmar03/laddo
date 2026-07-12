import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Mail, Phone, ShoppingCart, IndianRupee, Shield, ShieldAlert, Star, MapPin, X, Calendar, Package, FileText, Briefcase, Eye, Edit, Ban, Trash2, Store, TrendingUp } from 'lucide-react';
import './AdminSellers.css';

export default function AdminSellers() {
  const [sellers, setSellers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedSeller, setSelectedSeller] = useState(null);

  React.useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const [sellersRes, ordersRes] = await Promise.all([
        fetch('http://localhost:5000/api/sellers?status=approved'),
        fetch('http://localhost:5000/api/orders')
      ]);
      const data = await sellersRes.json();
      const allOrders = await ordersRes.json();

      const sellerStats = {};
      data.forEach(s => {
        sellerStats[s._id] = { orders: 0, revenue: 0 };
      });

      allOrders.forEach(order => {
        const sellersInOrder = new Set();
        order.orderItems.forEach(item => {
          if (item.seller && item.seller._id) {
            const sId = item.seller._id;
            if (sellerStats[sId]) {
              if (!sellersInOrder.has(sId)) {
                 sellerStats[sId].orders += 1;
                 sellersInOrder.add(sId);
              }
              sellerStats[sId].revenue += (item.price * item.qty);
            }
          }
        });
      });

      const formatted = data.map(seller => ({
        id: seller._id,
        shopName: seller.businessName || seller.ownerName,
        ownerName: seller.ownerName,
        email: seller.email,
        phone: seller.phone,
        gstStatus: seller.gstNumber ? 'Verified' : 'Pending',
        revenue: '₹' + (sellerStats[seller._id]?.revenue || 0).toLocaleString(),
        orders: sellerStats[seller._id]?.orders || 0,
        status: seller.status === 'approved' ? 'Active' : seller.status,
        rating: 0,
        image: seller.logo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
        address: seller.address,
        category: seller.businessType || 'General',
        joinDate: new Date(seller.createdAt).toLocaleDateString(),
        pan: seller.panNumber || 'N/A',
        bankName: seller.bankName || 'N/A',
        accountNo: seller.accountNumber || 'N/A',
        ifsc: seller.ifscCode || 'N/A',
        accountHolder: seller.accountHolderName || 'N/A',
        gstin: seller.gstNumber || 'N/A',
        fssai: seller.fssaiNumber || 'N/A'
      }));
      setSellers(formatted);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteSeller = async (id) => {
    // You can also add backend DELETE route, for now we just remove from UI
    setSellers(sellers.filter(s => s.id !== id));
  };

  const filteredSellers = sellers.filter(seller => {
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

      <div className="table-responsive" style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Seller Info</th>
              <th>Contact Details</th>
              <th>Status & GST</th>
              <th>Orders</th>
              <th>Revenue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSellers.map((seller) => (
              <tr key={seller.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={seller.image} alt={seller.ownerName} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '0.95rem', color: '#1f2937' }}>{seller.shopName}</h4>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#6b7280' }}>{seller.ownerName}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}><Mail size={12} /> {seller.email}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={12} /> {seller.phone}</div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <span className={`status-badge ${seller.status.toLowerCase().replace(' ', '-')}`} style={{ width: 'max-content' }}>
                      {seller.status}
                    </span>
                    <div className={`gst-status ${seller.gstStatus.toLowerCase()}`} style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', width: 'max-content' }}>
                      {seller.gstStatus === 'Verified' ? <Shield size={12} /> : <ShieldAlert size={12} />}
                      <span>GST {seller.gstStatus}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <strong>{seller.orders}</strong>
                </td>
                <td>
                  <strong>{seller.revenue}</strong>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setSelectedSeller(seller)} style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#3b82f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="View">
                      <Eye size={16} />
                    </button>
                    <button style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#fff7ed', color: '#f97316', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Block">
                      <Ban size={16} />
                    </button>
                    <button onClick={() => handleDeleteSeller(seller.id)} style={{ padding: '6px', borderRadius: '6px', backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
