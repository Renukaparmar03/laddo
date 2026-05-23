import React, { useState } from 'react';
import { 
  Calendar, TrendingUp, TrendingDown, IndianRupee, ShoppingBag, 
  Users, Activity, Package, Store, Star
} from 'lucide-react';
import './AdminAnalytics.css';

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState('This Month');

  // MOCK DATA
  const topProducts = [
    { id: 1, name: 'Premium Wireless Headphones', sold: 450, revenue: '₹1.3M', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&q=80' },
    { id: 2, name: 'Smart Fitness Band', sold: 320, revenue: '₹415K', img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=50&q=80' },
    { id: 3, name: 'Men\'s Running Shoes', sold: 210, revenue: '₹335K', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&q=80' },
  ];

  const topSellers = [
    { id: 1, shop: 'RR Mart', orders: 1245, revenue: '₹1.2M', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&q=80' },
    { id: 2, shop: 'Tech Store', orders: 856, revenue: '₹890K', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&q=80' },
    { id: 3, shop: 'Fashion Hub', orders: 742, revenue: '₹650K', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&q=80' },
  ];

  const categories = [
    { name: 'Electronics', percent: 45, color: '#3b82f6' },
    { name: 'Fashion', percent: 25, color: '#a855f7' },
    { name: 'Groceries', percent: 18, color: '#16a34a' },
    { name: 'Home & Furniture', percent: 12, color: '#f97316' },
  ];

  const activities = [
    { id: 1, text: 'New seller "Tech Store" joined', time: '10 mins ago', type: 'store' },
    { id: 2, text: 'Payment of ₹12,500 received', time: '1 hour ago', type: 'payment' },
    { id: 3, text: 'Order #ORD-102 completed', time: '3 hours ago', type: 'order' },
    { id: 4, text: 'New product "Smart Watch" added', time: '5 hours ago', type: 'product' },
  ];

  return (
    <div className="admin-analytics-page">
      {/* Header Section */}
      <div className="analytics-header">
        <div className="header-title">
          <h1>Analytics Overview</h1>
          <p>Monitor your store's performance and growth</p>
        </div>
        <div className="header-actions">
          <div className="filter-dropdown">
            <Calendar size={18} className="icon" />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-summary-grid">
        <div className="analytics-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-blue-light">
              <IndianRupee size={22} className="text-blue" />
            </div>
            <div className="trend-badge positive">
              <TrendingUp size={14} /> <span>+15.3%</span>
            </div>
          </div>
          <p className="stat-label">Total Revenue</p>
          <h3 className="stat-value">₹4.2M</h3>
        </div>
        
        <div className="analytics-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-green-light">
              <ShoppingBag size={22} className="text-green" />
            </div>
            <div className="trend-badge positive">
              <TrendingUp size={14} /> <span>+8.2%</span>
            </div>
          </div>
          <p className="stat-label">Total Orders</p>
          <h3 className="stat-value">12,450</h3>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-purple-light">
              <Users size={22} className="text-purple" />
            </div>
            <div className="trend-badge positive">
              <TrendingUp size={14} /> <span>+22.4%</span>
            </div>
          </div>
          <p className="stat-label">User Growth</p>
          <h3 className="stat-value">48.2K</h3>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-orange-light">
              <Activity size={22} className="text-orange" />
            </div>
            <div className="trend-badge negative">
              <TrendingDown size={14} /> <span>-2.1%</span>
            </div>
          </div>
          <p className="stat-label">Sales Growth</p>
          <h3 className="stat-value">8.4%</h3>
        </div>
      </div>

      {/* Charts & Growth Section */}
      <div className="analytics-middle-section">
        <div className="chart-card card">
          <div className="card-header">
            <h3>Revenue Analytics</h3>
          </div>
          <div className="css-chart-container">
            {/* CSS-based Bar Chart */}
            <div className="bar-chart">
              <div className="bar-wrapper"><div className="bar" style={{height: '40%'}}></div><span>Jan</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '55%'}}></div><span>Feb</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '45%'}}></div><span>Mar</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '70%'}}></div><span>Apr</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '85%'}}></div><span>May</span></div>
              <div className="bar-wrapper"><div className="bar" style={{height: '60%'}}></div><span>Jun</span></div>
            </div>
          </div>
        </div>

        <div className="user-growth-card card">
          <div className="card-header">
            <h3>User Demographics</h3>
          </div>
          <div className="growth-stats">
            <div className="growth-item">
              <div className="growth-dot bg-blue"></div>
              <div className="growth-info">
                <p>New Users</p>
                <h4>12,450</h4>
              </div>
            </div>
            <div className="growth-item">
              <div className="growth-dot bg-green"></div>
              <div className="growth-info">
                <p>Active Users</p>
                <h4>38,200</h4>
              </div>
            </div>
            <div className="growth-item">
              <div className="growth-dot bg-purple"></div>
              <div className="growth-info">
                <p>Returning Customers</p>
                <h4>64%</h4>
              </div>
            </div>
          </div>
          
          <div className="card-header mt-4">
            <h3>Top Categories</h3>
          </div>
          <div className="categories-list">
            {categories.map((cat, idx) => (
              <div className="category-progress-item" key={idx}>
                <div className="cat-info">
                  <span>{cat.name}</span>
                  <span>{cat.percent}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Products, Sellers, Activity */}
      <div className="analytics-bottom-section">
        {/* Top Products */}
        <div className="top-list-card card">
          <div className="card-header">
            <h3>Top Selling Products</h3>
          </div>
          <div className="list-container">
            {topProducts.map((prod) => (
              <div className="list-item" key={prod.id}>
                <img src={prod.img} alt={prod.name} />
                <div className="item-details">
                  <h4>{prod.name}</h4>
                  <p>{prod.sold} units sold</p>
                </div>
                <div className="item-revenue text-green font-bold">
                  {prod.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="top-list-card card">
          <div className="card-header">
            <h3>Top Sellers</h3>
          </div>
          <div className="list-container">
            {topSellers.map((seller) => (
              <div className="list-item" key={seller.id}>
                <img src={seller.img} alt={seller.shop} className="rounded-full" />
                <div className="item-details">
                  <h4>{seller.shop}</h4>
                  <p>{seller.orders} orders</p>
                </div>
                <div className="item-revenue text-purple font-bold">
                  {seller.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-timeline">
            {activities.map((act) => (
              <div className="activity-item" key={act.id}>
                <div className={`activity-icon ${act.type}`}>
                  {act.type === 'store' && <Store size={14} />}
                  {act.type === 'payment' && <IndianRupee size={14} />}
                  {act.type === 'order' && <ShoppingBag size={14} />}
                  {act.type === 'product' && <Package size={14} />}
                </div>
                <div className="activity-details">
                  <p>{act.text}</p>
                  <span>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
