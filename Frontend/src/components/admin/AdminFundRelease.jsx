import React, { useState } from 'react';
import { Search, Filter, CheckCircle, PauseCircle, Eye, IndianRupee, Landmark, FileText, X, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';
import './AdminFundRelease.css';

export default function AdminFundRelease() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedPayout, setSelectedPayout] = useState(null);

  React.useEffect(() => {
    fetchPayoutData();
  }, []);

  const fetchPayoutData = async () => {
    try {
      setLoading(true);
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

      const uniqueOrdersMap = new Map();
      allOrders.forEach(o => uniqueOrdersMap.set(o._id, o));
      const uniqueOrders = Array.from(uniqueOrdersMap.values());

      const sellerPayouts = {};

      uniqueOrders.forEach(order => {
        if (order.isPaid || order.status === 'Delivered') {
           order.orderItems.forEach(item => {
              const sId = item.seller?._id || item.seller;
              if (!sellerPayouts[sId]) {
                 sellerPayouts[sId] = {
                   id: `PAY-${sId.substring(0,8).toUpperCase()}`,
                   sellerId: sId,
                   orderAmount: 0,
                   status: 'Pending',
                   bankDetails: {
                     bankName: 'Digital Wallet',
                     accountNo: 'XXXX-XXXX-' + sId.substring(sId.length-4),
                     ifsc: 'DIGI000' + sId.substring(0,4),
                     holder: ''
                   },
                   history: []
                 };
              }
              sellerPayouts[sId].orderAmount += item.price * item.qty;
           });
        }
      });

      const dynamicPayouts = Object.values(sellerPayouts).map(p => {
         const seller = sellers.find(s => s._id === p.sellerId);
         p.sellerName = seller ? (seller.businessName || seller.ownerName) : 'Unknown Seller';
         p.bankDetails.holder = p.sellerName;
         
         p.platformCommission = p.orderAmount * 0.10; // 10% commission
         p.gstDeduction = p.platformCommission * 0.18; // 18% of commission
         p.finalPayable = p.orderAmount - p.platformCommission - p.gstDeduction;
         
         p.history = [
           { id: `TXN-${p.id}-A`, date: new Date().toLocaleDateString('en-GB'), amount: `₹${p.orderAmount.toLocaleString()}`, type: 'Sales Accrued' },
           { id: `TXN-${p.id}-C`, date: new Date().toLocaleDateString('en-GB'), amount: `₹${p.platformCommission.toLocaleString()}`, type: 'Commission Ded.' }
         ];

         return p;
      });

      // Filter only those who have actually sold something
      setPayouts(dynamicPayouts.filter(p => p.orderAmount > 0));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <div className="admin-fund-release"><div style={{padding: '50px', textAlign: 'center'}}>Calculating live seller payouts...</div></div>;
  }

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
