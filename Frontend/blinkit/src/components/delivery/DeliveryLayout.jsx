import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Home, History, TrendingUp, User, Bike, Bell } from 'lucide-react'
import './Delivery.css'

function DeliveryLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(() => {
    return localStorage.getItem('rider_online') === 'true';
  });

  // Synchronize state with storage
  useEffect(() => {
    localStorage.setItem('rider_online', isOnline ? 'true' : 'false');
  }, [isOnline]);

  const handleToggle = () => {
    setIsOnline(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('rider_logged_in');
    localStorage.removeItem('rider_online');
    navigate('/delivery/login');
  };

  return (
    <div className="del-app-container">
      {/* Dynamic Header */}
      <header className="del-header">
        <div className="del-logo" onClick={() => navigate('/delivery/home')} style={{ cursor: 'pointer' }}>
          <Bike size={24} />
          <span>Blinkit Partner</span>
        </div>

        {/* Online / Offline switch & Notifications */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="duty-toggle-wrapper">
            <span className={`duty-status-badge ${isOnline ? 'online' : 'offline'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={isOnline} 
                onChange={handleToggle} 
              />
              <span className="slider"></span>
            </label>
          </div>
          
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', padding: '4px' }}>
            <Bell size={22} color="var(--del-text)" />
            {/* Notification Badge */}
            <span style={{ position: 'absolute', top: '2px', right: '4px', width: '8px', height: '8px', background: 'var(--del-danger)', borderRadius: '50%', border: '2px solid var(--del-card-bg)' }}></span>
          </button>
        </div>
      </header>

      {/* Main Subpage Content */}
      <main style={{ flexGrow: 1, padding: '20px 20px 90px 20px', overflowY: 'auto' }}>
        <Outlet context={{ isOnline, setIsOnline }} />
      </main>

      {/* Mobile-first bottom navigation tabs */}
      <nav className="del-bottom-nav">
        <NavLink 
          to="/delivery/home" 
          className={({ isActive }) => `del-nav-item ${isActive ? 'active' : ''}`}
        >
          <Home size={20} />
          <span>Duty</span>
        </NavLink>

        <NavLink 
          to="/delivery/history" 
          className={({ isActive }) => `del-nav-item ${isActive ? 'active' : ''}`}
        >
          <History size={20} />
          <span>Trips</span>
        </NavLink>

        <NavLink 
          to="/delivery/earnings" 
          className={({ isActive }) => `del-nav-item ${isActive ? 'active' : ''}`}
        >
          <TrendingUp size={20} />
          <span>Earnings</span>
        </NavLink>

        <NavLink 
          to="/delivery/profile" 
          className={({ isActive }) => `del-nav-item ${isActive ? 'active' : ''}`}
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  )
}

export default DeliveryLayout
