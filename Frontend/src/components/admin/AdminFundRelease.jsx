import React, { useState } from 'react';
import { Search, Filter, CheckCircle, PauseCircle, Eye, IndianRupee, Landmark, FileText, X, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import './AdminFundRelease.css';

const MOCK_PAYOUTS = [
  {
    id: 'PAY-1001',
    sellerName: 'Fresh Mart Grocery',
    orderAmount: 150000,
    platformCommission: 15000,
    gstDeduction: 2700,
    finalPayable: 132300,
    status: 'Pending',
    bankDetails: {
      bankName: 'HDFC Bank',
      accountNo: 'XXXX-XXXX-1234',
      ifsc: 'HDFC0001234',
      holder: 'Priya Patel'
    },
    history: [
      { id: 'TXN-001', date: '21 May 2024', amount: '₹1,50,000', type: 'Sales Accrued' },
      { id: 'TXN-002', date: '22 May 2024', amount: '₹15,000', type: 'Commission Ded.' }
    ]
  },
  {
    id: 'PAY-1002',
    sellerName: 'ElectroWorld',
    orderAmount: 450000,
    platformCommission: 45000,
    gstDeduction: 8100,
    finalPayable: 396900,
    status: 'Released',
    bankDetails: {
      bankName: 'ICICI Bank',
      accountNo: 'XXXX-XXXX-5678',
      ifsc: 'ICIC0005678',
      holder: 'Rahul Sharma'
    },
    history: [
      { id: 'TXN-003', date: '18 May 2024', amount: '₹3,96,900', type: 'Payout Transferred' }
    ]
  },
  {
    id: 'PAY-1003',
    sellerName: 'Fashion Hub',
    orderAmount: 85000,
    platformCommission: 8500,
    gstDeduction: 1530,
    finalPayable: 74970,
    status: 'On Hold',
    bankDetails: {
      bankName: 'State Bank of India',
      accountNo: 'XXXX-XXXX-9012',
      ifsc: 'SBIN0009012',
      holder: 'Amit Kumar Fashion'
    },
    history: [
      { id: 'TXN-004', date: '20 May 2024', amount: '₹85,000', type: 'Sales Accrued' },
      { id: 'TXN-005', date: '21 May 2024', amount: '-', type: 'Account Suspended' }
    ]
  },
  {
    id: 'PAY-1004',
    sellerName: 'Green Organic Foods',
    orderAmount: 210000,
    platformCommission: 21000,
    gstDeduction: 3780,
    finalPayable: 185220,
    status: 'Pending',
    bankDetails: {
      bankName: 'Kotak Mahindra',
      accountNo: 'XXXX-XXXX-7890',
      ifsc: 'KKBK0007890',
      holder: 'Neha Gupta'
    },
    history: [
      { id: 'TXN-006', date: '22 May 2024', amount: '₹2,10,000', type: 'Sales Accrued' }
    ]
  }
];

export default function AdminFundRelease() {
  const [payouts, setPayouts] = useState(MOCK_PAYOUTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPayout, setSelectedPayout] = useState(null);

  const handleAction = (id, newStatus) => {
    setPayouts(payouts.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (selectedPayout && selectedPayout.id === id) {
      setSelectedPayout({ ...selectedPayout, status: newStatus });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredPayouts = payouts.filter(p => {
    const matchesSearch = p.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-fund-release">
      <div className="page-header">
        <div className="header-title">
          <h2>Fund Release</h2>
          <p>Manage seller payouts and commission deductions</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search seller..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Released">Released</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      <div className="payout-card">
        <div className="table-responsive">
          {filteredPayouts.length === 0 ? (
            <div className="empty-state">
              <IndianRupee size={48} className="empty-icon" />
              <h3>No Payouts Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <table className="payout-table">
              <thead>
                <tr>
                  <th>Seller Name</th>
                  <th>Order Amount</th>
                  <th>Commission (10%)</th>
                  <th>GST (18% on Comm.)</th>
                  <th>Final Payable</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayouts.map((payout) => (
                  <tr key={payout.id}>
                    <td>
                      <p className="seller-name-txt">{payout.sellerName}</p>
                      <p className="payout-id-txt">{payout.id}</p>
                    </td>
                    <td>{formatCurrency(payout.orderAmount)}</td>
                    <td className="text-red">-{formatCurrency(payout.platformCommission)}</td>
                    <td className="text-red">-{formatCurrency(payout.gstDeduction)}</td>
                    <td><span className="final-amount">{formatCurrency(payout.finalPayable)}</span></td>
                    <td>
                      <span className={`status-badge ${payout.status.toLowerCase().replace(' ', '-')}`}>
                        {payout.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Invoice" onClick={() => setSelectedPayout(payout)}>
                          <Eye size={18} />
                        </button>
                        {payout.status === 'Pending' && (
                          <>
                            <button className="btn-icon approve" title="Release Payment" onClick={() => handleAction(payout.id, 'Released')}>
                              <CheckCircle size={18} />
                            </button>
                            <button className="btn-icon reject" title="Hold Payment" onClick={() => handleAction(payout.id, 'On Hold')}>
                              <PauseCircle size={18} />
                            </button>
                          </>
                        )}
                        {payout.status === 'On Hold' && (
                          <button className="btn-icon approve" title="Release Payment" onClick={() => handleAction(payout.id, 'Released')}>
                            <CheckCircle size={18} />
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

      {/* Details Side Panel / Modal */}
      {selectedPayout && (
        <div className="payout-modal-overlay" onClick={() => setSelectedPayout(null)}>
          <div className="payout-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payout Details</h2>
              <button className="close-modal-btn" onClick={() => setSelectedPayout(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="payout-overview">
                <div>
                  <h3>{selectedPayout.sellerName}</h3>
                  <p className="payout-id-large">Transaction ID: {selectedPayout.id}</p>
                </div>
                <div className="payout-amount-box">
                  <span className={`status-badge ${selectedPayout.status.toLowerCase().replace(' ', '-')}`}>
                    {selectedPayout.status}
                  </span>
                  <h2>{formatCurrency(selectedPayout.finalPayable)}</h2>
                </div>
              </div>

              <div className="details-grid">
                {/* Bank Details */}
                <div className="detail-section full-width">
                  <h3><Landmark size={18} /> Bank Details</h3>
                  <div className="bank-info-box">
                    <div className="bank-row">
                      <span>Bank Name</span>
                      <strong>{selectedPayout.bankDetails.bankName}</strong>
                    </div>
                    <div className="bank-row">
                      <span>Account Number</span>
                      <strong>{selectedPayout.bankDetails.accountNo}</strong>
                    </div>
                    <div className="bank-row">
                      <span>IFSC Code</span>
                      <strong>{selectedPayout.bankDetails.ifsc}</strong>
                    </div>
                    <div className="bank-row">
                      <span>Account Holder</span>
                      <strong>{selectedPayout.bankDetails.holder}</strong>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="detail-section full-width">
                  <h3><FileText size={18} /> Revenue Breakdown</h3>
                  <div className="breakdown-box">
                    <div className="breakdown-row">
                      <span>Total Order Amount</span>
                      <span className="amount positive"><ArrowUpRight size={14}/> {formatCurrency(selectedPayout.orderAmount)}</span>
                    </div>
                    <div className="breakdown-row">
                      <span>Platform Commission (10%)</span>
                      <span className="amount negative"><ArrowDownRight size={14}/> {formatCurrency(selectedPayout.platformCommission)}</span>
                    </div>
                    <div className="breakdown-row">
                      <span>GST on Commission (18%)</span>
                      <span className="amount negative"><ArrowDownRight size={14}/> {formatCurrency(selectedPayout.gstDeduction)}</span>
                    </div>
                    <div className="breakdown-divider"></div>
                    <div className="breakdown-row total">
                      <span>Final Payable Amount</span>
                      <span className="amount total">{formatCurrency(selectedPayout.finalPayable)}</span>
                    </div>
                  </div>
                </div>

                {/* Transaction History */}
                <div className="detail-section full-width">
                  <h3><History size={18} /> Transaction History</h3>
                  <div className="txn-history">
                    {selectedPayout.history.map((hist, idx) => (
                      <div className="txn-row" key={idx}>
                        <div className="txn-info">
                          <strong>{hist.type}</strong>
                          <span>{hist.date} • {hist.id}</span>
                        </div>
                        <div className="txn-amount">{hist.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedPayout(null)}>Close</button>
              <div className="modal-actions">
                {selectedPayout.status !== 'On Hold' && selectedPayout.status !== 'Released' && (
                  <button className="btn-danger" onClick={() => handleAction(selectedPayout.id, 'On Hold')}>
                    <PauseCircle size={18} /> Hold Payment
                  </button>
                )}
                {selectedPayout.status !== 'Released' && (
                  <button className="btn-success" onClick={() => handleAction(selectedPayout.id, 'Released')}>
                    <CheckCircle size={18} /> Release Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
