import React from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit3, Key, 
  Settings, Users, Store, ShoppingCart, IndianRupee,
  CheckCircle, Activity, FileText
} from 'lucide-react';
import './AdminProfile.css';

export default function AdminProfile() {
  return (
    <div className="admin-profile-page">
      <div className="profile-header-clean">
        <div>
          <h1 className="profile-title">Administrator Profile</h1>
          <p className="profile-subtitle">Manage your account settings, activity, and overview</p>
        </div>
      </div>
      
      <div className="profile-main-content">
        <div className="profile-left-col">
          {/* Profile Card */}
          <div className="profile-card card">
            <div className="profile-img-container">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80" alt="Admin" className="admin-large-img" />
              <button className="edit-img-btn"><Edit3 size={16} /></button>
            </div>
            
            <h2 className="admin-name">Super Admin</h2>
            <p className="admin-email">admin@laddoecommerce.com</p>
            <span className="role-badge">Super Admin</span>
            
            <div className="admin-details">
              <div className="detail-row">
                <Phone size={16} className="text-gray" />
                <span>+91 98765 43210</span>
              </div>
              <div className="detail-row">
                <MapPin size={16} className="text-gray" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="detail-row">
                <Calendar size={16} className="text-gray" />
                <span>Joined Jan 2024</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn-primary w-full"><Edit3 size={16} /> Edit Profile</button>
              <button className="btn-outline w-full"><Key size={16} /> Change Password</button>
            </div>
          </div>
        </div>

        <div className="profile-right-col">
          {/* Analytics Cards */}
          <div className="analytics-grid">
            <div className="stat-card">
              <div className="stat-icon bg-blue-light text-blue"><Users size={24} /></div>
              <div className="stat-info">
                <p>Users Managed</p>
                <h3>14,592</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-purple-light text-purple"><Store size={24} /></div>
              <div className="stat-info">
                <p>Total Sellers</p>
                <h3>845</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-orange-light text-orange"><ShoppingCart size={24} /></div>
              <div className="stat-info">
                <p>Total Orders</p>
                <h3>42,891</h3>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-green-light text-green"><IndianRupee size={24} /></div>
              <div className="stat-info">
                <p>Total Revenue</p>
                <h3>₹8.4M</h3>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity-card card mt-4">
            <div className="card-header">
              <h3>Recent Admin Activity</h3>
              <button className="btn-link">View All</button>
            </div>
            <div className="activity-timeline">
              <div className="activity-item">
                <div className="act-icon bg-green"><CheckCircle size={14} /></div>
                <div className="act-content">
                  <p><strong>Seller Approved</strong></p>
                  <span>Approved application for "Fresh Foods Mart"</span>
                  <div className="act-time">10 mins ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="act-icon bg-blue"><Activity size={14} /></div>
                <div className="act-content">
                  <p><strong>Order Managed</strong></p>
                  <span>Resolved refund issue for Order #ORD-1031</span>
                  <div className="act-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="act-icon bg-purple"><FileText size={14} /></div>
                <div className="act-content">
                  <p><strong>Report Resolved</strong></p>
                  <span>Closed complaint #REP-1026 against a seller</span>
                  <div className="act-time">Yesterday at 14:30</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="act-icon bg-orange"><Settings size={14} /></div>
                <div className="act-content">
                  <p><strong>System Settings Updated</strong></p>
                  <span>Changed platform commission percentage to 5%</span>
                  <div className="act-time">May 20, 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
