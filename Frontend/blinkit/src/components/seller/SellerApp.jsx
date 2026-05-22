import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  IndianRupee, 
  User, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  X
} from 'lucide-react';
import './SellerApp.css';
import SellerProducts from './SellerProducts';
import SellerOrders from './SellerOrders';
import SellerEarnings from './SellerEarnings';
import SellerProfile from './SellerProfile';
import SellerSettings from './SellerSettings';
import SellerLogin from './SellerLogin';
import SellerRegister from './SellerRegister';

// Dashboard Home Component
const DashboardHome = () => {
  return (
    <div className="seller-dashboard-home">
      {/* Welcome section */}
      <div className="dashboard-welcome">
        <div>
          <h1>Welcome back, Seller! 👋</h1>
          <p>Here's what's happening with your store today.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Products</p>
            <h3 className="stat-value">124</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Orders</p>
            <h3 className="stat-value">856</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Sales</p>
            <h3 className="stat-value">₹45,231</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <LayoutDashboard size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Orders</p>
            <h3 className="stat-value">12</h3>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Sales Overview Section */}
        <div className="sales-overview card">
          <div className="card-header">
            <h3>Sales Overview</h3>
            <select className="date-select"><option>This Month</option></select>
          </div>
          <div className="chart-placeholder">
            <div className="bar" style={{height: '60%'}}></div>
            <div className="bar" style={{height: '40%'}}></div>
            <div className="bar" style={{height: '80%'}}></div>
            <div className="bar" style={{height: '50%'}}></div>
            <div className="bar" style={{height: '90%'}}></div>
            <div className="bar" style={{height: '70%'}}></div>
            <div className="bar" style={{height: '100%'}}></div>
          </div>
        </div>

        <div className="side-stats">
          {/* Small stats cards */}
          <div className="small-stat-card card">
            <h4>Best Selling Product</h4>
            <div className="product-stat">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80" alt="Product" />
              <div>
                <p className="name">Red Nike Sneakers</p>
                <p className="sales">234 sold</p>
              </div>
            </div>
          </div>
          <div className="small-stat-card card">
            <h4>Total Customers</h4>
            <div className="customer-stat">
              <User size={32} className="text-blue" />
              <div>
                <h3>1,204</h3>
                <p className="trend positive">+12% this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="recent-orders card">
        <div className="card-header">
          <h3>Recent Orders</h3>
          <button className="btn-text">View All</button>
        </div>
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Order ID</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD-001', name: 'Wireless Headphones', price: '₹2,999', status: 'Delivered', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&q=80' },
                { id: '#ORD-002', name: 'Smart Watch', price: '₹1,499', status: 'Processing', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=50&q=80' },
                { id: '#ORD-003', name: 'Bluetooth Speaker', price: '₹999', status: 'Pending', img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=50&q=80' },
                { id: '#ORD-004', name: 'Gaming Mouse', price: '₹1,299', status: 'Delivered', img: 'https://images.unsplash.com/photo-1527814050087-379381547980?w=50&q=80' },
              ].map((order, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-cell">
                      <img src={order.img} alt={order.name} />
                      <span>{order.name}</span>
                    </div>
                  </td>
                  <td>{order.id}</td>
                  <td>{order.price}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function SellerApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('seller_logged_in') === 'true';

    if (!isLoggedIn && location.pathname !== '/seller/login' && location.pathname !== '/seller/register') {
      navigate('/seller/login');
    }

    if (isLoggedIn && (location.pathname === '/seller' || location.pathname === '/seller/' || location.pathname === '/seller/login' || location.pathname === '/seller/register')) {
      navigate('/seller/home');
    }
  }, [location.pathname, navigate]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { name: 'Dashboard', path: '/seller/home', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/seller/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/seller/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Earnings', path: '/seller/earnings', icon: <IndianRupee size={20} /> },
    { name: 'Profile', path: '/seller/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/seller/settings', icon: <Settings size={20} /> },
  ];

  if (location.pathname === '/seller/login') {
    return <SellerLogin />;
  }

  if (location.pathname === '/seller/register') {
    return <SellerRegister />;
  }

  return (
    <div className="seller-layout">
      {/* Sidebar */}
      <aside className={`seller-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Seller Hub</h2>
          <button className="close-btn md-hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${location.pathname.includes(item.path) ? 'active' : ''}`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={() => navigate('/user/home')}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="seller-main">
        {/* Top Navbar */}
        <header className="seller-topbar">
          <div className="topbar-left">
            <button className="menu-btn md-hidden" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
          </div>
          <div className="topbar-right">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <div className="seller-profile">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80" alt="Profile" />
              <div className="profile-info md-visible">
                <span className="name">John Doe</span>
                <span className="role">Store Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="seller-content">
          <Routes>
            <Route path="login" element={<SellerLogin />} />
            <Route path="register" element={<SellerRegister />} />
            <Route path="home" element={<DashboardHome />} />
            <Route path="products" element={<SellerProducts />} />
            <Route path="orders" element={<SellerOrders />} />
            <Route path="earnings" element={<SellerEarnings />} />
            <Route path="profile" element={<SellerProfile />} />
            <Route path="settings" element={<SellerSettings />} />
            <Route path="" element={<Navigate to="home" replace />} />
          </Routes>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </div>
  );
}
