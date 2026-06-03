import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  User, 
  ShoppingBag, 
  Wallet, 
  MessageSquare, 
  Smartphone, 
  Sun, 
  EyeOff, 
  BookOpen, 
  Coffee, 
  Heart, 
  FileText, 
  Gift, 
  CreditCard, 
  Tag, 
  Receipt, 
  Share2, 
  Info, 
  Lock, 
  Bell, 
  LogOut,
  ChevronRight,
  ChevronDown,
  Mail
} from 'lucide-react';

const ProfilePage = ({ setActiveTab, setActiveCategory }) => {
  const [hideSensitive, setHideSensitive] = useState(false);
  const [appearance, setAppearance] = useState('LIGHT');
  const [showAppearanceDropdown, setShowAppearanceDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [orderCount, setOrderCount] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const containerRef = useRef(null);

  // Read user info from localStorage (set at login/register time)
  const userInfoStr = localStorage.getItem('user_info');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : null;
  const userId   = userInfo ? (userInfo._id || userInfo.id) : null;
  const userName  = userInfo?.name  || 'Your account';
  const userEmail = userInfo?.email || '';

  // Mask email for display: e.g. vi***@gmail.com
  const maskEmail = (email) => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    if (!domain) return email;
    const visible = local.slice(0, 2);
    return `${visible}${'*'.repeat(Math.max(local.length - 2, 3))}@${domain}`;
  };

  // Monitor scroll level to trigger transition into white sticky title bar
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setIsScrolled(containerRef.current.scrollTop > 40);
      }
    };
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Fetch real order count for this user
  useEffect(() => {
    const fetchOrderCount = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/orders/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setOrderCount(Array.isArray(data) ? data.length : 0);
        }
      } catch (err) {
        console.error('Error fetching order count:', err);
      }
    };
    fetchOrderCount();
  }, [userId]);

  const handleBackToHome = () => {
    setActiveTab('home');
    if (setActiveCategory) {
      setActiveCategory('All');
    }
  };

  const handleGoToOrders = () => {
    setActiveTab('orders');
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      // Clear JWT cookie via backend
      await fetch('http://localhost:5000/api/users/logout', { method: 'POST', credentials: 'include' });
    } catch (e) {
      console.warn('Logout request failed:', e.message);
    }
    // Clear localStorage
    localStorage.removeItem('user_logged_in');
    localStorage.removeItem('user_info');
    setLoggingOut(false);
    // Navigate back to home (which will show login screen)
    setActiveTab('home');
    if (setActiveCategory) setActiveCategory('All');
    // Force reload so App re-evaluates auth state
    window.location.href = '/user/login';
  };

  return (
    <div className="profile-page-container" ref={containerRef}>
      {/* Sticky Header Bar (Turns White + Adds 'Profile' title on Scroll) */}
      <div className={`profile-sticky-header ${isScrolled ? 'scrolled' : ''}`}>
        <button 
          className="profile-back-btn" 
          onClick={handleBackToHome}
          title="Back to Home"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="profile-sticky-title">Profile</span>
      </div>

      {/* Yellow/Orange Top Gradient Profile Header */}
      <div className="profile-header-gradient">
        <div className="profile-avatar-section">
          <div className="profile-avatar-circle">
            {/* Show first letter of name as avatar */}
            {userName && userName !== 'Your account' ? (
              <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', textTransform: 'uppercase' }}>
                {userName.charAt(0)}
              </span>
            ) : (
              <User size={46} className="profile-avatar-icon" />
            )}
          </div>
          <h2 className="profile-username">{userName}</h2>
          {userEmail && (
            <p className="profile-phone" style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              <Mail size={13} style={{ opacity: 0.8 }} />
              {maskEmail(userEmail)}
            </p>
          )}
        </div>
      </div>

      <div className="profile-page-content">
        {/* Birthday Promotion Banner */}
        <div className="birthday-banner">
          <div className="birthday-text-col">
            <h4 className="birthday-title">Add your birthday</h4>
            <span className="birthday-action">Enter details <ChevronRight size={12} style={{ display: 'inline', marginLeft: '2px' }} /></span>
          </div>
          <div className="birthday-cake-art">🎂</div>
        </div>

        {/* Triple Action Cards Grid */}
        <div className="profile-action-grid">
          <button className="action-card" onClick={handleGoToOrders} style={{ position: 'relative' }}>
            <div className="action-card-icon-wrapper orders">
              <ShoppingBag size={24} />
            </div>
            <span className="action-card-label">Your orders</span>
            {orderCount !== null && orderCount > 0 && (
              <span style={{
                position: 'absolute', top: '8px', right: '8px',
                background: '#f59e0b', color: '#fff',
                borderRadius: '999px', fontSize: '10px', fontWeight: '700',
                padding: '1px 6px', lineHeight: '16px'
              }}>{orderCount}</span>
            )}
          </button>
          
          <button className="action-card">
            <div className="action-card-icon-wrapper money">
              <div className="wallet-rupee-container">
                <Wallet size={24} />
                <span className="wallet-rupee-symbol">₹</span>
              </div>
            </div>
            <span className="action-card-label">Blinkit Money</span>
          </button>

          <button className="action-card">
            <div className="action-card-icon-wrapper help">
              <MessageSquare size={24} />
            </div>
            <span className="action-card-label">Need help?</span>
          </button>
        </div>

        {/* Interactive App Settings Block */}
        <div className="profile-settings-block">
          {/* App Update Info Row */}
          <div className="settings-row app-update-row">
            <Smartphone size={20} className="row-icon-left smartphone-icon" />
            <div className="settings-row-text">
              <p className="settings-row-title">App update available</p>
              <p className="settings-row-subtitle">bug fixes and improvements</p>
            </div>
            <span className="update-version-badge">v17.97.1 <ChevronRight size={12} style={{ marginLeft: '2px' }} /></span>
          </div>

          {/* Appearance Option Row */}
          <div className="settings-row appearance-row">
            <Sun size={20} className="row-icon-left sun-icon" />
            <div className="settings-row-text">
              <p className="settings-row-title">Appearance</p>
            </div>
            <div className="appearance-select-container">
              <button 
                className="appearance-select-btn"
                onClick={() => setShowAppearanceDropdown(!showAppearanceDropdown)}
              >
                <span>{appearance}</span>
                <ChevronDown size={12} style={{ marginLeft: '2px' }} />
              </button>
              {showAppearanceDropdown && (
                <div className="appearance-dropdown-menu">
                  <button onClick={() => { setAppearance('LIGHT'); setShowAppearanceDropdown(false); }}>LIGHT</button>
                  <button onClick={() => { setAppearance('DARK'); setShowAppearanceDropdown(false); }}>DARK</button>
                </div>
              )}
            </div>
          </div>

          {/* Hide Sensitive Items Row */}
          <div className="settings-row sensitive-items-row">
            <div className="sensitive-icon-wrapper">
              <EyeOff size={18} />
            </div>
            <div className="settings-row-text expand-padding">
              <p className="settings-row-title">Hide sensitive items</p>
              <p className="settings-row-subtitle line-clamp-desc">
                Sexual wellness, nicotine products and other sensitive items will be hidden. <span className="know-more-link">Know more</span>
              </p>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={hideSensitive}
                onChange={() => setHideSensitive(!hideSensitive)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {/* Section: Your Information */}
        <div className="profile-info-section">
          <h3 className="profile-section-heading">Your information</h3>
          <div className="profile-list">
            <div className="profile-list-item">
              <BookOpen size={18} className="list-icon" />
              <span className="list-label">Address book</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Coffee size={18} className="list-icon" />
              <span className="list-label">Bookmarked recipes</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Heart size={18} className="list-icon" />
              <span className="list-label">Your wishlist</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <FileText size={18} className="list-icon" />
              <span className="list-label">GST details</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Gift size={18} className="list-icon" />
              <span className="list-label">E-gift cards</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <FileText size={18} className="list-icon" />
              <span className="list-label">Your prescriptions</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
          </div>
        </div>

        {/* Section: Payment and Coupons */}
        <div className="profile-info-section">
          <h3 className="profile-section-heading">Payment and coupons</h3>
          <div className="profile-list">
            <div className="profile-list-item">
              <Wallet size={18} className="list-icon" />
              <span className="list-label">Blinkit Money</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <CreditCard size={18} className="list-icon" />
              <span className="list-label">Payment settings</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Gift size={18} className="list-icon" />
              <span className="list-label">Claim Gift card</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Tag size={18} className="list-icon" />
              <span className="list-label">Your collected rewards</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
          </div>
        </div>

        {/* Section: Feeding India */}
        <div className="profile-info-section">
          <h3 className="profile-section-heading">Feeding India</h3>
          <div className="profile-list">
            <div className="profile-list-item">
              <div className="feeding-india-logo">fi</div>
              <span className="list-label">Your impact</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Receipt size={18} className="list-icon" />
              <span className="list-label">Get Feeding India receipt</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
          </div>
        </div>

        {/* Section: Other Information */}
        <div className="profile-info-section">
          <h3 className="profile-section-heading">Other Information</h3>
          <div className="profile-list">
            <div className="profile-list-item">
              <Share2 size={18} className="list-icon" />
              <span className="list-label">Share the app</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Info size={18} className="list-icon" />
              <span className="list-label">About us</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <ShoppingBag size={18} className="list-icon" />
              <span className="list-label">Sell on Blinkit</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Lock size={18} className="list-icon" />
              <span className="list-label">Account privacy</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div className="profile-list-item">
              <Bell size={18} className="list-icon" />
              <span className="list-label">Notification preferences</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
            <div 
              className="profile-list-item log-out-item" 
              onClick={loggingOut ? undefined : handleLogout} 
              style={{ cursor: loggingOut ? 'not-allowed' : 'pointer', opacity: loggingOut ? 0.6 : 1 }}
            >
              <LogOut size={18} className="list-icon logout" />
              <span className="list-label logout">{loggingOut ? 'Logging out...' : 'Log out'}</span>
              <ChevronRight size={16} className="list-chevron" />
            </div>
          </div>
        </div>

        {/* User identity footer */}
        {userInfo && (
          <div style={{
            margin: '8px 16px 0',
            padding: '14px 16px',
            background: '#f9fafb',
            borderRadius: '12px',
            fontSize: '12px',
            color: '#9ca3af',
            lineHeight: '1.6'
          }}>
            <span style={{ fontWeight: '600', color: '#6b7280' }}>Logged in as: </span>
            {userName}
            {userEmail && <> &bull; {maskEmail(userEmail)}</>}
          </div>
        )}

        {/* Brand Footer */}
        <div className="profile-brand-footer">
          <span className="brand-footer-logo">blinkit</span>
          <p className="brand-footer-version">v17.95.4</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
