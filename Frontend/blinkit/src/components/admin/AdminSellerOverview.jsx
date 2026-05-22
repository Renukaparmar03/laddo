import React from 'react';
import { Store, UserCheck, Clock, IndianRupee, ArrowUpRight, TrendingUp, Activity, CheckCircle, Shield, ChevronRight } from 'lucide-react';
import './AdminSellerOverview.css';

export default function AdminSellerOverview() {
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
            <h3 className="stat-value">1,245</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> +12% this month</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <UserCheck size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Active Sellers</p>
            <h3 className="stat-value">1,080</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> +8% this month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Requests</p>
            <h3 className="stat-value">45</h3>
            <span className="trend positive">Needs review</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Seller Revenue</p>
            <h3 className="stat-value">₹24.5M</h3>
            <span className="trend positive"><ArrowUpRight size={14} /> +18% this month</span>
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
              {[
                { name: 'ElectroWorld', rev: '₹4.2M', status: 'Active' },
                { name: 'Fresh Mart', rev: '₹3.8M', status: 'Active' },
                { name: 'Fashion Hub', rev: '₹2.9M', status: 'Active' },
              ].map((seller, i) => (
                <div className="seller-list-item" key={i}>
                  <div className="seller-avatar">{seller.name.charAt(0)}</div>
                  <div className="seller-details">
                    <h4>{seller.name}</h4>
                    <span className="status-text text-green">{seller.status}</span>
                  </div>
                  <div className="seller-rev">{seller.rev}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="card">
            <div className="card-header">
              <h3>Pending Verifications & Requests</h3>
              <button className="btn-text">View All</button>
            </div>
            <div className="sellers-list">
              {[
                { name: 'Gadget Store', type: 'GST Verification', time: '2 hrs ago' },
                { name: 'Super Foods', type: 'New Registration', time: '5 hrs ago' },
                { name: 'Style Icons', type: 'Fund Release', time: '1 day ago' },
              ].map((req, i) => (
                <div className="seller-list-item" key={i}>
                  <div className="req-icon">
                    {req.type.includes('GST') ? <Shield size={16} /> : req.type.includes('Fund') ? <IndianRupee size={16} /> : <Store size={16} />}
                  </div>
                  <div className="seller-details">
                    <h4>{req.name}</h4>
                    <span className="status-text">{req.type}</span>
                  </div>
                  <div className="time-text">{req.time}</div>
                </div>
              ))}
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
              <div className="timeline-item">
                <div className="timeline-icon bg-blue"><Store size={14} /></div>
                <div className="timeline-content">
                  <p><strong>Tech Bazaar</strong> completed registration.</p>
                  <span>10 mins ago</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon bg-green"><Shield size={14} /></div>
                <div className="timeline-content">
                  <p>GST approved for <strong>Fresh Organic</strong>.</p>
                  <span>45 mins ago</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon bg-purple"><IndianRupee size={14} /></div>
                <div className="timeline-content">
                  <p>Fund release of ₹1.2L initiated for <strong>Fashion Pro</strong>.</p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon bg-orange"><CheckCircle size={14} /></div>
                <div className="timeline-content">
                  <p><strong>Gourmet Foods</strong> verification passed.</p>
                  <span>5 hours ago</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon bg-blue"><Store size={14} /></div>
                <div className="timeline-content">
                  <p><strong>Daily Needs</strong> joined the platform.</p>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
