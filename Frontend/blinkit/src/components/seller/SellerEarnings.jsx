import React, { useState } from 'react';
import { Calendar, IndianRupee, ShoppingCart, TrendingUp, Package, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import './SellerEarnings.css';

const TRANSACTIONS = [
  { id: 'TRX-10294', customerName: 'Rahul Sharma', amount: 4999, date: 'Oct 24, 2023', status: 'Paid' },
  { id: 'TRX-10293', customerName: 'Priya Patel', amount: 2998, date: 'Oct 23, 2023', status: 'Pending' },
  { id: 'TRX-10292', customerName: 'Amit Kumar', amount: 2499, date: 'Oct 20, 2023', status: 'Paid' },
  { id: 'TRX-10291', customerName: 'Neha Gupta', amount: 3897, date: 'Oct 19, 2023', status: 'Refunded' },
  { id: 'TRX-10290', customerName: 'Vikram Singh', amount: 2250, date: 'Oct 18, 2023', status: 'Paid' },
];

const TOP_PRODUCTS = [
  { name: 'Wireless Noise Cancelling Headphones', sold: 124, revenue: 619876, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
  { name: 'Smart Watch Series 5', sold: 89, revenue: 133411, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
  { name: 'Men\'s Running Shoes', sold: 67, revenue: 167433, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80' },
];

export default function SellerEarnings() {
  const [dateRange, setDateRange] = useState('This Month');

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Pending': return 'status-pending';
      case 'Refunded': return 'status-refunded';
      default: return '';
    }
  };

  const hasEarnings = true; // For demo purpose. Toggle this to test empty state.

  if (!hasEarnings) {
    return (
      <div className="seller-earnings-page">
        <div className="earnings-header">
          <div className="header-title">
            <h1>Earnings</h1>
            <p>Track your revenue, profits, and payouts</p>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <IndianRupee size={64} className="empty-icon" />
          </div>
          <h3>No Earnings Yet</h3>
          <p>Once you start making sales, your earnings and analytics will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-earnings-page">
      {/* Header Section */}
      <div className="earnings-header">
        <div className="header-title">
          <h1>Earnings</h1>
          <p>Track your revenue, profits, and payouts</p>
        </div>
        <div className="header-actions">
          <div className="filter-dropdown">
            <Calendar size={18} className="filter-icon" />
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="This Year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="earnings-summary-cards">
        <div className="earning-stat-card">
          <div className="card-top">
            <div>
              <p className="stat-label">Total Revenue</p>
              <h3 className="stat-value">₹1,24,500</h3>
            </div>
            <div className="stat-icon bg-green">
              <IndianRupee size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend positive"><ArrowUpRight size={16} /> 12.5%</span>
            <span className="trend-text">vs last month</span>
          </div>
        </div>

        <div className="earning-stat-card">
          <div className="card-top">
            <div>
              <p className="stat-label">Total Orders</p>
              <h3 className="stat-value">342</h3>
            </div>
            <div className="stat-icon bg-blue">
              <ShoppingCart size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend positive"><ArrowUpRight size={16} /> 8.2%</span>
            <span className="trend-text">vs last month</span>
          </div>
        </div>

        <div className="earning-stat-card">
          <div className="card-top">
            <div>
              <p className="stat-label">Monthly Profit</p>
              <h3 className="stat-value">₹42,800</h3>
            </div>
            <div className="stat-icon bg-purple">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend positive"><ArrowUpRight size={16} /> 15.3%</span>
            <span className="trend-text">vs last month</span>
          </div>
        </div>

        <div className="earning-stat-card">
          <div className="card-top">
            <div>
              <p className="stat-label">Products Sold</p>
              <h3 className="stat-value">512</h3>
            </div>
            <div className="stat-icon bg-orange">
              <Package size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend negative"><ArrowDownRight size={16} /> 2.1%</span>
            <span className="trend-text">vs last month</span>
          </div>
        </div>
      </div>

      <div className="earnings-grid">
        {/* Sales Overview Chart */}
        <div className="chart-section card">
          <div className="card-header">
            <h3>Revenue Overview</h3>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot current"></span> Current Period</span>
              <span className="legend-item"><span className="dot previous"></span> Previous Period</span>
            </div>
          </div>
          <div className="css-chart-container">
            <div className="y-axis">
              <span>₹40k</span>
              <span>₹30k</span>
              <span>₹20k</span>
              <span>₹10k</span>
              <span>₹0</span>
            </div>
            <div className="chart-bars">
              {[
                { label: 'Mon', h1: '40%', h2: '30%' },
                { label: 'Tue', h1: '60%', h2: '45%' },
                { label: 'Wed', h1: '35%', h2: '50%' },
                { label: 'Thu', h1: '80%', h2: '65%' },
                { label: 'Fri', h1: '55%', h2: '70%' },
                { label: 'Sat', h1: '90%', h2: '85%' },
                { label: 'Sun', h1: '75%', h2: '60%' },
              ].map((day, i) => (
                <div className="bar-group" key={i}>
                  <div className="bars">
                    <div className="bar previous-bar" style={{ height: day.h2 }}></div>
                    <div className="bar current-bar" style={{ height: day.h1 }}></div>
                  </div>
                  <span className="x-label">{day.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="top-products-section card">
          <div className="card-header">
            <h3>Top Selling Products</h3>
            <button className="btn-text">View All</button>
          </div>
          <div className="top-products-list">
            {TOP_PRODUCTS.map((product, i) => (
              <div className="top-product-item" key={i}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="name">{product.name}</span>
                  <span className="sold">{product.sold} units sold</span>
                </div>
                <div className="product-revenue">
                  ₹{product.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="transactions-section card">
        <div className="card-header">
          <h3>Recent Transactions</h3>
          <button className="btn-text">Download Report</button>
        </div>
        <div className="table-responsive">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((trx, i) => (
                <tr key={i}>
                  <td className="trx-id">{trx.id}</td>
                  <td className="trx-date">{trx.date}</td>
                  <td className="trx-customer">{trx.customerName}</td>
                  <td className="trx-amount">₹{trx.amount.toLocaleString()}</td>
                  <td>
                    <span className={`trx-status-badge ${getStatusClass(trx.status)}`}>
                      {trx.status}
                    </span>
                  </td>
                  <td>
                    <button className="more-btn"><MoreVertical size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
