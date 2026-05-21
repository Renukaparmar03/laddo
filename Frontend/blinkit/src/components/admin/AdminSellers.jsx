import React, { useState } from 'react';
import { 
  Search, Filter, Eye, CheckCircle, Ban, Trash2, X, MapPin, 
  ShoppingBag, Package, IndianRupee, Mail, Store, User
} from 'lucide-react';
import './AdminSellers.css';

const MOCK_SELLERS = [
  { id: 'SEL-101', shopName: 'RR Mart', ownerName: 'Rahul Sharma', email: 'contact@rrmart.com', products: 120, orders: 1245, revenue: '₹1.2M', status: 'Active', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80', address: 'Ground Floor, Silicon Park, Andheri East, Mumbai' },
  { id: 'SEL-102', shopName: 'Tech Store', ownerName: 'Priya Patel', email: 'sales@techstore.in', products: 45, orders: 856, revenue: '₹890K', status: 'Active', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&q=80', address: 'Shop 12, Phoenix Mall, Pune' },
  { id: 'SEL-103', shopName: 'Fashion Hub', ownerName: 'Neha Gupta', email: 'info@fashionhub.com', products: 300, orders: 742, revenue: '₹650K', status: 'Pending', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&q=80', address: 'Sector 17 Market, Vashi, Navi Mumbai' },
  { id: 'SEL-104', shopName: 'Fresh Foods', ownerName: 'Amit Kumar', email: 'amit@freshfoods.in', products: 80, orders: 1890, revenue: '₹420K', status: 'Active', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&q=80', address: 'Plot 4, APMC Market, Vashi, Navi Mumbai' },
  { id: 'SEL-105', shopName: 'Gadget World', ownerName: 'Vikram Singh', email: 'support@gadgetworld.com', products: 15, orders: 4, revenue: '₹12K', status: 'Blocked', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80', address: 'Linking Road, Bandra West, Mumbai' },
];

export default function AdminSellers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sellers, setSellers] = useState(MOCK_SELLERS);
  
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilter = (e) => setStatusFilter(e.target.value);

  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          seller.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          seller.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || seller.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (seller) => {
    setSelectedSeller(seller);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeller(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Blocked': return 'status-blocked';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="admin-sellers-page">
      {/* Header Section */}
      <div className="sellers-header">
        <div className="header-title">
          <h1>Sellers</h1>
          <p>Manage store vendors and their approvals</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="icon" />
            <input 
              type="text" 
              placeholder="Search by shop, owner or email..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={18} className="icon" />
            <select value={statusFilter} onChange={handleFilter}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sellers Table */}
      <div className="sellers-card card">
        <div className="table-responsive">
          {filteredSellers.length === 0 ? (
            <div className="empty-state">
              <Store size={48} className="empty-icon" />
              <h3>No Sellers Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <table className="sellers-table">
              <thead>
                <tr>
                  <th>Shop Info</th>
                  <th>Owner & Contact</th>
                  <th>Products</th>
                  <th>Orders</th>
                  <th>Revenue</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSellers.map((seller) => (
                  <tr key={seller.id}>
                    <td>
                      <div className="seller-cell">
                        <img src={seller.img} alt={seller.shopName} />
                        <div>
                          <p className="shop-name">{seller.shopName}</p>
                          <p className="seller-id">{seller.id}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <p className="owner-name">{seller.ownerName}</p>
                        <p className="email-text">{seller.email}</p>
                      </div>
                    </td>
                    <td><span className="count-badge">{seller.products}</span></td>
                    <td><span className="count-badge orders">{seller.orders}</span></td>
                    <td><span className="revenue-text">{seller.revenue}</span></td>
                    <td>
                      <span className={`status-badge ${getStatusClass(seller.status)}`}>
                        {seller.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Details" onClick={() => openModal(seller)}>
                          <Eye size={18} />
                        </button>
                        {seller.status === 'Pending' && (
                          <button className="btn-icon approve" title="Approve Seller">
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button className="btn-icon block" title="Block Seller">
                          <Ban size={18} />
                        </button>
                        <button className="btn-icon delete" title="Delete Seller">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Seller Details Modal */}
      {isModalOpen && selectedSeller && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Seller Profile</h2>
              <button className="close-btn" onClick={closeModal}><X size={24} /></button>
            </div>
            
            <div className="modal-body">
              <div className="modal-profile-header">
                <img src={selectedSeller.img} alt={selectedSeller.shopName} className="modal-seller-img" />
                <div className="modal-seller-title">
                  <h3>{selectedSeller.shopName}</h3>
                  <p>{selectedSeller.id}</p>
                  <span className={`status-badge mt-2 ${getStatusClass(selectedSeller.status)}`}>
                    {selectedSeller.status}
                  </span>
                </div>
              </div>

              <div className="modal-info-grid">
                <div className="info-item">
                  <div className="info-icon bg-blue"><User size={16} /></div>
                  <div className="info-text">
                    <label>Owner Name</label>
                    <p>{selectedSeller.ownerName}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon bg-green"><Mail size={16} /></div>
                  <div className="info-text">
                    <label>Email Address</label>
                    <p>{selectedSeller.email}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon bg-purple"><Package size={16} /></div>
                  <div className="info-text">
                    <label>Total Products</label>
                    <p>{selectedSeller.products} items</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon bg-orange"><ShoppingBag size={16} /></div>
                  <div className="info-text">
                    <label>Total Orders</label>
                    <p>{selectedSeller.orders} completed</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon bg-green-light"><IndianRupee size={16} /></div>
                  <div className="info-text">
                    <label>Total Revenue</label>
                    <p>{selectedSeller.revenue}</p>
                  </div>
                </div>
                <div className="info-item full-width">
                  <div className="info-icon bg-gray"><MapPin size={16} /></div>
                  <div className="info-text">
                    <label>Shop Address</label>
                    <p>{selectedSeller.address}</p>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                {selectedSeller.status === 'Pending' && (
                  <button className="btn-success">
                    <CheckCircle size={18} /> Approve Seller
                  </button>
                )}
                {selectedSeller.status !== 'Blocked' && (
                  <button className="btn-outline-danger">
                    <Ban size={18} /> Block Seller
                  </button>
                )}
                <button className="btn-primary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
