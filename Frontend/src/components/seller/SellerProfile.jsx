import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Building, CreditCard, 
  Package, ShoppingCart, IndianRupee, Star, 
  Edit, Key, Activity, CheckCircle, Upload
} from 'lucide-react';
import './SellerProfile.css';

export default function SellerProfile() {
  const [seller, setSeller] = useState({
    businessName: "Store Name",
    email: "email@example.com",
    phone: "N/A",
    address: "N/A",
    ownerName: "Owner Name"
  });

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    rating: 5.0
  });

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const storedSeller = localStorage.getItem('seller_info');
        if (storedSeller) {
          const parsed = JSON.parse(storedSeller);
          setSeller(parsed);
          
          const sellerId = parsed._id || parsed.id;
          if (sellerId) {
            // Fetch stats
            const productsRes = await fetch(`http://localhost:5000/api/products?sellerId=${sellerId}`);
            const productsData = await productsRes.json();
            
            const ordersRes = await fetch(`http://localhost:5000/api/orders/seller/${sellerId}`);
            const ordersData = await ordersRes.json();
            
            setStats({
              products: Array.isArray(productsData) ? productsData.length : 0,
              orders: ordersData.totalOrders || 0,
              revenue: ordersData.totalSales || 0,
              rating: 5.0
            });
          }
        }
      } catch (error) {
        console.error('Error fetching seller profile stats:', error);
      }
    };
    
    fetchSellerData();
  }, []);
  
  // Minimal static activities for UI placeholder
  const activities = [
    { id: 1, action: "Logged into Seller Panel", time: "Just now", icon: <Activity size={16} />, type: "info" }
  ];

  return (
    <div className="seller-profile-page">
      {/* Header Section */}
      <div className="profile-header-bar">
        <div className="header-title">
          <h1>My Profile</h1>
          <p>Manage your personal and store information</p>
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
            <div className="profile-cover">
              <img src="https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80" alt="Cover" className="cover-img" />
              <button className="cover-edit-btn">
                <Upload size={14} /> Edit Cover
              </button>
            </div>
            <div className="profile-image-container">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="Profile" className="profile-large-img" />
              <button className="img-upload-btn">
                <Upload size={16} />
              </button>
            </div>
            <div className="profile-basic-info">
              <div className="name-status">
                <h2>{seller.ownerName || seller.businessName}</h2>
                <span className="status-badge online">Active</span>
              </div>
              <p className="shop-name"><Building size={14}/> {seller.businessName}</p>
              <p className="email"><Mail size={14}/> {seller.email}</p>
              <div className="join-date">Member since 2026</div>
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
                <h4>{stats.products}</h4>
              </div>
            </div>
            <div className="perf-card">
              <div className="perf-icon bg-blue"><ShoppingCart size={20} /></div>
              <div className="perf-info">
                <p>Orders</p>
                <h4>{stats.orders}</h4>
              </div>
            </div>
            <div className="perf-card">
              <div className="perf-icon bg-green"><IndianRupee size={20} /></div>
              <div className="perf-info">
                <p>Revenue</p>
                <h4>₹{stats.revenue.toLocaleString()}</h4>
              </div>
            </div>
            <div className="perf-card">
              <div className="perf-icon bg-orange"><Star size={20} /></div>
              <div className="perf-info">
                <p>Rating</p>
                <h4>{stats.rating} / 5.0</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right-col">
          {/* Personal Information Section */}
          <div className="info-card card">
            <div className="card-header">
              <h3><User size={20} className="text-purple" /> Personal Information</h3>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <div className="info-value">{seller.ownerName || seller.businessName}</div>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <div className="info-value">{seller.email}</div>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <div className="info-value">{seller.phone || 'N/A'}</div>
              </div>
              <div className="info-item">
                <label>City</label>
                <div className="info-value">N/A</div>
              </div>
              <div className="info-item">
                <label>Country</label>
                <div className="info-value">India</div>
              </div>
              <div className="info-item full-width">
                <label>Address</label>
                <div className="info-value">{seller.address || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Shop Information Section */}
          <div className="info-card card">
            <div className="card-header">
              <h3><Building size={20} className="text-blue" /> Shop Information</h3>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <label>Shop Name</label>
                <div className="info-value">{seller.businessName}</div>
              </div>
              <div className="info-item">
                <label>Shop Category</label>
                <div className="info-value">General</div>
              </div>
              <div className="info-item">
                <label>GST Number</label>
                <div className="info-value">Pending</div>
              </div>
              <div className="info-item">
                <label>Business Type</label>
                <div className="info-value">Retail Provider</div>
              </div>
              <div className="info-item full-width">
                <label>Shop Address</label>
                <div className="info-value">{seller.address || 'N/A'}</div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="activity-card card">
            <div className="card-header">
              <h3><Activity size={20} className="text-green" /> Recent Activity</h3>
            </div>
            <div className="activity-timeline">
              {activities.map(activity => (
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
