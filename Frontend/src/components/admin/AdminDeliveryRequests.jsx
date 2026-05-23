import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, Download, X, History, UserPlus, Clock } from 'lucide-react';
import './AdminDeliveryRequests.css';

const MOCK_REQUESTS = [
  {
    id: 'DREQ-201',
    name: 'Sanjeev Kumar',
    phone: '+91 9876543220',
    email: 'sanjeev.k@example.com',
    vehicleType: 'Two Wheeler (Bike)',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    licenseStatus: 'Pending',
    idStatus: 'Verified',
    requestDate: '22 May 2024',
    overallStatus: 'Pending',
    docs: {
      aadhaar: 'AADHAAR_SANJEEV.pdf',
      license: 'DL_SANJEEV.pdf',
      rc: 'RC_MH12.pdf',
      selfie: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop'
    }
  },
  {
    id: 'DREQ-202',
    name: 'Manish Verma',
    phone: '+91 9876543221',
    email: 'manish.v@example.com',
    vehicleType: 'Electric Scooter',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    licenseStatus: 'Verified',
    idStatus: 'Verified',
    requestDate: '21 May 2024',
    overallStatus: 'Pending',
    docs: {
      aadhaar: 'AADHAAR_MANISH.pdf',
      license: 'DL_MANISH.pdf',
      rc: 'RC_DL01.pdf',
      selfie: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop'
    }
  },
  {
    id: 'DREQ-203',
    name: 'Rohan Das',
    phone: '+91 9876543222',
    email: 'rohan.d@example.com',
    vehicleType: 'Bicycle',
    image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop',
    licenseStatus: 'N/A',
    idStatus: 'Rejected',
    requestDate: '20 May 2024',
    overallStatus: 'Rejected',
    docs: {
      aadhaar: 'AADHAAR_ROHAN.pdf',
      license: null,
      rc: null,
      selfie: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop'
    }
  }
];

const RECENT_ACTIVITY = [
  { id: 1, type: 'new', text: 'New rider applied: Sanjeev Kumar', time: '10 mins ago', icon: <UserPlus size={16} /> },
  { id: 2, type: 'approved', text: 'Rider approved: Amit Sharma', time: '1 hour ago', icon: <CheckCircle size={16} /> },
  { id: 3, type: 'rejected', text: 'Request rejected: Rohan Das (Invalid ID)', time: '3 hours ago', icon: <XCircle size={16} /> },
  { id: 4, type: 'new', text: 'New rider applied: Manish Verma', time: 'Yesterday', icon: <UserPlus size={16} /> }
];

export default function AdminDeliveryRequests() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterVehicle, setFilterVehicle] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAction = (id, newStatus) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, overallStatus: newStatus } : req
    ));
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest(null);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || req.overallStatus === filterStatus;
    const matchesVehicle = filterVehicle === 'All' || req.vehicleType.includes(filterVehicle);
    return matchesSearch && matchesStatus && matchesVehicle;
  });

  return (
    <div className="admin-delivery-requests">
      <div className="page-header">
        <div className="header-title">
          <h2>Delivery Partner Requests</h2>
          <p>Review and verify new rider onboarding applications</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="filter-dropdown">
            <Filter size={18} />
            <select value={filterVehicle} onChange={(e) => setFilterVehicle(e.target.value)}>
              <option value="All">All Vehicles</option>
              <option value="Bike">Two Wheeler</option>
              <option value="Electric">Electric Scooter</option>
              <option value="Bicycle">Bicycle</option>
            </select>
          </div>
        </div>
      </div>

      <div className="main-layout">
        <div className="table-section">
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
                      <th>Rider Info</th>
                      <th>Vehicle Details</th>
                      <th>License Status</th>
                      <th>ID Status</th>
                      <th>Applied Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((req) => (
                      <tr key={req.id}>
                        <td>
                          <div className="rider-cell">
                            <img src={req.image} alt={req.name} className="rider-avatar-img" />
                            <div>
                              <p className="rider-name-txt">{req.name}</p>
                              <p className="contact-txt">{req.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="vehicle-type-badge">{req.vehicleType}</span>
                        </td>
                        <td>
                          <span className={`status-badge sm ${req.licenseStatus.toLowerCase()}`}>
                            {req.licenseStatus}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge sm ${req.idStatus.toLowerCase()}`}>
                            {req.idStatus}
                          </span>
                        </td>
                        <td><span className="date-txt"><Clock size={14} className="inline-icon" /> {req.requestDate}</span></td>
                        <td>
                          <div className="action-buttons">
                            <button className="btn-icon view" title="View Documents" onClick={() => setSelectedRequest(req)}>
                              <Eye size={18} />
                            </button>
                            {req.overallStatus !== 'Verified' && (
                              <button className="btn-icon approve" title="Approve Request" onClick={() => handleAction(req.id, 'Verified')}>
                                <CheckCircle size={18} />
                              </button>
                            )}
                            {req.overallStatus !== 'Rejected' && (
                              <button className="btn-icon reject" title="Reject Request" onClick={() => handleAction(req.id, 'Rejected')}>
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
        </div>

        <div className="activity-section">
          <div className="activity-card">
            <div className="card-header">
              <h3><History size={18} /> Recent Activity</h3>
            </div>
            <div className="activity-list">
              {RECENT_ACTIVITY.map(act => (
                <div className="activity-item" key={act.id}>
                  <div className={`act-icon ${act.type}`}>
                    {act.icon}
                  </div>
                  <div className="act-content">
                    <p>{act.text}</p>
                    <span>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedRequest && (
        <div className="request-modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="request-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Review Rider Documents</h2>
              <button className="close-modal-btn" onClick={() => setSelectedRequest(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="applicant-overview">
                <div className="applicant-hero">
                  <img src={selectedRequest.docs.selfie} alt="Selfie" className="applicant-selfie" />
                  <div className="applicant-info">
                    <h3>{selectedRequest.name}</h3>
                    <p>{selectedRequest.phone} | {selectedRequest.email}</p>
                    <p className="applicant-detail">Vehicle: <strong>{selectedRequest.vehicleType}</strong></p>
                  </div>
                </div>
                <div className="applicant-badges">
                  <span className={`status-badge large ${selectedRequest.overallStatus.toLowerCase()}`}>
                    Status: {selectedRequest.overallStatus}
                  </span>
                </div>
              </div>

              <div className="documents-grid">
                <div className="document-box">
                  <div className="doc-header">
                    <h4>Aadhaar / PAN Card</h4>
                    {selectedRequest.docs.aadhaar && <button className="download-btn"><Download size={14} /></button>}
                  </div>
                  <div className="doc-preview file-preview">
                    {selectedRequest.docs.aadhaar ? (
                      <div className="file-info">
                        <FileText size={32} className="text-blue" />
                        <span>{selectedRequest.docs.aadhaar}</span>
                      </div>
                    ) : (
                      <div className="no-doc">Missing Document</div>
                    )}
                  </div>
                </div>

                <div className="document-box">
                  <div className="doc-header">
                    <h4>Driving License</h4>
                    {selectedRequest.docs.license && <button className="download-btn"><Download size={14} /></button>}
                  </div>
                  <div className="doc-preview file-preview">
                    {selectedRequest.docs.license ? (
                      <div className="file-info">
                        <FileText size={32} className="text-blue" />
                        <span>{selectedRequest.docs.license}</span>
                      </div>
                    ) : (
                      <div className="no-doc">Not Required / Missing</div>
                    )}
                  </div>
                </div>

                <div className="document-box">
                  <div className="doc-header">
                    <h4>Vehicle RC</h4>
                    {selectedRequest.docs.rc && <button className="download-btn"><Download size={14} /></button>}
                  </div>
                  <div className="doc-preview file-preview">
                    {selectedRequest.docs.rc ? (
                      <div className="file-info">
                        <FileText size={32} className="text-blue" />
                        <span>{selectedRequest.docs.rc}</span>
                      </div>
                    ) : (
                      <div className="no-doc">Not Required / Missing</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedRequest(null)}>Close</button>
              <div className="modal-actions">
                <button className="btn-danger" onClick={() => handleAction(selectedRequest.id, 'Rejected')}>
                  <XCircle size={18} /> Reject
                </button>
                <button className="btn-success" onClick={() => handleAction(selectedRequest.id, 'Verified')}>
                  <CheckCircle size={18} /> Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
