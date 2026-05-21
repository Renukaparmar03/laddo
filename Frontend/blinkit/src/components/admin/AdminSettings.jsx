import React, { useState } from 'react';
import { 
  Bell, Shield, Monitor, CreditCard, Sliders, LifeBuoy, 
  Save, Key, Smartphone, Clock, CheckCircle2, ChevronRight 
} from 'lucide-react';
import './AdminSettings.css';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('platform');

  const [toggles, setToggles] = useState({
    orderNotif: true,
    sellerNotif: true,
    reportNotif: false,
    emailNotif: true,
    twoFactor: false,
    darkMode: false,
    cod: true,
    onlinePayment: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ label, desc, stateKey }) => (
    <div className="setting-row">
      <div className="setting-info">
        <h4>{label}</h4>
        {desc && <p>{desc}</p>}
      </div>
      <div 
        className={`toggle-switch ${toggles[stateKey] ? 'active' : ''}`}
        onClick={() => handleToggle(stateKey)}
      >
        <div className="toggle-thumb"></div>
      </div>
    </div>
  );

  return (
    <div className="admin-settings-page">
      {/* Header Section */}
      <div className="settings-header">
        <div className="header-title">
          <h1>Settings</h1>
          <p>Manage platform configurations and preferences</p>
        </div>
        <button className="btn-primary">
          <Save size={18} /> Save Changes
        </button>
      </div>

      <div className="settings-layout">
        {/* Settings Sidebar Tabs */}
        <div className="settings-sidebar card">
          <button className={`tab-btn ${activeTab === 'platform' ? 'active' : ''}`} onClick={() => setActiveTab('platform')}>
            <Monitor size={18} /> Platform Settings
          </button>
          <button className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>
            <CreditCard size={18} /> Payment Config
          </button>
          <button className={`tab-btn ${activeTab === 'notification' ? 'active' : ''}`} onClick={() => setActiveTab('notification')}>
            <Bell size={18} /> Notifications
          </button>
          <button className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            <Shield size={18} /> Security
          </button>
          <button className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`} onClick={() => setActiveTab('preferences')}>
            <Sliders size={18} /> Preferences
          </button>
          <button className={`tab-btn ${activeTab === 'support' ? 'active' : ''}`} onClick={() => setActiveTab('support')}>
            <LifeBuoy size={18} /> Help & Support
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="settings-content">
          
          {/* PLATFORM SETTINGS */}
          {activeTab === 'platform' && (
            <div className="settings-section card">
              <div className="section-header">
                <h3>Platform Settings</h3>
                <p>Configure core marketplace details</p>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label>Platform Name</label>
                  <input type="text" defaultValue="Laddo Ecommerce" />
                </div>
                <div className="form-group">
                  <label>Currency</label>
                  <select defaultValue="INR">
                    <option value="INR">₹ Indian Rupee (INR)</option>
                    <option value="USD">$ US Dollar (USD)</option>
                    <option value="EUR">€ Euro (EUR)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tax Percentage (%)</label>
                  <input type="number" defaultValue="18" />
                </div>
                <div className="form-group">
                  <label>Default Delivery Charges</label>
                  <input type="number" defaultValue="40" />
                </div>
                <div className="form-group full-width">
                  <label>Platform Commission Percentage (%)</label>
                  <input type="number" defaultValue="5" />
                  <small>This percentage will be deducted from seller payouts.</small>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATION SETTINGS */}
          {activeTab === 'notification' && (
            <div className="settings-section card">
              <div className="section-header">
                <h3>Notification Settings</h3>
                <p>Manage alert preferences for admin events</p>
              </div>
              <div className="settings-list">
                <ToggleSwitch 
                  label="Order Notifications" 
                  desc="Receive alerts when new orders are placed" 
                  stateKey="orderNotif" 
                />
                <ToggleSwitch 
                  label="Seller Requests Alerts" 
                  desc="Get notified when a new seller registers" 
                  stateKey="sellerNotif" 
                />
                <ToggleSwitch 
                  label="Reports Notifications" 
                  desc="Alert me when a high-priority report is filed" 
                  stateKey="reportNotif" 
                />
                <ToggleSwitch 
                  label="Email Notifications" 
                  desc="Receive daily summary emails" 
                  stateKey="emailNotif" 
                />
              </div>
            </div>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === 'security' && (
            <>
              <div className="settings-section card">
                <div className="section-header">
                  <h3>Security Settings</h3>
                  <p>Protect your admin account</p>
                </div>
                
                <div className="password-section">
                  <div className="pwd-info">
                    <Key size={20} className="text-gray" />
                    <div>
                      <h4>Password</h4>
                      <p>Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button className="btn-outline">Change Password</button>
                </div>

                <div className="divider"></div>

                <ToggleSwitch 
                  label="Two-Factor Authentication (2FA)" 
                  desc="Add an extra layer of security using Google Authenticator" 
                  stateKey="twoFactor" 
                />
              </div>

              <div className="settings-section card mt-4">
                <div className="section-header">
                  <h3>Recent Login Activity</h3>
                </div>
                <div className="activity-list">
                  <div className="activity-row">
                    <Monitor size={20} className="text-blue" />
                    <div className="activity-details">
                      <h4>Windows 11 • Chrome</h4>
                      <p>Mumbai, India • 192.168.1.1</p>
                    </div>
                    <div className="activity-time text-green">
                      <CheckCircle2 size={14} /> Active Now
                    </div>
                  </div>
                  <div className="activity-row">
                    <Smartphone size={20} className="text-gray" />
                    <div className="activity-details">
                      <h4>iPhone 13 • Safari</h4>
                      <p>Mumbai, India • 10.0.0.5</p>
                    </div>
                    <div className="activity-time">Yesterday, 14:30</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* PAYMENT SETTINGS */}
          {activeTab === 'payment' && (
            <>
              <div className="settings-section card">
                <div className="section-header">
                  <h3>Payment Methods</h3>
                  <p>Enable or disable checkout options</p>
                </div>
                <div className="settings-list">
                  <ToggleSwitch 
                    label="Cash on Delivery (COD)" 
                    desc="Allow customers to pay upon delivery" 
                    stateKey="cod" 
                  />
                  <ToggleSwitch 
                    label="Online Payments" 
                    desc="Accept cards, UPI, and wallets via gateways" 
                    stateKey="onlinePayment" 
                  />
                </div>
              </div>

              <div className="settings-section card mt-4">
                <div className="section-header">
                  <h3>Payment Gateways</h3>
                </div>
                <div className="gateway-grid">
                  <div className="gateway-card active">
                    <div className="gw-header">
                      <h4>Razorpay</h4>
                      <span className="badge-active">Active</span>
                    </div>
                    <p>Primary gateway for Indian payments (Cards, UPI, Netbanking).</p>
                    <button className="btn-link">Configure Keys</button>
                  </div>
                  <div className="gateway-card">
                    <div className="gw-header">
                      <h4>Stripe</h4>
                      <span className="badge-inactive">Disabled</span>
                    </div>
                    <p>International payments and subscriptions.</p>
                    <button className="btn-link">Setup Now</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SYSTEM PREFERENCES */}
          {activeTab === 'preferences' && (
            <>
              <div className="settings-section card">
                <div className="section-header">
                  <h3>System Preferences</h3>
                  <p>Regional and display formats</p>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Language</label>
                    <select defaultValue="en">
                      <option value="en">English (US)</option>
                      <option value="hi">Hindi</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Timezone</label>
                    <select defaultValue="ist">
                      <option value="ist">Asia/Kolkata (IST)</option>
                      <option value="utc">UTC</option>
                      <option value="est">Eastern Time (EST)</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Date Format</label>
                    <select defaultValue="dmy">
                      <option value="dmy">DD MMM, YYYY (22 May, 2026)</option>
                      <option value="mdy">MM/DD/YYYY (05/22/2026)</option>
                      <option value="ymd">YYYY-MM-DD (2026-05-22)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="settings-section card mt-4">
                <div className="section-header">
                  <h3>Appearance</h3>
                </div>
                <div className="settings-list">
                  <ToggleSwitch 
                    label="Dark Mode" 
                    desc="Toggle dark theme for the admin panel" 
                    stateKey="darkMode" 
                  />
                </div>
              </div>
            </>
          )}

          {/* HELP & SUPPORT */}
          {activeTab === 'support' && (
            <div className="settings-section card">
              <div className="section-header">
                <h3>Help & Support</h3>
                <p>Resources and assistance for platform administrators</p>
              </div>
              <div className="support-links">
                <div className="support-row">
                  <div className="sup-info">
                    <h4>Contact Technical Support</h4>
                    <p>Raise a ticket with the development team</p>
                  </div>
                  <ChevronRight className="text-gray" />
                </div>
                <div className="support-row">
                  <div className="sup-info">
                    <h4>Documentation & FAQ</h4>
                    <p>Read guides on how to manage the platform</p>
                  </div>
                  <ChevronRight className="text-gray" />
                </div>
                <div className="support-row">
                  <div className="sup-info">
                    <h4>Terms & Conditions</h4>
                    <p>Legal platform agreements</p>
                  </div>
                  <ChevronRight className="text-gray" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
