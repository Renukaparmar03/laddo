import React, { useState } from 'react';
import { Store, UserCheck, Clock, IndianRupee, ArrowUpRight, TrendingUp, Activity, CheckCircle, Shield, ChevronRight } from 'lucide-react';
import './AdminSellerOverview.css';

export default function AdminSellerOverview() {
  const [data, setData] = useState({
    totalSellers: 0,
    activeSellers: 0,
    pendingRequests: 0,
    totalRevenue: 0,
    topSellers: [],
    recentActivity: [],
    loading: true
  });

  React.useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      const sellersRes = await fetch('http://localhost:5000/api/sellers');
      const sellers = await sellersRes.json();
      
      let allOrders = [];
      await Promise.all(sellers.map(async (seller) => {
        try {
          const orderRes = await fetch(`http://localhost:5000/api/orders/seller/${seller._id}`);
          const orderData = await orderRes.json();
          if (orderData.orders) {
            allOrders = [...allOrders, ...orderData.orders];
          }
        } catch (e) {}
      }));

      // Deduplicate orders
      const uniqueOrdersMap = new Map();
      allOrders.forEach(o => uniqueOrdersMap.set(o._id, o));
      const uniqueOrders = Array.from(uniqueOrdersMap.values());

      const sellerStats = {};
      sellers.forEach(s => {
         sellerStats[s._id] = { ...s, revenue: 0 };
      });

      let totalRev = 0;
      uniqueOrders.forEach(order => {
        if (order.isPaid || order.status === 'Delivered') {
           order.orderItems.forEach(item => {
              const sId = item.seller?._id || item.seller;
              if (sellerStats[sId]) {
                 sellerStats[sId].revenue += item.price * item.qty;
                 totalRev += item.price * item.qty;
              }
           });
        }
      });

      const topSellers = Object.values(sellerStats)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 3)
        .map(s => ({ 
           name: s.businessName || 'Unknown Shop', 
           rev: `₹${s.revenue.toLocaleString()}`, 
           status: s.isApproved ? 'Active' : 'Pending' 
        }));

      const activeSellers = sellers.filter(s => s.isApproved).length;
      const pendingRequests = sellers.length - activeSellers;
      
      const recentActivity = sellers
        .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(s => {
          const hours = Math.floor((new Date() - new Date(s.createdAt)) / (1000 * 60 * 60));
          const timeStr = hours < 1 ? 'Just now' : (hours < 24 ? `${hours} hours ago` : `${Math.floor(hours/24)} days ago`);
          return {
             name: s.businessName || 'A new shop',
             type: s.isApproved ? 'approved' : 'registered',
             time: timeStr
          }
      });

      setData({
        totalSellers: sellers.length,
        activeSellers,
        pendingRequests,
        totalRevenue: totalRev,
        topSellers,
        recentActivity,
        loading: false
      });

    } catch (err) {
      console.error(err);
      setData(prev => ({...prev, loading: false}));
    }
  };

  if (data.loading) {
    return <div className="admin-seller-overview"><div style={{padding: '50px', textAlign: 'center'}}>Loading real-time seller metrics...</div></div>;
  }

  return (
    <div className="admin-seller-overview">
      <div className="overview-header">
        <div>
          <h2>Seller Overview</h2>
          <p>Monitor your platform's seller performance and activities</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="summary-cards">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <Store size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Sellers</p>
            <h3 className="stat-value">{data.totalSellers}</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> Live Platform Data</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <UserCheck size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Active Sellers</p>
            <h3 className="stat-value">{data.activeSellers}</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> Live Platform Data</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Requests</p>
            <h3 className="stat-value">{data.pendingRequests}</h3>
            <span className="trend positive">Needs review</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Seller Revenue</p>
            <h3 className="stat-value">₹{data.totalRevenue.toLocaleString()}</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> Live Platform Data</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="overview-grid">
        <div className="card">
          <div className="card-header">
            <h3>Seller Growth</h3>
            <select className="date-select"><option>This Year</option></select>
          </div>
          <div className="chart-placeholder">
            {[30, 45, 55, 60, 65, 80, 85, 95, 110, 130, 145, 160].map((height, i) => (
              <div className="bar-wrapper" key={i}>
                <div className="bar bg-blue-bar" style={{height: `${height/2}%`}}></div>
                <span className="month-label">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Monthly Revenue</h3>
            <select className="date-select"><option>This Year</option></select>
          </div>
          <div className="chart-placeholder">
            {[40, 35, 50, 70, 65, 85, 90, 80, 100, 115, 105, 125].map((height, i) => (
              <div className="bar-wrapper" key={i}>
                <div className="bar bg-purple-bar" style={{height: `${height/1.5}%`}}></div>
                <span className="month-label">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Lists & Recent Activity */}
      <div className="overview-lists-grid">
        <div className="lists-col">
          {/* Top Sellers */}
          <div className="card">
            <div className="card-header">
              <h3>Top Sellers</h3>
              <button className="btn-text">View All</button>
            </div>
            <div className="sellers-list">
              {data.topSellers.map((seller, i) => (
                <div className="seller-list-item" key={i}>
                  <div className="seller-avatar">{seller.name?.charAt(0) || 'S'}</div>
                  <div className="seller-details">
                    <h4>{seller.name}</h4>
                    <span className="status-text text-green">{seller.status}</span>
                  </div>
                  <div className="seller-rev">{seller.rev}</div>
                </div>
              ))}
              {data.topSellers.length === 0 && <p className="text-gray-500 text-sm mt-2">No seller revenue data yet.</p>}
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="card">
            <div className="card-header">
              <h3>Pending Verifications & Requests</h3>
              <button className="btn-text">View All</button>
            </div>
            <div className="sellers-list">
              {data.recentActivity.filter(r => r.type === 'registered').map((req, i) => (
                <div className="seller-list-item" key={i}>
                  <div className="req-icon">
                    <Store size={16} />
                  </div>
                  <div className="seller-details">
                    <h4>{req.name}</h4>
                    <span className="status-text">Pending Approval</span>
                  </div>
                  <div className="time-text">{req.time}</div>
                </div>
              ))}
              {data.recentActivity.filter(r => r.type === 'registered').length === 0 && <p className="text-gray-500 text-sm mt-2">No pending verifications at the moment.</p>}
            </div>
          </div>
        </div>

        <div className="activity-col">
          {/* Recent Activity */}
          <div className="card" style={{ height: '100%' }}>
            <div className="card-header">
              <h3>Recent Activity</h3>
            </div>
            <div className="activity-timeline">
              {data.recentActivity.map((act, idx) => (
                <div className="timeline-item" key={idx}>
                  <div className={`timeline-icon ${act.type === 'approved' ? 'bg-green' : 'bg-blue'}`}>
                    {act.type === 'approved' ? <Shield size={14} /> : <Store size={14} />}
                  </div>
                  <div className="timeline-content">
                    <p><strong>{act.name}</strong> {act.type === 'approved' ? 'was approved' : 'registered on the platform'}.</p>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
              {data.recentActivity.length === 0 && <p className="text-gray-500 text-sm">No recent seller activity.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
