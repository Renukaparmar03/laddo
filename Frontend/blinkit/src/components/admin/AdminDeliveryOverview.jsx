import React from 'react';
import { Users, Truck, CheckCircle, Star, IndianRupee, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import './AdminDeliveryOverview.css';

const performanceData = [
  { name: 'Mon', deliveries: 120, time: 25 },
  { name: 'Tue', deliveries: 145, time: 24 },
  { name: 'Wed', deliveries: 180, time: 22 },
  { name: 'Thu', deliveries: 165, time: 26 },
  { name: 'Fri', deliveries: 210, time: 20 },
  { name: 'Sat', deliveries: 280, time: 18 },
  { name: 'Sun', deliveries: 250, time: 21 },
];

const earningsData = [
  { name: 'Week 1', payouts: 45000, bonuses: 5000 },
  { name: 'Week 2', payouts: 52000, bonuses: 6500 },
  { name: 'Week 3', payouts: 48000, bonuses: 4000 },
  { name: 'Week 4', payouts: 61000, bonuses: 8500 },
];

export default function AdminDeliveryOverview() {
  return (
    <div className="admin-delivery-overview">
      <div className="overview-header">
        <div>
          <h2>Delivery Overview</h2>
          <p>Monitor your fleet's performance and analytics</p>
        </div>
        <div className="date-filter">
          <select defaultValue="7">
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">This Quarter</option>
          </select>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card total-riders">
          <div className="kpi-icon"><Users size={24} /></div>
          <div className="kpi-info">
            <p>Total Riders</p>
            <h3>145</h3>
            <span className="trend positive"><TrendingUp size={14} /> +12 this month</span>
          </div>
        </div>
        
        <div className="kpi-card active-riders">
          <div className="kpi-icon"><Truck size={24} /></div>
          <div className="kpi-info">
            <p>Active Right Now</p>
            <h3>86</h3>
            <span className="trend neutral">60% of fleet</span>
          </div>
        </div>

        <div className="kpi-card completed">
          <div className="kpi-icon"><CheckCircle size={24} /></div>
          <div className="kpi-info">
            <p>Completed Deliveries</p>
            <h3>1,350</h3>
            <span className="trend positive"><TrendingUp size={14} /> +15% vs last week</span>
          </div>
        </div>

        <div className="kpi-card rating">
          <div className="kpi-icon"><Star size={24} /></div>
          <div className="kpi-info">
            <p>Average Rating</p>
            <h3>4.8</h3>
            <span className="trend positive">Excellent</span>
          </div>
        </div>

        <div className="kpi-card payouts">
          <div className="kpi-icon"><IndianRupee size={24} /></div>
          <div className="kpi-info">
            <p>Total Payouts</p>
            <h3>₹2.06L</h3>
            <span className="trend neutral">In last 30 days</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        {/* Deliveries Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Delivery Volume & Speed</h3>
            <p>Daily deliveries vs average delivery time (mins)</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDeliveries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="deliveries" name="Deliveries" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorDeliveries)" />
                <Area yAxisId="right" type="monotone" dataKey="time" name="Avg Time (mins)" stroke="#f59e0b" strokeWidth={2} fill="none" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Payouts & Bonuses</h3>
            <p>Weekly financial breakdown</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  formatter={(value) => `₹${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="payouts" name="Regular Payouts" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="bonuses" name="Incentives/Bonuses" stackId="a" fill="#34d399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="info-card">
          <div className="card-heading">
            <h3>Top Performing Riders</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="list-container">
            {[
              { name: 'Ramesh Singh', deliveries: 145, rating: 4.9, status: 'Active' },
              { name: 'Suresh Kumar', deliveries: 132, rating: 4.8, status: 'Active' },
              { name: 'Abdul Rahman', deliveries: 128, rating: 4.8, status: 'Offline' },
              { name: 'Vikram Mehta', deliveries: 115, rating: 4.7, status: 'Active' }
            ].map((rider, i) => (
              <div className="list-item" key={i}>
                <div className="item-left">
                  <div className="avatar bg-blue-light">{rider.name.charAt(0)}</div>
                  <div>
                    <h4>{rider.name}</h4>
                    <p>{rider.deliveries} deliveries this week</p>
                  </div>
                </div>
                <div className="item-right">
                  <div className="rating-pill"><Star size={12} className="text-yellow" /> {rider.rating}</div>
                  <span className={`dot ${rider.status.toLowerCase()}`}></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-card">
          <div className="card-heading">
            <h3>Active Alerts</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="list-container">
            <div className="alert-item warning">
              <div className="alert-icon"><Clock size={18} /></div>
              <div className="alert-content">
                <h4>High Delivery Time</h4>
                <p>Average time in Sector 4 exceeded 35 mins</p>
              </div>
              <span className="alert-time">10m ago</span>
            </div>
            <div className="alert-item critical">
              <div className="alert-icon"><AlertCircle size={18} /></div>
              <div className="alert-content">
                <h4>Rider Shortage</h4>
                <p>Only 5 riders active in Downtown area</p>
              </div>
              <span className="alert-time">1h ago</span>
            </div>
            <div className="alert-item info">
              <div className="alert-icon"><Truck size={18} /></div>
              <div className="alert-content">
                <h4>Vehicle Breakdown</h4>
                <p>Rider ID #1042 reported breakdown</p>
              </div>
              <span className="alert-time">2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
