import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Store, Package, ShoppingCart, 
  BarChart2, IndianRupee, FileText, Settings, LogOut,
  Bell, Menu, X, Search, ChevronRight, CheckCircle, PlusCircle, ArrowUpRight, TrendingUp, Activity, Truck, Image as ImageIcon
} from 'lucide-react';
import './AdminApp.css';
import AdminUsers from './AdminUsers';
import AdminSellerOverview from './AdminSellerOverview';
import AdminSellers from './AdminSellers';
import AdminSellerRequests from './AdminSellerRequests';
import AdminGSTVerification from './AdminGSTVerification';
import AdminFundRelease from './AdminFundRelease';
import AdminDeliveryOverview from './AdminDeliveryOverview';
import AdminDeliveryPartners from './AdminDeliveryPartners';
import AdminActiveDeliveries from './AdminActiveDeliveries';
import AdminDeliveryEarnings from './AdminDeliveryEarnings';
import AdminDeliveryRequests from './AdminDeliveryRequests';
import AdminBanners from './AdminBanners';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminAnalytics from './AdminAnalytics';
import AdminRevenue from './AdminRevenue';
import AdminReports from './AdminReports';
import AdminSettings from './AdminSettings';
import AdminProfile from './AdminProfile';

// Placeholder Pages

// Admin Dashboard Home
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-home">
      {/* Header Section */}
      <div className="dashboard-welcome">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Monitor your platform's overall performance</p>
        </div>
        <div className="quick-actions-btns">
          <button className="btn-primary"><PlusCircle size={18} /> Add Seller</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Users</p>
            <h3 className="stat-value">14,592</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> +12%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <Store size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Sellers</p>
            <h3 className="stat-value">845</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> +5%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Orders</p>
            <h3 className="stat-value">42,891</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> +18%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">₹8.4M</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> +24%</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Sales Overview Chart (CSS based) */}
        <div className="analytics-section card">
          <div className="card-header">
            <h3>Sales Overview</h3>
            <select className="date-select"><option>This Year</option></select>
          </div>
          <div className="chart-placeholder">
            {[40, 60, 45, 80, 55, 90, 75, 85, 65, 100, 70, 85].map((height, i) => (
              <div className="bar-wrapper" key={i}>
                <div className="bar" style={{height: `${height}%`}}></div>
                <span className="month-label">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="side-col">
          <div className="quick-actions-card card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="action-buttons-grid">
              <button className="action-btn">
                <Store size={20} className="text-blue" />
                <span>Add Seller</span>
              </button>
              <button className="action-btn">
                <ShoppingCart size={20} className="text-orange" />
                <span>View Orders</span>
              </button>
              <button className="action-btn">
                <Package size={20} className="text-purple" />
                <span>Manage Products</span>
              </button>
              <button className="action-btn">
                <Bell size={20} className="text-green" />
                <span>Notify All</span>
              </button>
            </div>
          </div>

          <div className="recent-activity card">
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="act-icon bg-blue"><Store size={14} /></div>
                <div className="act-info">
                  <p>New seller <strong>ElectroWorld</strong> joined</p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="act-icon bg-purple"><Package size={14} /></div>
                <div className="act-info">
                  <p><strong>RR Mart</strong> added 12 new products</p>
                  <span>5 hours ago</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="act-icon bg-green"><CheckCircle size={14} /></div>
                <div className="act-info">
                  <p>Order <strong>#ORD-9912</strong> completed</p>
                  <span>Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid-bottom">
        {/* Recent Orders */}
        <div className="recent-orders card">
          <div className="card-header">
            <h3>Recent Orders</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Seller</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '#ORD-1029', cust: 'Rahul Sharma', seller: 'RR Mart', amount: '₹4,999', status: 'Delivered', payment: 'Paid' },
                  { id: '#ORD-1030', cust: 'Priya Patel', seller: 'Tech Store', amount: '₹12,499', status: 'Processing', payment: 'Paid' },
                  { id: '#ORD-1031', cust: 'Amit Kumar', seller: 'Fresh Foods', amount: '₹899', status: 'Pending', payment: 'Pending' },
                  { id: '#ORD-1032', cust: 'Neha Gupta', seller: 'Fashion Hub', amount: '₹2,499', status: 'Delivered', payment: 'Paid' },
                ].map((order, i) => (
                  <tr key={i}>
                    <td className="font-medium">{order.id}</td>
                    <td>{order.cust}</td>
                    <td>{order.seller}</td>
                    <td className="font-semibold">{order.amount}</td>
                    <td><span className={`status-badge ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td><span className={`pay-badge ${order.payment.toLowerCase()}`}>{order.payment}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Sellers */}
        <div className="top-sellers card">
          <div className="card-header">
            <h3>Top Sellers</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="sellers-list">
            {[
              { name: 'RR Mart', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80', rev: '₹1.2M', orders: '1,245' },
              { name: 'Tech Store', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&q=80', rev: '₹890K', orders: '856' },
              { name: 'Fashion Hub', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&q=80', rev: '₹650K', orders: '742' },
              { name: 'Fresh Foods', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=50&q=80', rev: '₹420K', orders: '1,890' },
            ].map((seller, i) => (
              <div className="seller-item" key={i}>
                <img src={seller.img} alt={seller.name} className="seller-img" />
                <div className="seller-info">
                  <h4>{seller.name}</h4>
                  <p>{seller.orders} orders</p>
                </div>
                <div className="seller-rev">{seller.rev}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({ 'Seller Management': false, 'Delivery Management': false });
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/home', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { 
      name: 'Seller Management', 
      icon: <Store size={20} />,
      isDropdown: true,
      subItems: [
        { name: 'Seller Overview', path: '/admin/seller-overview' },
        { name: 'All Sellers', path: '/admin/all-sellers' },
        { name: 'Seller Requests', path: '/admin/seller-requests', badge: 3 },
        { name: 'GST Verification', path: '/admin/gst-verification' },
        { name: 'Fund Release', path: '/admin/fund-release' },
      ]
    },
    { 
      name: 'Delivery Management', 
      icon: <Truck size={20} />,
      isDropdown: true,
      subItems: [
        { name: 'Delivery Overview', path: '/admin/delivery-overview' },
        { name: 'Delivery Requests', path: '/admin/delivery-requests', badge: 5 },
        { name: 'Delivery Partners', path: '/admin/delivery-partners' },
        { name: 'Active Deliveries', path: '/admin/active-deliveries' },
        { name: 'Delivery Earnings & Bonuses', path: '/admin/delivery-earnings' },
      ]
    },
    { name: 'Banners', path: '/admin/banners', icon: <ImageIcon size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Revenue', path: '/admin/revenue', icon: <IndianRupee size={20} /> },
    { name: 'Reports', path: '/admin/reports', icon: <FileText size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="admin-logo">
            <div className="logo-icon">B</div>
            <h2>Admin Panel</h2>
          </div>
          <button className="close-btn md-hidden" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            if (item.isDropdown) {
              const isChildActive = item.subItems.some(sub => location.pathname.includes(sub.path));
              return (
                <div key={item.name} className="nav-dropdown">
                  <button
                    className={`nav-item ${isChildActive ? 'active' : ''}`}
                    onClick={() => toggleMenu(item.name)}
                    style={{ justifyContent: 'space-between', width: '100%' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight 
                      size={16} 
                      style={{ 
                        transform: openMenus[item.name] ? 'rotate(90deg)' : 'rotate(0deg)', 
                        transition: 'transform 0.2s' 
                      }} 
                    />
                  </button>
                  {openMenus[item.name] && (
                    <div className="dropdown-menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '40px', marginTop: '4px' }}>
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          className={`nav-item ${location.pathname.includes(subItem.path) ? 'active' : ''}`}
                          onClick={() => {
                            navigate(subItem.path);
                            if (window.innerWidth <= 768) setSidebarOpen(false);
                          }}
                          style={{ padding: '10px 16px', fontSize: '0.9rem', justifyContent: 'space-between', display: 'flex', width: '100%' }}
                        >
                          <span>{subItem.name}</span>
                          {subItem.badge && (
                            <span style={{
                              backgroundColor: '#ef4444', 
                              color: 'white', 
                              fontSize: '0.75rem', 
                              padding: '2px 6px', 
                              borderRadius: '10px',
                              fontWeight: '600'
                            }}>{subItem.badge}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
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
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={() => navigate('/user/home')}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="menu-btn md-hidden" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className="search-bar md-visible">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search orders, users, sellers..." />
            </div>
          </div>
          <div className="topbar-right">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="badge">5</span>
            </button>
            <div className="admin-profile" onClick={() => navigate('/admin/profile')} style={{ cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&q=80" alt="Admin" />
              <div className="profile-info md-visible">
                <span className="name">Super Admin</span>
                <span className="role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          <Routes>
            <Route path="home" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            {/* Seller routes will go here when implemented */}
            <Route path="seller-overview" element={<AdminSellerOverview />} />
            <Route path="all-sellers" element={<AdminSellers />} />
            <Route path="seller-requests" element={<AdminSellerRequests />} />
            <Route path="gst-verification" element={<AdminGSTVerification />} />
            <Route path="fund-release" element={<AdminFundRelease />} />
            {/* Delivery Management Routes */}
            <Route path="delivery-overview" element={<AdminDeliveryOverview />} />
            <Route path="delivery-requests" element={<AdminDeliveryRequests />} />
            <Route path="delivery-partners" element={<AdminDeliveryPartners />} />
            <Route path="active-deliveries" element={<AdminActiveDeliveries />} />
            <Route path="delivery-earnings" element={<AdminDeliveryEarnings />} />
            <Route path="banners" element={<AdminBanners />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="revenue" element={<AdminRevenue />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
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
