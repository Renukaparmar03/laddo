import React, { useState, useEffect } from 'react';
import { 
  User, Bell, Store, Palette, Shield, 
  HelpCircle, ChevronRight, Check
} from 'lucide-react';
import './SellerSettings.css';

export default function SellerSettings() {
  // Notification States
  const [orderNotifs, setOrderNotifs] = useState(() => JSON.parse(localStorage.getItem('seller_order_notifs') ?? 'true'));
  const [emailNotifs, setEmailNotifs] = useState(() => JSON.parse(localStorage.getItem('seller_email_notifs') ?? 'false'));
  const [stockAlerts, setStockAlerts] = useState(() => JSON.parse(localStorage.getItem('seller_stock_alerts') ?? 'true'));
  
  // Appearance States
  const [isDarkMode, setIsDarkMode] = useState(() => JSON.parse(localStorage.getItem('seller_dark_mode') ?? 'false'));
  
  // Security States
  const [twoFactor, setTwoFactor] = useState(() => JSON.parse(localStorage.getItem('seller_two_factor') ?? 'false'));

  // Persist settings
  useEffect(() => {
    localStorage.setItem('seller_order_notifs', JSON.stringify(orderNotifs));
    localStorage.setItem('seller_email_notifs', JSON.stringify(emailNotifs));
    localStorage.setItem('seller_stock_alerts', JSON.stringify(stockAlerts));
    localStorage.setItem('seller_two_factor', JSON.stringify(twoFactor));
    localStorage.setItem('seller_dark_mode', JSON.stringify(isDarkMode));

    // Apply dark mode to body
    if (isDarkMode) {
      document.body.classList.add('seller-dark-theme');
    } else {
      document.body.classList.remove('seller-dark-theme');
    }
  }, [orderNotifs, emailNotifs, stockAlerts, twoFactor, isDarkMode]);

  return (
    <div className="seller-settings-page">
      {/* Header Section */}
      <div className="settings-header">
        <div className="header-title">
          <h1>Settings</h1>
          <p>Manage your account preferences and store configurations</p>
        </div>
      </div>

      <div className="settings-grid">
        {/* Account Settings Section */}
        <div className="settings-card card">
          <div className="card-header-icon">
            <User className="section-icon text-purple" size={24} />
            <h2>Account Settings</h2>
          </div>
          <div className="settings-list">
            <button className="settings-list-item">
              <div className="item-content">
                <span className="item-title">Edit Profile</span>
                <span className="item-desc">Update your personal information</span>
              </div>
              <ChevronRight size={20} className="text-muted" />
            </button>
            <button className="settings-list-item">
              <div className="item-content">
                <span className="item-title">Update Email</span>
                <span className="item-desc">Change your primary contact email</span>
              </div>
              <ChevronRight size={20} className="text-muted" />
            </button>
            <button className="settings-list-item">
              <div className="item-content">
                <span className="item-title">Update Phone Number</span>
                <span className="item-desc">Change your registered mobile number</span>
              </div>
              <ChevronRight size={20} className="text-muted" />
            </button>
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className="settings-card card">
          <div className="card-header-icon">
            <Bell className="section-icon text-purple" size={24} />
            <h2>Notification Settings</h2>
          </div>
          <div className="settings-list">
            <div className="settings-list-item no-hover">
              <div className="item-content">
                <span className="item-title">Order Notifications</span>
                <span className="item-desc">Get notified for new and updated orders</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={orderNotifs} onChange={() => setOrderNotifs(!orderNotifs)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="settings-list-item no-hover">
              <div className="item-content">
                <span className="item-title">Email Notifications</span>
                <span className="item-desc">Receive weekly reports and updates via email</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="settings-list-item no-hover">
              <div className="item-content">
                <span className="item-title">Stock Alerts</span>
                <span className="item-desc">Get alerted when products are running low on stock</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={stockAlerts} onChange={() => setStockAlerts(!stockAlerts)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Store Settings Section */}
        <div className="settings-card card">
          <div className="card-header-icon">
            <Store className="section-icon text-purple" size={24} />
            <h2>Store Settings</h2>
          </div>
          <div className="store-details-form">
            <div className="form-group">
              <label>Shop Name</label>
              <input type="text" defaultValue="RR Mart" className="form-input" />
            </div>
            <div className="form-group">
              <label>Business Category</label>
              <select className="form-input" defaultValue="Electronics & Accessories">
                <option>Electronics & Accessories</option>
                <option>Fashion</option>
                <option>Groceries</option>
                <option>Home & Furniture</option>
              </select>
            </div>
            <div className="form-group">
              <label>Shop Address</label>
              <textarea defaultValue="Ground Floor, Silicon Park, Andheri East, Mumbai" className="form-input" rows="3"></textarea>
            </div>
            <button className="btn-primary w-max mt-2">Save Store Details</button>
          </div>
        </div>

        {/* Appearance Settings Section */}
        <div className="settings-card card">
          <div className="card-header-icon">
            <Palette className="section-icon text-purple" size={24} />
            <h2>Appearance Settings</h2>
          </div>
          <div className="appearance-options">
            <div className={`theme-option ${!isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(false)}>
              <div className="theme-preview light">
                <div className="preview-header"></div>
                <div className="preview-body"></div>
              </div>
              <span className="theme-label">Light Mode</span>
              {!isDarkMode && <div className="active-check"><Check size={14} /></div>}
            </div>
            <div className={`theme-option ${isDarkMode ? 'active' : ''}`} onClick={() => setIsDarkMode(true)}>
              <div className="theme-preview dark">
                <div className="preview-header"></div>
                <div className="preview-body"></div>
              </div>
              <span className="theme-label">Dark Mode</span>
              {isDarkMode && <div className="active-check"><Check size={14} /></div>}
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="settings-card card">
          <div className="card-header-icon">
            <Shield className="section-icon text-purple" size={24} />
            <h2>Security</h2>
          </div>
          <div className="settings-list">
            <button className="settings-list-item">
              <div className="item-content">
                <span className="item-title">Change Password</span>
                <span className="item-desc">Update your login password securely</span>
              </div>
              <ChevronRight size={20} className="text-muted" />
            </button>
            <button className="settings-list-item">
              <div className="item-content">
                <span className="item-title">Login Activity</span>
                <span className="item-desc">Review your recent login sessions</span>
              </div>
              <ChevronRight size={20} className="text-muted" />
            </button>
            <div className="settings-list-item no-hover">
              <div className="item-content">
                <span className="item-title">Two-Factor Authentication</span>
                <span className="item-desc">Add an extra layer of security to your account</span>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>

        {/* Help & Support Section */}
        <div className="settings-card card">
          <div className="card-header-icon">
            <HelpCircle className="section-icon text-purple" size={24} />
            <h2>Help & Support</h2>
          </div>
          <div className="support-buttons">
            <button className="btn-support">
              Contact Support
            </button>
            <button className="btn-support">
              Frequently Asked Questions (FAQ)
            </button>
            <button className="btn-support outline">
              Report a Problem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
