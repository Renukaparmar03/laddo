import React, { useState } from 'react';
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
  const [data, setData] = useState({
    totalRiders: 0,
    activeRiders: 0,
    completedDeliveries: 0,
    totalPayouts: 0,
    topRiders: [],
    alerts: [],
    loading: true
  });

  React.useEffect(() => {
    fetchDeliveryData();
  }, []);

  const fetchDeliveryData = async () => {
    try {
      setData(prev => ({...prev, loading: true}));
      const [delRes, sellersRes] = await Promise.all([
        fetch('http://localhost:5000/api/delivery'),
        fetch('http://localhost:5000/api/sellers')
      ]);

      const riders = await delRes.json();
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

      const uniqueOrdersMap = new Map();
      allOrders.forEach(o => uniqueOrdersMap.set(o._id, o));
      const uniqueOrders = Array.from(uniqueOrdersMap.values());

      let completedCount = 0;
      let delayedCount = 0;
      const riderStats = {};
      riders.forEach(r => {
        riderStats[r._id] = { ...r, deliveries: 0 };
      });

      uniqueOrders.forEach(order => {
        if (order.status === 'Delivered') {
          completedCount++;
          const dBoyId = order.deliveryBoy?._id || order.deliveryBoy;
          if (dBoyId && riderStats[dBoyId]) {
            riderStats[dBoyId].deliveries++;
          }
        } else if (order.status === 'Pending' && (new Date() - new Date(order.createdAt)) > 24 * 60 * 60 * 1000) {
          delayedCount++;
        }
      });

      const topRiders = Object.values(riderStats)
        .sort((a,b) => b.deliveries - a.deliveries)
        .slice(0, 4)
        .map(r => ({
           name: r.fullName || r.name || 'Rider',
           deliveries: r.deliveries,
           rating: (4.5 + Math.random() * 0.5).toFixed(1), // Mock rating
           status: (r.status === 'active' || r.status === 'approved') ? 'Active' : 'Offline'
        }));

      const activeCount = riders.filter(r => r.status === 'active' || r.status === 'approved').length;
      
      const alerts = [];
      if (delayedCount > 0) {
        alerts.push({
          id: 1, type: 'warning', icon: <Clock size={18} />, title: 'High Delivery Time', desc: `${delayedCount} orders have been pending for over 24 hours.`, time: 'Recently'
        });
      }
      if (activeCount < 5 && riders.length > 0) {
        alerts.push({
          id: 2, type: 'critical', icon: <AlertCircle size={18} />, title: 'Rider Shortage', desc: `Only ${activeCount} riders are currently active.`, time: 'Recently'
        });
      }
      if (alerts.length === 0) {
        alerts.push({
          id: 3, type: 'info', icon: <CheckCircle size={18} />, title: 'All Good', desc: `No major operational alerts.`, time: 'Recently'
        });
      }

      setData({
        totalRiders: riders.length,
        activeRiders: activeCount,
        completedDeliveries: completedCount,
        totalPayouts: completedCount * 50, // Assuming ₹50 base payout per delivery
        topRiders,
        alerts,
        loading: false
      });
    } catch(err) {
      console.error(err);
      setData(prev => ({...prev, loading: false}));
    }
  };

  if (data.loading) {
    return <div className="admin-delivery-overview"><div style={{padding: '50px', textAlign: 'center'}}>Loading live rider fleet analytics...</div></div>;
  }
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
            <h3>{data.totalRiders}</h3>
            <span className="trend positive"><TrendingUp size={14} /> Platform Data</span>
          </div>
        </div>
        
        <div className="kpi-card active-riders">
          <div className="kpi-icon"><Truck size={24} /></div>
          <div className="kpi-info">
            <p>Active Right Now</p>
            <h3>{data.activeRiders}</h3>
            <span className="trend neutral">{data.totalRiders > 0 ? Math.round((data.activeRiders/data.totalRiders)*100) : 0}% of fleet</span>
          </div>
        </div>

        <div className="kpi-card completed">
          <div className="kpi-icon"><CheckCircle size={24} /></div>
          <div className="kpi-info">
            <p>Completed Deliveries</p>
            <h3>{data.completedDeliveries.toLocaleString()}</h3>
            <span className="trend positive"><TrendingUp size={14} /> Accurate Count</span>
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
            <h3>₹{(data.totalPayouts / 1000).toFixed(1)}k</h3>
            <span className="trend neutral">Based on ₹50/delivery</span>
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
            <ResponsiveContainer width="100%" height={300}>
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
            <ResponsiveContainer width="100%" height={300}>
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
            {data.topRiders.map((rider, i) => (
              <div className="list-item" key={i}>
                <div className="item-left">
                  <div className="avatar bg-blue-light">{rider.name.charAt(0)}</div>
                  <div>
                    <h4>{rider.name}</h4>
                    <p>{rider.deliveries} deliveries total</p>
                  </div>
                </div>
                <div className="item-right">
                  <div className="rating-pill"><Star size={12} className="text-yellow" /> {rider.rating}</div>
                  <span className={`dot ${rider.status.toLowerCase()}`}></span>
                </div>
              </div>
            ))}
            {data.topRiders.length === 0 && <p className="text-gray-500 text-sm mt-2">No rider data yet.</p>}
          </div>
        </div>

        <div className="info-card">
          <div className="card-heading">
            <h3>Active Alerts</h3>
            <button className="view-all">View All</button>
          </div>
          <div className="list-container">
            {data.alerts.map((alert) => (
              <div className={`alert-item ${alert.type}`} key={alert.id}>
                <div className="alert-icon">{alert.icon}</div>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.desc}</p>
                </div>
                <span className="alert-time">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
