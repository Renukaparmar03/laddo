import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, Download, X, Calendar, MapPin, Store } from 'lucide-react';
import './AdminSellerRequests.css';

export default function AdminSellerRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

  React.useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/sellers?status=pending');
      const data = await res.json();
      const formatted = data.map(seller => ({
        id: seller._id,
        sellerName: seller.ownerName,
        shopName: seller.businessName,
        email: seller.email,
        appliedDate: new Date(seller.createdAt).toLocaleDateString(),
        docsStatus: 'Uploaded', // placeholder
        gstStatus: 'Unverified', // placeholder
        docs: {
          shopPhoto: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&q=80',
          gstCert: 'GST_CERT.pdf',
          panCard: 'PAN.pdf',
        },
        address: seller.address,
        category: 'General'
      }));
      setRequests(formatted);
    } catch(err) {
      console.error(err);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const res = await fetch(`http://localhost:5000/api/sellers/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setRequests(requests.filter(req => req.id !== id));
        if (selectedRequest && selectedRequest.id === id) {
          setSelectedRequest(null);
        }
      }
    } catch(err) {
      console.error(err);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.sellerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || req.docsStatus.includes(filterStatus) || filterStatus === 'Pending';
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-seller-requests">
      <div className="page-header">
        <div className="header-title">
          <h2>Seller Requests</h2>
          <p>Review and approve new seller onboarding applications</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Uploaded">Uploaded</option>
              <option value="Incomplete">Incomplete</option>
            </select>
          </div>
        </div>
      </div>

      <div className="requests-card">
        <div className="table-responsive">
          {filteredRequests.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} className="empty-icon" />
              <h3>No Requests Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Seller Info</th>
                  <th>Contact Info</th>
                  <th>Applied Date</th>
                  <th>Docs Status</th>
                  <th>GST Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <div className="seller-cell">
                        <div className="avatar bg-blue-light">{req.sellerName.charAt(0)}</div>
                        <div>
                          <p className="shop-name">{req.shopName}</p>
                          <p className="seller-name">{req.sellerName}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-cell">
                        <p className="email-text">{req.email}</p>
                        <p className="id-text">{req.id}</p>
                      </div>
                    </td>
                    <td><span className="date-badge"><Calendar size={14} /> {req.appliedDate}</span></td>
                    <td>
                      <span className={`status-badge docs ${req.docsStatus.toLowerCase().replace(' ', '-')}`}>
                        {req.docsStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge gst ${req.gstStatus.toLowerCase()}`}>
                        {req.gstStatus}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Documents" onClick={() => setSelectedRequest(req)}>
                          <Eye size={18} />
                        </button>
                        <button className="btn-icon approve" title="Approve Request" onClick={() => handleAction(req.id, 'approved')}>
                          <CheckCircle size={18} />
                        </button>
                        <button className="btn-icon reject" title="Reject Request" onClick={() => handleAction(req.id, 'rejected')}>
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedRequest && (
        <div className="request-modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="request-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review Seller Application</h2>
              <button className="close-modal-btn" onClick={() => setSelectedRequest(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="applicant-overview">
                <div className="applicant-info">
                  <h3>{selectedRequest.shopName}</h3>
                  <p className="applicant-name">Applicant: {selectedRequest.sellerName}</p>
                  <p className="applicant-detail"><MapPin size={14} /> {selectedRequest.address}</p>
                  <p className="applicant-detail"><Store size={14} /> Category: {selectedRequest.category}</p>
                </div>
                <div className="applicant-badges">
                  <span className={`status-badge docs ${selectedRequest.docsStatus.toLowerCase().replace(' ', '-')}`}>
                    Docs: {selectedRequest.docsStatus}
                  </span>
                  <span className={`status-badge gst ${selectedRequest.gstStatus.toLowerCase()}`}>
                    GST: {selectedRequest.gstStatus}
                  </span>
                </div>
              </div>

              <div className="documents-grid">
                <div className="document-box">
                  <div className="doc-header">
                    <h4>Shop Photo</h4>
                  </div>
                  <div className="doc-preview image-preview">
                    {selectedRequest.docs.shopPhoto ? (
                      <img src={selectedRequest.docs.shopPhoto} alt="Shop Front" />
                    ) : (
                      <div className="no-doc">No Photo Provided</div>
                    )}
                  </div>
                </div>

                <div className="document-box">
                  <div className="doc-header">
                    <h4>GST Certificate</h4>
                    {selectedRequest.docs.gstCert && <button className="download-btn"><Download size={14} /></button>}
                  </div>
                  <div className="doc-preview file-preview">
                    {selectedRequest.docs.gstCert ? (
                      <div className="file-info">
                        <FileText size={32} className="text-blue" />
                        <span>{selectedRequest.docs.gstCert}</span>
                      </div>
                    ) : (
                      <div className="no-doc">Missing Document</div>
                    )}
                  </div>
                </div>

                <div className="document-box">
                  <div className="doc-header">
                    <h4>PAN Card</h4>
                    {selectedRequest.docs.panCard && <button className="download-btn"><Download size={14} /></button>}
                  </div>
                  <div className="doc-preview file-preview">
                    {selectedRequest.docs.panCard ? (
                      <div className="file-info">
                        <FileText size={32} className="text-blue" />
                        <span>{selectedRequest.docs.panCard}</span>
                      </div>
                    ) : (
                      <div className="no-doc">Missing Document</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedRequest(null)}>Close</button>
              <div className="modal-actions">
                <button className="btn-danger" onClick={() => handleAction(selectedRequest.id, 'rejected')}><XCircle size={18} /> Reject</button>
                <button className="btn-success" onClick={() => handleAction(selectedRequest.id, 'approved')}><CheckCircle size={18} /> Approve</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
