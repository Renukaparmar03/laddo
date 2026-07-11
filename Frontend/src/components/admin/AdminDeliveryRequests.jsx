import React, { useState } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, Download, X, History, UserPlus, Clock } from 'lucide-react';
import './AdminDeliveryRequests.css';

// Removed MOCK_REQUESTS and RECENT_ACTIVITY arrays as they are no longer needed

export default function AdminDeliveryRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterVehicle, setFilterVehicle] = useState('All');
  const [selectedRequest, setSelectedRequest] = useState(null);

  React.useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/delivery');
      const data = await res.json();
      
      const formatted = data
        .filter(req => req.status === 'pending')
        .map(req => ({
        id: req._id,
        name: req.name,
        phone: req.phone,
        email: 'N/A',
        vehicleType: req.vehicle,
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
        licenseStatus: req.licenseNo ? 'Uploaded' : 'N/A',
        idStatus: 'Uploaded',
        requestDate: new Date(req.createdAt).toLocaleDateString(),
        overallStatus: req.status === 'pending' ? 'Pending' : (req.status === 'approved' ? 'Verified' : 'Rejected'),
        docs: {
          aadhaar: req.aadharNo,
          license: req.licenseNo,
          rc: null,
          selfie: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop'
        }
      }));
      setRequests(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (id, newStatus) => {
    const backendStatus = newStatus === 'Verified' ? 'approved' : 'rejected';
    try {
      const res = await fetch(`http://localhost:5000/api/delivery/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: backendStatus })
      });
      if (res.ok) {
        setRequests(requests.map(req => 
          req.id === id ? { ...req, overallStatus: newStatus } : req
        ));
        if (selectedRequest && selectedRequest.id === id) {
          setSelectedRequest(null);
        }
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
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
