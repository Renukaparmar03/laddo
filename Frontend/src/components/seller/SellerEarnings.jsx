import React, { useState } from 'react';
import { Calendar, IndianRupee, ShoppingCart, TrendingUp, Package, ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import './SellerEarnings.css';

export default function SellerEarnings() {
  const [dateRange, setDateRange] = useState('This Month');
  const [loading, setLoading] = useState(true);
  const [hasEarnings, setHasEarnings] = useState(false);
  
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    monthlyProfit: 0,
    productsSold: 0
  });
  
  const [topProducts, setTopProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  React.useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);
      const storedSeller = localStorage.getItem('seller_info');
      if (storedSeller) {
        const parsed = JSON.parse(storedSeller);
        const sellerId = parsed._id || parsed.id;
        
        if (sellerId) {
          const res = await fetch(`http://localhost:5000/api/orders/seller/${sellerId}`);
          const data = await res.json();
          
          if (data.orders && data.orders.length > 0) {
            let totalRevenue = 0;
            let productsSold = 0;
            const topProductsMap = new Map();
            const txns = [];

            data.orders.forEach(order => {
              let isPaidStatus = 'Pending';
              if (order.isPaid || order.status === 'Delivered') isPaidStatus = 'Paid';
              else if (order.status === 'Cancelled' || order.status === 'Rejected') isPaidStatus = 'Refunded';

              txns.push({
                id: order.orderId || order._id.substring(0, 8),
                customerName: order.user && order.user.name ? order.user.name : 'Customer',
                amount: order.totalPrice || 0,
                date: new Date(order.createdAt).toLocaleDateString('en-GB'),
                status: isPaidStatus,
                timestamp: new Date(order.createdAt).getTime()
              });

              if (order.isPaid || order.status === 'Delivered') {
                order.orderItems.forEach(item => {
                  totalRevenue += (item.price * item.qty);
                  productsSold += item.qty;
                  
                  const pId = item.product;
                  if (!topProductsMap.has(pId)) {
                    topProductsMap.set(pId, {
                      name: item.title,
                      sold: 0,
                      revenue: 0,
                      image: item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'
                    });
                  }
                  const pStats = topProductsMap.get(pId);
                  pStats.sold += item.qty;
                  pStats.revenue += (item.price * item.qty);
                });
              }
            });

            const topProductsList = Array.from(topProductsMap.values())
              .sort((a,b) => b.sold - a.sold)
              .slice(0, 3);
            
            txns.sort((a,b) => b.timestamp - a.timestamp);
            const recentTxns = txns.slice(0, 5);

            setStats({
              totalRevenue,
              totalOrders: data.totalOrders || 0,
              monthlyProfit: totalRevenue * 0.9, // Standard 10% platform commission assumption
              productsSold
            });
            
            setTopProducts(topProductsList);
            setTransactions(recentTxns);
            setHasEarnings(true);
          } else {
            setHasEarnings(false);
          }
        }
      }
    } catch(err) {
      console.error('Error fetching earnings data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return 'status-paid';
      case 'Pending': return 'status-pending';
      case 'Refunded': return 'status-refunded';
      default: return '';
    }
  };

  if (loading) {
    return <div className="seller-earnings-page"><div style={{padding: '50px', textAlign: 'center'}}>Calculating financials...</div></div>;
  }

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
              <h3 className="stat-value">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="stat-icon bg-green">
              <IndianRupee size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend positive"><ArrowUpRight size={16} /> Live Data</span>
            <span className="trend-text">from active sales</span>
          </div>
        </div>

        <div className="earning-stat-card">
          <div className="card-top">
            <div>
              <p className="stat-label">Total Orders</p>
              <h3 className="stat-value">{stats.totalOrders}</h3>
            </div>
            <div className="stat-icon bg-blue">
              <ShoppingCart size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend positive"><ArrowUpRight size={16} /> Live Data</span>
            <span className="trend-text">from active sales</span>
          </div>
        </div>

        <div className="earning-stat-card">
          <div className="card-top">
            <div>
              <p className="stat-label">Monthly Profit</p>
              <h3 className="stat-value">₹{stats.monthlyProfit.toLocaleString()}</h3>
            </div>
            <div className="stat-icon bg-purple">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend positive"><ArrowUpRight size={16} /> Live Data</span>
            <span className="trend-text">after comms.</span>
          </div>
        </div>

        <div className="earning-stat-card">
          <div className="card-top">
            <div>
              <p className="stat-label">Products Sold</p>
              <h3 className="stat-value">{stats.productsSold}</h3>
            </div>
            <div className="stat-icon bg-orange">
              <Package size={24} />
            </div>
          </div>
          <div className="card-bottom">
            <span className="trend positive"><ArrowUpRight size={16} /> Live Data</span>
            <span className="trend-text">total volume</span>
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
            {topProducts.map((product, i) => (
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
            {topProducts.length === 0 && <p className="text-gray-500 mt-2 text-sm">No products sold yet.</p>}
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
              {transactions.map((trx, i) => (
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
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No recent transactions</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
