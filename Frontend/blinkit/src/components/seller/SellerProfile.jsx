import React from 'react';
import { 
  User, Mail, Phone, MapPin, Building, CreditCard, 
  Package, ShoppingCart, IndianRupee, Star, 
  Edit, Key, Activity, CheckCircle, Upload
} from 'lucide-react';
import './SellerProfile.css';

const SELLER_INFO = {
  personal: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Business Avenue",
    city: "Mumbai",
    country: "India",
  },
  shop: {
    name: "RR Mart",
    category: "Electronics & Accessories",
    gstNumber: "27AABCU9603R1ZX",
    businessType: "Retail Provider",
    shopAddress: "Ground Floor, Silicon Park, Andheri East, Mumbai",
  },
  performance: {
    products: 124,
    orders: 856,
    revenue: "₹1,24,500",
    rating: 4.8
  },
  activities: [
    { id: 1, action: "Completed order #ORD-10294", time: "2 hours ago", icon: <ShoppingCart size={16} />, type: "success" },
    { id: 2, action: "Added new product 'Smart Watch Series 5'", time: "5 hours ago", icon: <Package size={16} />, type: "info" },
    { id: 3, action: "Updated stock for 'Wireless Headphones'", time: "Yesterday", icon: <Activity size={16} />, type: "warning" },
    { id: 4, action: "Completed order #ORD-10280", time: "Yesterday", icon: <ShoppingCart size={16} />, type: "success" },
  ]
};

export default function SellerProfile() {
  return (
    <div className="seller-profile-page">
      {/* Header Section */}
      <div className="profile-header-bar">
        <div className="header-title">
          <h1>Profile</h1>
          <p>Manage your personal and shop information</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary">
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="profile-layout">
        {/* Left Column */}
        <div className="profile-left-col">
          {/* Profile Card Section */}
          <div className="profile-main-card card">
            <div className="profile-image-container">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="Profile" className="profile-large-img" />
              <button className="img-upload-btn">
                <Upload size={16} />
              </button>
            </div>
            <div className="profile-basic-info">
              <div className="name-status">
                <h2>{SELLER_INFO.personal.fullName}</h2>
                <span className="status-badge online">Online</span>
              </div>
              <p className="email"><Mail size={14}/> {SELLER_INFO.personal.email}</p>
              <p className="shop-name"><Building size={14}/> {SELLER_INFO.shop.name}</p>
            </div>
            
            <div className="profile-action-buttons">
              <button className="btn-secondary w-full">
                <Edit size={18} /> Edit Details
              </button>
              <button className="btn-outline w-full">
                <Key size={18} /> Change Password
              </button>
            </div>
          </div>

          {/* Performance Summary Cards */}
          <div className="performance-grid">
            <div className="perf-card">
              <div className="perf-icon bg-purple"><Package size={20} /></div>
              <div className="perf-info">
                <p>Products</p>
                <h4>{SELLER_INFO.performance.products}</h4>
              </div>
            </div>
            <div className="perf-card">
              <div className="perf-icon bg-blue"><ShoppingCart size={20} /></div>
              <div className="perf-info">
                <p>Orders</p>
                <h4>{SELLER_INFO.performance.orders}</h4>
              </div>
            </div>
            <div className="perf-card">
              <div className="perf-icon bg-green"><IndianRupee size={20} /></div>
              <div className="perf-info">
                <p>Revenue</p>
                <h4>{SELLER_INFO.performance.revenue}</h4>
              </div>
            </div>
            <div className="perf-card">
              <div className="perf-icon bg-orange"><Star size={20} /></div>
              <div className="perf-info">
                <p>Rating</p>
                <h4>{SELLER_INFO.performance.rating} / 5.0</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right-col">
          {/* Personal Information Section */}
          <div className="info-card card">
            <div className="card-header">
              <h3>Personal Information</h3>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <div className="info-value"><User size={16} /> {SELLER_INFO.personal.fullName}</div>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <div className="info-value"><Mail size={16} /> {SELLER_INFO.personal.email}</div>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <div className="info-value"><Phone size={16} /> {SELLER_INFO.personal.phone}</div>
              </div>
              <div className="info-item">
                <label>City</label>
                <div className="info-value"><MapPin size={16} /> {SELLER_INFO.personal.city}</div>
              </div>
              <div className="info-item">
                <label>Country</label>
                <div className="info-value"><MapPin size={16} /> {SELLER_INFO.personal.country}</div>
              </div>
              <div className="info-item full-width">
                <label>Address</label>
                <div className="info-value"><MapPin size={16} /> {SELLER_INFO.personal.address}</div>
              </div>
            </div>
          </div>

          {/* Shop Information Section */}
          <div className="info-card card">
            <div className="card-header">
              <h3>Shop Information</h3>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Shop Name</label>
                <div className="info-value"><Building size={16} /> {SELLER_INFO.shop.name}</div>
              </div>
              <div className="info-item">
                <label>Shop Category</label>
                <div className="info-value"><Package size={16} /> {SELLER_INFO.shop.category}</div>
              </div>
              <div className="info-item">
                <label>GST Number</label>
                <div className="info-value"><CreditCard size={16} /> {SELLER_INFO.shop.gstNumber}</div>
              </div>
              <div className="info-item">
                <label>Business Type</label>
                <div className="info-value"><Building size={16} /> {SELLER_INFO.shop.businessType}</div>
              </div>
              <div className="info-item full-width">
                <label>Shop Address</label>
                <div className="info-value"><MapPin size={16} /> {SELLER_INFO.shop.shopAddress}</div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="activity-card card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-timeline">
              {SELLER_INFO.activities.map(activity => (
                <div className="activity-item" key={activity.id}>
                  <div className={`activity-icon-wrapper ${activity.type}`}>
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.action}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
