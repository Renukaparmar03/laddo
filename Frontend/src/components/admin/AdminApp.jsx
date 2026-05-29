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
import AdminLogin from './AdminLogin';
import AdminNotifications from './AdminNotifications';

// Placeholder Pages

// Admin Dashboard Home
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSellers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
    topSellers: []
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 1. Fetch all sellers
        const sellersRes = await fetch('http://localhost:5000/api/sellers');
        const sellersData = await sellersRes.json();
        
        let allOrders = [];
        let totalRevenue = 0;
        let uniqueUsers = new Set();
        let sellerStats = [];

        // 2. Fetch orders for each seller
        await Promise.all(sellersData.map(async (seller) => {
          try {
            const orderRes = await fetch(`http://localhost:5000/api/orders/seller/${seller._id}`);
            const orderData = await orderRes.json();
            
            totalRevenue += orderData.totalSales || 0;
            
            if (orderData.orders) {
              allOrders = [...allOrders, ...orderData.orders];
              orderData.orders.forEach(o => {
                if (o.user) uniqueUsers.add(o.user.toString());
              });
            }

            sellerStats.push({
              name: seller.businessName || seller.ownerName || 'Seller',
              img: seller.logo || 'https://via.placeholder.com/50',
              rev: orderData.totalSales || 0,
              orders: orderData.totalOrders || 0
            });
          } catch (e) {
            console.error(e);
          }
        }));

        // Deduplicate orders
        const uniqueOrdersMap = new Map();
        allOrders.forEach(o => uniqueOrdersMap.set(o._id, o));
        const uniqueOrders = Array.from(uniqueOrdersMap.values());
        
        // Sort recent orders by date
        uniqueOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const uniqueRecentOrders = uniqueOrders.slice(0, 5);

        // Sort top sellers by revenue
        sellerStats.sort((a, b) => b.rev - a.rev);
        const top5Sellers = sellerStats.slice(0, 4);

        setStats({
          // If no unique users found, fallback to 0 instead of fake data so it reflects real DB state
          totalUsers: uniqueUsers.size,
          totalSellers: sellersData.length,
          totalOrders: uniqueOrders.length,
          totalRevenue: totalRevenue,
          recentOrders: uniqueRecentOrders,
          topSellers: top5Sellers
        });
      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-dashboard-home">
      {/* Header Section */}
      <div className="dashboard-welcome">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Monitor your platform's overall performance</p>
        </div>
        <div className="quick-actions-btns">
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>Loading real-time data...</div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="summary-cards">
            <div className="stat-card">
              <div className="stat-icon bg-blue">
                <Users size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Active Users</p>
                <h3 className="stat-value">{stats.totalUsers}</h3>
                <span className="trend positive"><ArrowUpRight size={14} /> Live Data</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-purple">
                <Store size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Sellers</p>
                <h3 className="stat-value">{stats.totalSellers}</h3>
                <span className="trend positive"><ArrowUpRight size={14} /> Live Data</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-orange">
                <ShoppingCart size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Orders</p>
                <h3 className="stat-value">{stats.totalOrders}</h3>
                <span className="trend positive"><ArrowUpRight size={14} /> Live Data</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon bg-green">
                <IndianRupee size={24} />
              </div>
              <div className="stat-info">
                <p className="stat-label">Total Revenue</p>
                <h3 className="stat-value">₹{stats.totalRevenue.toLocaleString()}</h3>
                <span className="trend positive"><ArrowUpRight size={14} /> Live Data</span>
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
                  <button className="action-btn" onClick={() => navigate('/admin/orders')}>
                    <ShoppingCart size={20} className="text-orange" />
                    <span>View Orders</span>
                  </button>
                  <button className="action-btn" onClick={() => navigate('/admin/products')}>
                    <Package size={20} className="text-purple" />
                    <span>Manage Products</span>
                  </button>
                  <button className="action-btn" onClick={() => navigate('/admin/notification')}>
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
                      <p>Dashboard updated with <strong>Live Data</strong></p>
                      <span>Just now</span>
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
                      <th>Amount</th>
                      <th>Order Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.length === 0 ? (
                      <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No orders yet</td></tr>
                    ) : (
                      stats.recentOrders.map((order, i) => (
                        <tr key={i}>
                          <td className="font-medium">{order.orderId || order._id.substring(0,8).toUpperCase()}</td>
                          <td>Customer</td>
                          <td className="font-semibold">₹{order.totalPrice.toLocaleString()}</td>
                          <td>
                            <span className={`status-badge ${
                              order.status === 'Delivered' ? 'delivered' : 
                              order.status === 'Rejected' || order.status === 'Cancelled' ? 'cancelled' : 
                              'pending'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td>
                            <span className={`pay-badge ${order.isPaid ? 'paid' : 'pending'}`}>
                              {order.paymentMethod}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
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
                {stats.topSellers.length === 0 ? (
                  <div style={{textAlign: 'center', padding: '20px', color: '#666'}}>No sellers yet</div>
                ) : (
                  stats.topSellers.map((seller, i) => (
                    <div className="seller-item" key={i}>
                      <img src={seller.img} alt={seller.name} className="seller-img" style={{objectFit: 'cover'}} />
                      <div className="seller-info">
                        <h4>{seller.name}</h4>
                        <p>{seller.orders} orders</p>
                      </div>
                      <div className="seller-rev">₹{seller.rev.toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default function AdminApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({ 'Seller Management': false, 'Delivery Management': false });
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingDeliveryCount, setPendingDeliveryCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';

    if (!isLoggedIn && location.pathname !== '/admin/login') {
      navigate('/admin/login');
    }

    if (isLoggedIn && (location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/admin/login')) {
      navigate('/admin/home');
    }
    
    if (isLoggedIn) {
      fetch('http://localhost:5000/api/sellers?status=pending')
        .then(res => res.json())
        .then(data => setPendingCount(data.length))
        .catch(err => console.error(err));

      fetch('http://localhost:5000/api/delivery')
        .then(res => res.json())
        .then(data => {
          const pending = data.filter(d => d.status === 'pending');
          setPendingDeliveryCount(pending.length);
        })
        .catch(err => console.error(err));
    }
  }, [location.pathname, navigate]);

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
        { name: 'Seller Requests', path: '/admin/seller-requests', badge: pendingCount > 0 ? pendingCount : null },
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
        { name: 'Delivery Requests', path: '/admin/delivery-requests', badge: pendingDeliveryCount > 0 ? pendingDeliveryCount : null },
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

  if (location.pathname === '/admin/login') {
    return <AdminLogin />;
  }

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
            <button className="icon-btn" onClick={() => navigate('/admin/notification')}>
              <Bell size={20} />
              {(pendingCount + pendingDeliveryCount) > 0 && (
                <span className="badge">{pendingCount + pendingDeliveryCount}</span>
              )}
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
            <Route path="notification" element={<AdminNotifications />} />
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
