import React, { useState, useRef } from 'react';
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
import SellerNotifications from './SellerNotifications';
import { useSocket } from '../../hooks/useSocket';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

// Dashboard Home Component
const DashboardHome = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [orderStats, setOrderStats] = useState({ totalOrders: 0, totalSales: 0, pendingOrders: 0, recentOrders: [] });

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const sellerInfoStr = localStorage.getItem('seller_info');
        if (sellerInfoStr) {
          const sellerInfo = JSON.parse(sellerInfoStr);
          const sellerId = sellerInfo._id || sellerInfo.id;
          if (sellerId) {
            const res = await fetch(`http://localhost:5000/api/products?sellerId=${sellerId}`);
            if (res.ok) {
              const products = await res.json();
              setTotalProducts(products.length);
            }
            
            // Fetch orders stats for seller
            const ordersRes = await fetch(`http://localhost:5000/api/orders/seller/${sellerId}`);
            if (ordersRes.ok) {
              const ordersData = await ordersRes.json();
              setOrderStats({
                totalOrders: ordersData.totalOrders || 0,
                totalSales: ordersData.totalSales || 0,
                pendingOrders: ordersData.pendingOrders || 0,
                recentOrders: ordersData.orders || []
              });
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch seller stats:', err);
      }
    };
    fetchStats();
  }, []);

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
            <h3 className="stat-value">{totalProducts}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Orders</p>
            <h3 className="stat-value">{orderStats.totalOrders}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Sales</p>
            <h3 className="stat-value">₹{orderStats.totalSales.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <LayoutDashboard size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Orders</p>
            <h3 className="stat-value">{orderStats.pendingOrders}</h3>
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
            <div className="bar" style={{height: '0%'}}></div>
            <div className="bar" style={{height: '0%'}}></div>
            <div className="bar" style={{height: '0%'}}></div>
            <div className="bar" style={{height: '0%'}}></div>
            <div className="bar" style={{height: '0%'}}></div>
            <div className="bar" style={{height: '0%'}}></div>
            <div className="bar" style={{height: '0%'}}></div>
          </div>
        </div>

        <div className="side-stats">
          {/* Small stats cards */}
          <div className="small-stat-card card">
            <h4>Best Selling Product</h4>
            <div className="product-stat" style={{ justifyContent: 'center', color: '#666' }}>
              <p>No sales data yet.</p>
            </div>
          </div>
          <div className="small-stat-card card">
            <h4>Total Customers</h4>
            <div className="customer-stat">
              <User size={32} className="text-blue" />
              <div>
                <h3>0</h3>
                <p className="trend" style={{ color: '#666' }}>No data available</p>
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
              {orderStats.recentOrders.slice(0, 5).map((order) => {
                // Since an order can have multiple items, just display the first item's details for summary
                const firstItem = order.orderItems[0];
                return (
                  <tr key={order._id}>
                    <td>
                      <div className="product-cell">
                        {firstItem && <img src={firstItem.image} alt={firstItem.title} />}
                        <span>{firstItem ? firstItem.title : 'Multiple Items'}</span>
                      </div>
                    </td>
                    <td>{order._id.substring(0,8).toUpperCase()}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {orderStats.recentOrders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No recent orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function SellerApp() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [incomingOrder, setIncomingOrder] = useState(null);
  const [timer, setTimer] = useState(180);
  const [audioError, setAudioError] = useState(false);
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);

  // Keep a ref to the currently playing audio so we can stop it on demand
  const notificationAudioRef = useRef(null);

  const playNotificationSound = () => {
    // Stop any previously playing sound before starting a new one
    if (notificationAudioRef.current) {
      notificationAudioRef.current.pause();
      notificationAudioRef.current.currentTime = 0;
    }
    const audio = new Audio('/assets/notification.mpeg');
    notificationAudioRef.current = audio;
    audio.play().catch(e => {
      console.warn('Audio play blocked or failed:', e);
      setAudioError(true);
    });
  };

  // Immediately silences the notification sound
  const stopNotificationSound = () => {
    if (notificationAudioRef.current) {
      notificationAudioRef.current.pause();
      notificationAudioRef.current.currentTime = 0;
      notificationAudioRef.current = null;
    }
  };
  
  const navigate = useNavigate();
  const location = useLocation();

  const sellerInfoStr = localStorage.getItem('seller_info');
  const sellerInfo = sellerInfoStr ? JSON.parse(sellerInfoStr) : null;
  const sellerId = sellerInfo ? (sellerInfo._id || sellerInfo.id) : null;

  const socket = useSocket('seller', sellerId);

  React.useEffect(() => {
    if (!socket) return;

    const handleNewOrder = (order) => {
      playNotificationSound();

      const item = order.orderItems[0] || {};
      const mappedOrder = {
        id: order.orderId || order._id.substring(0,8).toUpperCase(),
        realId: order._id,
        customerName: 'Customer',
        customerEmail: 'N/A',
        customerPhone: 'N/A',
        address: `${order.shippingAddress?.address || ''}, ${order.shippingAddress?.city || ''}`,
        productImage: item.image || '',
        productName: item.title || 'Multiple Items',
        quantity: item.qty || 1,
        totalPrice: order.totalPrice,
        paymentMethod: order.paymentMethod,
        status: order.status,
        date: new Date(order.createdAt).toLocaleString()
      };

      setIncomingOrder(mappedOrder);
      setTimer(180);
      setPendingOrdersCount(prev => prev + 1);
    };

    socket.on('newOrder', handleNewOrder);
    return () => socket.off('newOrder', handleNewOrder);
  }, [socket]);

  React.useEffect(() => {
    let interval;
    if (incomingOrder && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (incomingOrder && timer === 0) {
      handleAction(incomingOrder.id, 'Rejected', 'Auto-rejected due to timeout');
      setIncomingOrder(null);
    }
    return () => clearInterval(interval);
  }, [incomingOrder, timer]);

  // Initial check for pending orders
  React.useEffect(() => {
    const checkPendingOrders = async () => {
      if (!sellerId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/orders/seller/${sellerId}`);
        if (res.ok) {
          const data = await res.json();
          const pendingList = data.orders?.filter(o => o.status === 'Pending') || [];
          setPendingOrdersCount(pendingList.length);
          
          if (pendingList.length > 0 && !incomingOrder) {
            const order = pendingList[0];
            const item = order.orderItems[0] || {};
            const mappedOrder = {
              id: order.orderId || order._id.substring(0,8).toUpperCase(),
              realId: order._id,
              customerName: 'Customer',
              customerEmail: 'N/A',
              customerPhone: 'N/A',
              address: `${order.shippingAddress?.address || ''}, ${order.shippingAddress?.city || ''}`,
              productImage: item.image || '',
              productName: item.title || 'Multiple Items',
              quantity: item.qty || 1,
              totalPrice: order.totalPrice,
              paymentMethod: order.paymentMethod,
              status: order.status,
              date: new Date(order.createdAt).toLocaleString()
            };
            setIncomingOrder(mappedOrder);
            setTimer(180);
            playNotificationSound();
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    // Only fetch if they are logged in
    const isLoggedIn = localStorage.getItem('seller_logged_in') === 'true';
    if (isLoggedIn) {
      checkPendingOrders();
    }
  }, [sellerId]);

  const handleAction = async (orderId, newStatus, autoRejectReason = '') => {
    // Stop the notification sound immediately when user takes any action
    stopNotificationSound();

    let rejectionReason = autoRejectReason;
    if (newStatus === 'Rejected' && !autoRejectReason) {
      rejectionReason = window.prompt("Please enter a reason for rejection (e.g. Out of stock, Shop closed):");
      if (rejectionReason === null) {
        // User cancelled the prompt — do not proceed, but sound is already stopped
        return;
      }
    }

    // Close the modal immediately so UX feels instant
    setIncomingOrder(null);

    try {
      const realId = incomingOrder?.realId;
      if (!realId) return;
      await fetch(`http://localhost:5000/api/orders/${realId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, rejectionReason })
      });
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('seller_logged_in') === 'true';

    if (!isLoggedIn && location.pathname !== '/seller/login' && location.pathname !== '/seller/register') {
      navigate('/seller/login');
    }

    if (isLoggedIn && (location.pathname === '/seller' || location.pathname === '/seller/' || location.pathname === '/seller/login' || location.pathname === '/seller/register')) {
      navigate('/seller/home');
    }
  }, [location.pathname, navigate]);

  // Apply dark mode on mount globally
  React.useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem('seller_dark_mode') ?? 'false');
    if (isDarkMode) {
      document.body.classList.add('seller-dark-theme');
    } else {
      document.body.classList.remove('seller-dark-theme');
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { name: 'Dashboard', path: '/seller/home', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/seller/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/seller/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Earnings', path: '/seller/earnings', icon: <IndianRupee size={20} /> },
    { name: 'Profile', path: '/seller/profile', icon: <User size={20} /> },
    { name: 'Settings', path: '/seller/settings', icon: <Settings size={20} /> },
  ];



  const isAuthPage = location.pathname.startsWith('/seller/login') || location.pathname.startsWith('/seller/register');

  if (isAuthPage) {
    if (location.pathname.includes('/register')) {
      return <SellerRegister />;
    }
    return <SellerLogin />;
  }

  return (
    <div className="seller-layout">
      {/* Audio Error Banner */}
      {audioError && (
        <div style={{ background: '#ef4444', color: 'white', padding: '12px', textAlign: 'center', zIndex: 10000, position: 'fixed', top: 0, left: 0, right: 0, fontWeight: '500', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <span>Browser blocked audio notifications. Please enable them to hear order alerts.</span>
          <button 
            onClick={() => { setAudioError(false); playNotificationSound(); }} 
            style={{ background: 'white', color: '#ef4444', border: 'none', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'transform 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Enable Audio
          </button>
          <button 
            onClick={() => setAudioError(false)} 
            style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Global Incoming Order Alert Modal */}
      {incomingOrder && (
        <div className="modal-overlay incoming-order-alert" style={{ zIndex: 9999 }}>
          <div className="order-modal-content alert-bounce" style={{ background: '#fff', padding: '24px', borderRadius: '12px' }}>
            <div className="modal-header bg-warning" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h2 style={{ margin: 0 }}>🔔 New Order Received!</h2>
                <p className="order-id-subtitle">Order #{incomingOrder.id}</p>
              </div>
              <div className="timer-badge" style={{ background: '#ef4444', color: '#fff', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
                {formatTime(timer)}
              </div>
            </div>
            
            <div className="modal-body" style={{ marginBottom: '24px' }}>
              <div className="alert-details">
                <p><strong>Customer:</strong> {incomingOrder.customerName}</p>
                <p><strong>Address:</strong> {incomingOrder.address}</p>
                <p><strong>Product:</strong> {incomingOrder.productName} (Qty: {incomingOrder.quantity})</p>
                <p><strong>Total:</strong> ₹{incomingOrder.totalPrice.toLocaleString()}</p>
                <p><strong>Payment:</strong> {incomingOrder.paymentMethod}</p>
              </div>
            </div>
            
            <div className="modal-footer" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button className="btn-danger" onClick={() => handleAction(incomingOrder.id, 'Rejected')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Reject Order
              </button>
              <button className="btn-success" onClick={() => handleAction(incomingOrder.id, 'Accepted / Preparing')} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Accept Order
              </button>
            </div>
          </div>
        </div>
      )}

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
          <button className="nav-item logout" onClick={() => {
            localStorage.removeItem('seller_logged_in');
            localStorage.removeItem('seller_info');
            navigate('/seller/login');
          }}>
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
            <button className="icon-btn" onClick={() => navigate('/seller/notification')}>
              <Bell size={20} />
              {pendingOrdersCount > 0 && <span className="badge">{pendingOrdersCount}</span>}
            </button>
            <div className="seller-profile" onClick={() => navigate('/seller/profile')} style={{cursor: 'pointer'}}>
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80" alt="Profile" />
              <div className="profile-info md-visible">
                <span className="name">{sellerInfo?.businessName || sellerInfo?.ownerName || 'Store Owner'}</span>
                <span className="role">Seller Hub</span>
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
            <Route path="notification" element={<SellerNotifications />} />
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
