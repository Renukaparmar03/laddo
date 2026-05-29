import React, { useState } from 'react';
import { Search, Filter, IndianRupee, Clock, CheckCircle, AlertTriangle, Eye, CreditCard, TrendingUp, Gift } from 'lucide-react';
import './AdminDeliveryEarnings.css';

export default function AdminDeliveryEarnings() {
  const [earningsList, setEarningsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  React.useEffect(() => {
    fetchDeliveryEarnings();
  }, []);

  const fetchDeliveryEarnings = async () => {
    try {
      setLoading(true);
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

      const riderStats = {};
      riders.forEach(r => {
        // Show earnings for all approved riders even if 0 deliveries
        if (r.status === 'approved' || r.status === 'active') {
           riderStats[r._id] = { ...r, deliveries: 0 };
        }
      });

      uniqueOrders.forEach(order => {
        if (order.status === 'Delivered') {
          const dBoyId = order.deliveryBoy?._id || order.deliveryBoy;
          if (dBoyId && riderStats[dBoyId]) {
            riderStats[dBoyId].deliveries++;
          }
        }
      });

      const dynamicEarnings = Object.values(riderStats).map(r => {
        const deliveries = r.deliveries;
        const earnings = deliveries * 50; // ₹50 per delivery
        const bonus = deliveries >= 10 ? (Math.floor(deliveries / 10) * 150) : 0; // ₹150 bonus per 10 deliveries
        return {
          id: `ERN-${r._id.substring(0, 8).toUpperCase()}`,
          riderName: r.fullName || r.name || 'Rider',
          image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop', // default avatar
          deliveries,
          earnings,
          bonus,
          totalPayment: earnings + bonus,
          status: 'Pending'
        };
      });

      setEarningsList(dynamicEarnings);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReleasePayment = (id) => {
    setEarningsList(earningsList.map(item => 
      item.id === id ? { ...item, status: 'Paid' } : item
    ));
  };

  const filteredEarnings = earningsList.filter(item => {
    const matchesSearch = item.riderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate top analytics
  const totalPayout = earningsList.reduce((sum, item) => sum + item.totalPayment, 0);
  const totalBonuses = earningsList.reduce((sum, item) => sum + item.bonus, 0);
  const pendingPayments = earningsList.filter(i => i.status === 'Pending').reduce((sum, item) => sum + item.totalPayment, 0);
  const paidPayments = earningsList.filter(i => i.status === 'Paid').reduce((sum, item) => sum + item.totalPayment, 0);

  if (loading) {
    return <div className="admin-delivery-earnings"><div style={{padding: '50px', textAlign: 'center'}}>Calculating live rider earnings...</div></div>;
  }

  return (
    <div className="admin-delivery-earnings">
      <div className="page-header">
        <div className="header-title">
          <h2>Earnings & Bonuses</h2>
          <p>Manage rider payouts, incentives, and payment status</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search rider..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="analytics-grid">
        <div className="stat-card">
          <div className="stat-icon bg-blue-light"><IndianRupee size={24} className="text-blue" /></div>
          <div className="stat-info">
            <p>Total Payout</p>
            <h3>{formatCurrency(totalPayout)}</h3>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon bg-yellow-light"><Clock size={24} className="text-yellow" /></div>
          <div className="stat-info">
            <p>Pending Payments</p>
            <h3>{formatCurrency(pendingPayments)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-green-light"><CheckCircle size={24} className="text-green" /></div>
          <div className="stat-info">
            <p>Paid Payments</p>
            <h3>{formatCurrency(paidPayments)}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-purple-light"><Gift size={24} className="text-purple" /></div>
          <div className="stat-info">
            <p>Total Bonuses</p>
            <h3>{formatCurrency(totalBonuses)}</h3>
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="earnings-card">
        <div className="table-responsive">
          {filteredEarnings.length === 0 ? (
            <div className="empty-state">
              <CreditCard size={48} className="empty-icon" />
              <h3>No Records Found</h3>
              <p>There are no earnings records matching your search.</p>
            </div>
          ) : (
            <table className="earnings-table">
              <thead>
                <tr>
                  <th>Rider</th>
                  <th>Deliveries</th>
                  <th>Base Earnings</th>
                  <th>Bonus</th>
                  <th>Total Payment</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEarnings.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="rider-cell">
                        <img src={item.image} alt={item.riderName} className="rider-avatar-img" />
                        <div>
                          <p className="rider-name-txt">{item.riderName}</p>
                          <p className="earn-id-txt">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="deliveries-badge">{item.deliveries}</span></td>
                    <td>{formatCurrency(item.earnings)}</td>
                    <td className="text-purple font-medium">+{formatCurrency(item.bonus)}</td>
                    <td><span className="total-amount">{formatCurrency(item.totalPayment)}</span></td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Details">
                          <Eye size={18} />
                        </button>
                        {(item.status === 'Pending' || item.status === 'Failed') && (
                          <button 
                            className="btn-icon approve" 
                            title="Release Payment"
                            onClick={() => handleReleasePayment(item.id)}
                          >
                            <CreditCard size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
