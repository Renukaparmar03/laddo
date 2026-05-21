import React, { useState } from 'react';
import { 
  Calendar, TrendingUp, TrendingDown, IndianRupee, Wallet, 
  CreditCard, PieChart, Activity, DollarSign, Download, ArrowUpRight
} from 'lucide-react';
import './AdminRevenue.css';

export default function AdminRevenue() {
  const [dateRange, setDateRange] = useState('This Month');

  // MOCK DATA
  const transactions = [
    { id: 'TXN-001', customer: 'Rahul Sharma', seller: 'RR Mart', amount: '₹1,250', method: 'UPI', status: 'Paid', date: '22 May, 2026 - 14:30' },
    { id: 'TXN-002', customer: 'Priya Patel', seller: 'Tech Store', amount: '₹8,999', method: 'Credit Card', status: 'Paid', date: '22 May, 2026 - 11:15' },
    { id: 'TXN-003', customer: 'Amit Kumar', seller: 'Fresh Foods', amount: '₹450', method: 'Wallet', status: 'Refunded', date: '21 May, 2026 - 09:45' },
    { id: 'TXN-004', customer: 'Neha Gupta', seller: 'Fashion Hub', amount: '₹2,499', method: 'Debit Card', status: 'Failed', date: '21 May, 2026 - 18:20' },
    { id: 'TXN-005', customer: 'Vikram Singh', seller: 'Gadget World', amount: '₹14,500', method: 'UPI', status: 'Pending', date: '20 May, 2026 - 16:10' },
  ];

  const recentPayments = [
    { name: 'Rahul Sharma', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&q=80', amount: '+₹1,250', time: '10 mins ago' },
    { name: 'Priya Patel', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80', amount: '+₹8,999', time: '2 hours ago' },
    { name: 'Amit Kumar', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80', amount: '+₹450', time: '5 hours ago' },
  ];

  const topCategories = [
    { name: 'Electronics', amount: '₹1.8M', percent: 65 },
    { name: 'Fashion', amount: '₹850K', percent: 25 },
    { name: 'Groceries', amount: '₹340K', percent: 10 },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Pending': return 'status-pending';
      case 'Refunded': return 'status-refunded';
      case 'Failed': return 'status-failed';
      default: return '';
    }
  };

  return (
    <div className="admin-revenue-page">
      {/* Header Section */}
      <div className="revenue-header">
        <div className="header-title">
          <h1>Revenue & Finance</h1>
          <p>Track earnings, platform commissions, and settlements</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">
            <Download size={18} /> Export Report
          </button>
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
      <div className="revenue-summary-grid">
        <div className="revenue-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-blue-light">
              <IndianRupee size={22} className="text-blue" />
            </div>
            <div className="trend-badge positive">
              <TrendingUp size={14} /> <span>+24.5%</span>
            </div>
          </div>
          <p className="stat-label">Total Revenue</p>
          <h3 className="stat-value">₹8.4M</h3>
        </div>
        
        <div className="revenue-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-green-light">
              <Activity size={22} className="text-green" />
            </div>
            <div className="trend-badge positive">
              <TrendingUp size={14} /> <span>+12.2%</span>
            </div>
          </div>
          <p className="stat-label">Monthly Revenue</p>
          <h3 className="stat-value">₹1.2M</h3>
        </div>

        <div className="revenue-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-purple-light">
              <PieChart size={22} className="text-purple" />
            </div>
            <div className="trend-badge positive">
              <TrendingUp size={14} /> <span>+8.4%</span>
            </div>
          </div>
          <p className="stat-label">Platform Commission (5%)</p>
          <h3 className="stat-value">₹420K</h3>
        </div>

        <div className="revenue-stat-card">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper bg-orange-light">
              <CreditCard size={22} className="text-orange" />
            </div>
            <div className="trend-badge negative">
              <TrendingDown size={14} /> <span>-1.2%</span>
            </div>
          </div>
          <p className="stat-label">Total Transactions</p>
          <h3 className="stat-value">45,280</h3>
        </div>
      </div>

      {/* Middle Section: Charts & Insights */}
      <div className="revenue-middle-section">
        {/* Revenue Chart */}
        <div className="revenue-chart-card card">
          <div className="card-header">
            <h3>Revenue Overview</h3>
            <div className="chart-legend">
              <span className="legend-item"><div className="dot bg-blue"></div> Revenue</span>
              <span className="legend-item"><div className="dot bg-purple"></div> Commission</span>
            </div>
          </div>
          <div className="css-revenue-chart">
            <div className="chart-bar-group">
              <div className="chart-bars">
                <div className="bar rev-bar" style={{height: '40%'}}></div>
                <div className="bar com-bar" style={{height: '10%'}}></div>
              </div>
              <span>Jan</span>
            </div>
            <div className="chart-bar-group">
              <div className="chart-bars">
                <div className="bar rev-bar" style={{height: '60%'}}></div>
                <div className="bar com-bar" style={{height: '15%'}}></div>
              </div>
              <span>Feb</span>
            </div>
            <div className="chart-bar-group">
              <div className="chart-bars">
                <div className="bar rev-bar" style={{height: '50%'}}></div>
                <div className="bar com-bar" style={{height: '12%'}}></div>
              </div>
              <span>Mar</span>
            </div>
            <div className="chart-bar-group">
              <div className="chart-bars">
                <div className="bar rev-bar" style={{height: '80%'}}></div>
                <div className="bar com-bar" style={{height: '20%'}}></div>
              </div>
              <span>Apr</span>
            </div>
            <div className="chart-bar-group">
              <div className="chart-bars">
                <div className="bar rev-bar" style={{height: '95%'}}></div>
                <div className="bar com-bar" style={{height: '24%'}}></div>
              </div>
              <span>May</span>
            </div>
          </div>
        </div>

        {/* Revenue Insights & Top Categories */}
        <div className="revenue-insights-card card">
          <div className="card-header">
            <h3>Revenue Insights</h3>
          </div>
          <div className="insights-grid">
            <div className="insight-box">
              <p>Average Order Value</p>
              <h4>₹850</h4>
            </div>
            <div className="insight-box">
              <p>Highest Earning Day</p>
              <h4>Sunday</h4>
            </div>
            <div className="insight-box full-width">
              <p>MoM Growth</p>
              <h4 className="text-green">+18.4%</h4>
            </div>
          </div>

          <div className="card-header mt-4">
            <h3>Top Revenue Sources</h3>
          </div>
          <div className="sources-list">
            {topCategories.map((cat, idx) => (
              <div className="source-item" key={idx}>
                <div className="source-info">
                  <span>{cat.name}</span>
                  <span className="font-bold">{cat.amount}</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill bg-blue" style={{ width: `${cat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Transactions & Recent Payments */}
      <div className="revenue-bottom-section">
        {/* Transactions Table */}
        <div className="transactions-card card">
          <div className="card-header">
            <h3>Recent Transactions</h3>
            <button className="btn-link">View All</button>
          </div>
          <div className="table-responsive">
            {transactions.length === 0 ? (
              <div className="empty-state">
                <DollarSign size={48} className="empty-icon" />
                <h3>No Revenue Data Available</h3>
              </div>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Customer & Seller</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id}>
                      <td className="font-bold">{txn.id}</td>
                      <td>
                        <div className="txn-people">
                          <p className="txn-customer">{txn.customer}</p>
                          <p className="txn-seller">to {txn.seller}</p>
                        </div>
                      </td>
                      <td className="txn-amount">{txn.amount}</td>
                      <td><span className="method-badge">{txn.method}</span></td>
                      <td className="txn-date">{txn.date}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(txn.status)}`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Recent Payments Sidebar */}
        <div className="recent-payments-card card">
          <div className="card-header">
            <h3>Live Payments</h3>
          </div>
          <div className="payments-list">
            {recentPayments.map((payment, idx) => (
              <div className="payment-item" key={idx}>
                <img src={payment.img} alt={payment.name} />
                <div className="payment-info">
                  <h4>{payment.name}</h4>
                  <p>{payment.time}</p>
                </div>
                <div className="payment-amount text-green">
                  {payment.amount}
                </div>
              </div>
            ))}
          </div>
          <button className="btn-full-width mt-4">
            <Wallet size={16} /> View Settlement Hub
          </button>
        </div>
      </div>

    </div>
  );
}
