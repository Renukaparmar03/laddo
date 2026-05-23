import React, { useState } from 'react';
import { Search, Filter, IndianRupee, Clock, CheckCircle, AlertTriangle, Eye, CreditCard, TrendingUp, Gift } from 'lucide-react';
import './AdminDeliveryEarnings.css';

const MOCK_EARNINGS = [
  {
    id: 'ERN-1001',
    riderName: 'Ramesh Singh',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    deliveries: 145,
    earnings: 12500,
    bonus: 2000,
    totalPayment: 14500,
    status: 'Pending'
  },
  {
    id: 'ERN-1002',
    riderName: 'Suresh Kumar',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    deliveries: 132,
    earnings: 11800,
    bonus: 1500,
    totalPayment: 13300,
    status: 'Paid'
  },
  {
    id: 'ERN-1003',
    riderName: 'Abdul Rahman',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    deliveries: 128,
    earnings: 11000,
    bonus: 1000,
    totalPayment: 12000,
    status: 'Paid'
  },
  {
    id: 'ERN-1004',
    riderName: 'Vikram Mehta',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    deliveries: 45,
    earnings: 3500,
    bonus: 0,
    totalPayment: 3500,
    status: 'Failed'
  },
  {
    id: 'ERN-1005',
    riderName: 'David Lee',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    deliveries: 160,
    earnings: 14000,
    bonus: 3500,
    totalPayment: 17500,
    status: 'Pending'
  }
];

export default function AdminDeliveryEarnings() {
  const [earningsList, setEarningsList] = useState(MOCK_EARNINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

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
