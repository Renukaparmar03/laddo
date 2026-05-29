import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Download, FileText, MapPin, Percent, History, Eye, X } from 'lucide-react';
import './AdminGSTVerification.css';

export default function AdminGSTVerification() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState(null);

  React.useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/sellers');
      const data = await res.json();
      
      const mappedRecords = data.map(seller => ({
        id: seller._id,
        sellerName: seller.businessName || seller.ownerName,
        gstNumber: `GST-${seller._id.substring(0,8).toUpperCase()}`,
        businessType: 'Retailer',
        status: seller.status === 'approved' ? 'Verified' : (seller.status === 'rejected' ? 'Rejected' : 'Pending'),
        certificate: `GST_DOC_${seller._id.substring(0,6)}.pdf`,
        address: seller.address || 'Address not provided',
        taxPercentage: '18%',
        history: [
          { date: new Date(seller.createdAt).toLocaleString('en-GB'), action: 'Registration Submitted', by: 'Seller' }
        ]
      }));

      // Sort by newest registered
      mappedRecords.sort((a,b) => new Date(b.history[0].date) - new Date(a.history[0].date));

      setRecords(mappedRecords);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, newStatus) => {
    try {
      const dbStatus = newStatus === 'Verified' ? 'approved' : 'rejected';
      
      const response = await fetch(`http://localhost:5000/api/sellers/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: dbStatus })
      });

      if (response.ok) {
        setRecords(records.map(req => 
          req.id === id ? { ...req, status: newStatus } : req
        ));
        if (selectedRecord && selectedRecord.id === id) {
          setSelectedRecord({ ...selectedRecord, status: newStatus });
        }
      } else {
        alert('Failed to update seller status in the backend.');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Error communicating with the server.');
    }
  };

  const filteredRecords = records.filter(req => {
    const matchesSearch = req.sellerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.gstNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="admin-gst-verification"><div style={{padding: '50px', textAlign: 'center'}}>Loading real-time seller verification records...</div></div>;
  }

  return (
    <div className="admin-gst-verification">
      <div className="page-header">
        <div className="header-title">
          <h2>GST Verification</h2>
          <p>Review and verify GST certificates for sellers</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by seller name or GST..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      <div className="gst-card">
        <div className="table-responsive">
          {filteredRecords.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} className="empty-icon" />
              <h3>No Records Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <table className="gst-table">
              <thead>
                <tr>
                  <th>Seller Name</th>
                  <th>GST Number</th>
                  <th>Business Type</th>
                  <th>Status</th>
                  <th>Certificate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <p className="seller-name-txt">{req.sellerName}</p>
                    </td>
                    <td>
                      <p className="gst-num-txt">{req.gstNumber}</p>
                    </td>
                    <td><span className="business-type">{req.businessType}</span></td>
                    <td>
                      <span className={`status-badge ${req.status.toLowerCase()}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <div className="certificate-cell">
                        <FileText size={16} className="text-blue" />
                        <span>{req.certificate}</span>
                        <button className="btn-icon sm" title="Download">
                          <Download size={14} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Details" onClick={() => setSelectedRecord(req)}>
                          <Eye size={18} />
                        </button>
                        {req.status !== 'Verified' && (
                          <button className="btn-icon approve" title="Verify GST" onClick={() => handleAction(req.id, 'Verified')}>
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {req.status !== 'Rejected' && (
                          <button className="btn-icon reject" title="Reject GST" onClick={() => handleAction(req.id, 'Rejected')}>
                            <XCircle size={18} />
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

      {/* Detail Side Panel / Modal */}
      {selectedRecord && (
        <div className="gst-modal-overlay" onClick={() => setSelectedRecord(null)}>
          <div className="gst-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>GST Details</h2>
              <button className="close-modal-btn" onClick={() => setSelectedRecord(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="gst-overview">
                <h3>{selectedRecord.sellerName}</h3>
                <span className={`status-badge large ${selectedRecord.status.toLowerCase()}`}>
                  {selectedRecord.status}
                </span>
              </div>

              <div className="details-grid">
                <div className="detail-box">
                  <div className="box-icon bg-blue"><FileText size={20} /></div>
                  <div className="box-content">
                    <label>GST Number</label>
                    <p>{selectedRecord.gstNumber}</p>
                  </div>
                </div>

                <div className="detail-box">
                  <div className="box-icon bg-purple"><Percent size={20} /></div>
                  <div className="box-content">
                    <label>Tax Percentage</label>
                    <p>{selectedRecord.taxPercentage}</p>
                  </div>
                </div>

                <div className="detail-box full-width">
                  <div className="box-icon bg-orange"><MapPin size={20} /></div>
                  <div className="box-content">
                    <label>Business Address</label>
                    <p>{selectedRecord.address}</p>
                  </div>
                </div>
              </div>

              <div className="history-section">
                <h3 className="section-title"><History size={18} /> Verification History</h3>
                <div className="timeline">
                  {selectedRecord.history.map((hist, index) => (
                    <div className="timeline-item" key={index}>
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4>{hist.action}</h4>
                        <p>By: {hist.by} • {hist.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedRecord(null)}>Close</button>
              <div className="modal-actions">
                {selectedRecord.status !== 'Rejected' && (
                  <button className="btn-danger" onClick={() => handleAction(selectedRecord.id, 'Rejected')}>
                    <XCircle size={18} /> Reject
                  </button>
                )}
                {selectedRecord.status !== 'Verified' && (
                  <button className="btn-success" onClick={() => handleAction(selectedRecord.id, 'Verified')}>
                    <CheckCircle size={18} /> Verify
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
