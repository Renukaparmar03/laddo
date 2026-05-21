import React, { useState } from 'react';
import { 
  Search, Filter, Eye, CheckCircle, XCircle, UserX, AlertTriangle, 
  MessageSquare, ShieldAlert, AlertOctagon, X, MessageCircle, Clock,
  FileText, Image as ImageIcon
} from 'lucide-react';
import './AdminReports.css';

const MOCK_REPORTS = [
  { id: 'REP-1024', user: 'Rahul Sharma', userImg: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&q=80', title: 'Received defective item', category: 'Fake Product', date: '22 May, 2026', priority: 'High', status: 'Pending', desc: 'I ordered a smartphone but the screen was already cracked when I opened the box. I have attached the images.', orderId: 'ORD-2023-001', product: 'Wireless Earbuds' },
  { id: 'REP-1025', user: 'Priya Patel', userImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&q=80', title: 'Payment deducted but order failed', category: 'Payment Issue', date: '21 May, 2026', priority: 'Critical', status: 'In Review', desc: 'Amount of ₹2,499 was deducted from my account but the order page showed an error. Please refund.', orderId: 'N/A', product: 'N/A' },
  { id: 'REP-1026', user: 'Amit Kumar', userImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&q=80', title: 'Seller abusing in chat', category: 'Seller Complaint', date: '20 May, 2026', priority: 'High', status: 'Resolved', desc: 'The seller used abusive language when I asked for a return request.', orderId: 'ORD-2023-003', product: 'Organic Green Tea' },
  { id: 'REP-1027', user: 'Neha Gupta', userImg: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&q=80', title: 'Delivery boy was rude', category: 'Delivery Issue', date: '19 May, 2026', priority: 'Medium', status: 'Rejected', desc: 'The delivery guy called 10 times and was very rude when I asked him to wait for 2 mins.', orderId: 'ORD-2023-004', product: 'Wooden Coffee Table' },
  { id: 'REP-1028', user: 'Vikram Singh', userImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&q=80', title: 'Cannot login to my account', category: 'Account Problem', date: '18 May, 2026', priority: 'Low', status: 'Resolved', desc: 'I am trying to login but it says my account is temporarily suspended.', orderId: 'N/A', product: 'N/A' },
];

const MOCK_ACTIVITIES = [
  { id: 1, text: 'New complaint submitted by Rohan', time: '10 mins ago', type: 'new' },
  { id: 2, text: 'Report #REP-1026 resolved', time: '1 hour ago', type: 'resolve' },
  { id: 3, text: 'User "Toxic_Buyer" blocked', time: '3 hours ago', type: 'block' },
  { id: 4, text: 'Seller "RR Mart" warned for delay', time: '5 hours ago', type: 'warn' },
];

export default function AdminReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [reports, setReports] = useState(MOCK_REPORTS);
  
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Critical': return 'badge-critical';
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Resolved': return 'status-resolved';
      case 'In Review': return 'status-review';
      case 'Pending': return 'status-pending';
      case 'Rejected': return 'status-rejected';
      default: return '';
    }
  };

  const stats = {
    total: reports.length,
    pending: reports.filter(r => r.status === 'Pending').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
    blocked: 12 // Mock
  };

  return (
    <div className="admin-reports-page">
      {/* Header Section */}
      <div className="reports-header">
        <div className="header-title">
          <h1>Reports & Complaints</h1>
          <p>Manage user issues, disputes, and moderation</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="icon" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={18} className="icon" />
            <select value={statusFilter} onChange={handleStatusFilter}>
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="reports-summary-grid">
        <div className="report-stat-card">
          <div className="stat-icon-wrapper bg-blue-light">
            <FileText size={24} className="text-blue" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Reports</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>
        
        <div className="report-stat-card">
          <div className="stat-icon-wrapper bg-orange-light">
            <AlertTriangle size={24} className="text-orange" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Reports</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="stat-icon-wrapper bg-green-light">
            <CheckCircle size={24} className="text-green" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Resolved</p>
            <h3 className="stat-value">{stats.resolved}</h3>
          </div>
        </div>

        <div className="report-stat-card">
          <div className="stat-icon-wrapper bg-red-light">
            <UserX size={24} className="text-red" />
          </div>
          <div className="stat-info">
            <p className="stat-label">Blocked Users</p>
            <h3 className="stat-value">{stats.blocked}</h3>
          </div>
        </div>
      </div>

      {/* Middle Grid: Categories & Activity */}
      <div className="reports-middle-grid">
        <div className="categories-card card">
          <div className="card-header">
            <h3>Report Categories</h3>
          </div>
          <div className="category-list">
            <div className="cat-item">
              <span className="cat-name">Payment Issue</span>
              <span className="cat-count">24%</span>
            </div>
            <div className="cat-item">
              <span className="cat-name">Fake Product</span>
              <span className="cat-count">35%</span>
            </div>
            <div className="cat-item">
              <span className="cat-name">Delivery Issue</span>
              <span className="cat-count">18%</span>
            </div>
            <div className="cat-item">
              <span className="cat-name">Seller Complaint</span>
              <span className="cat-count">12%</span>
            </div>
            <div className="cat-item">
              <span className="cat-name">Account Problem</span>
              <span className="cat-count">11%</span>
            </div>
          </div>
        </div>

        <div className="activity-card card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-timeline">
            {MOCK_ACTIVITIES.map((act) => (
              <div className="activity-item" key={act.id}>
                <div className={`activity-icon ${act.type}`}>
                  {act.type === 'new' && <MessageSquare size={14} />}
                  {act.type === 'resolve' && <CheckCircle size={14} />}
                  {act.type === 'block' && <UserX size={14} />}
                  {act.type === 'warn' && <AlertTriangle size={14} />}
                </div>
                <div className="activity-details">
                  <p>{act.text}</p>
                  <span>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="reports-card card">
        <div className="table-responsive">
          {filteredReports.length === 0 ? (
            <div className="empty-state">
              <ShieldAlert size={48} className="empty-icon" />
              <h3>No Reports Found</h3>
              <p>Great! No pending issues matching your criteria.</p>
            </div>
          ) : (
            <table className="reports-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>User</th>
                  <th>Complaint</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td className="font-bold">{report.id}</td>
                    <td>
                      <div className="user-cell">
                        <img src={report.userImg} alt={report.user} />
                        <div>
                          <p className="user-name">{report.user}</p>
                          <p className="report-date">{report.date}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="complaint-title">{report.title}</p>
                    </td>
                    <td><span className="cat-tag">{report.category}</span></td>
                    <td>
                      <span className={`priority-badge ${getPriorityClass(report.priority)}`}>
                        {report.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Details" onClick={() => openModal(report)}>
                          <Eye size={18} />
                        </button>
                        <button className="btn-icon resolve" title="Resolve">
                          <CheckCircle size={18} />
                        </button>
                        <button className="btn-icon reject" title="Reject">
                          <XCircle size={18} />
                        </button>
                        <button className="btn-icon block" title="Block User">
                          <UserX size={18} />
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

      {/* Report Details Modal */}
      {isModalOpen && selectedReport && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Report Details</h2>
              <button className="close-btn" onClick={closeModal}><X size={24} /></button>
            </div>
            
            <div className="modal-body bg-gray-light">
              <div className="report-modal-top">
                <div>
                  <h3 className="modal-report-id">{selectedReport.id}</h3>
                  <p className="modal-report-date">Filed on {selectedReport.date}</p>
                </div>
                <div className="modal-status-badges">
                  <span className={`priority-badge large ${getPriorityClass(selectedReport.priority)}`}>
                    Priority: {selectedReport.priority}
                  </span>
                  <span className={`status-badge large ${getStatusClass(selectedReport.status)}`}>
                    Status: {selectedReport.status}
                  </span>
                </div>
              </div>

              <div className="report-details-grid">
                <div className="details-card">
                  <h4><MessageCircle size={18} className="text-blue" /> User Info</h4>
                  <div className="details-card-content user-modal-info">
                    <img src={selectedReport.userImg} alt="User" />
                    <div>
                      <p><strong>{selectedReport.user}</strong></p>
                      <p>Customer since 2024</p>
                    </div>
                  </div>
                </div>
                <div className="details-card">
                  <h4><FileText size={18} className="text-purple" /> Order / Product</h4>
                  <div className="details-card-content">
                    <p><strong>Order ID:</strong> {selectedReport.orderId}</p>
                    <p><strong>Product:</strong> {selectedReport.product}</p>
                  </div>
                </div>
                <div className="details-card">
                  <h4><AlertOctagon size={18} className="text-orange" /> Category</h4>
                  <div className="details-card-content">
                    <p><strong>{selectedReport.category}</strong></p>
                  </div>
                </div>
              </div>

              <div className="complaint-section">
                <h4>Complaint Details</h4>
                <div className="complaint-box">
                  <h5>{selectedReport.title}</h5>
                  <p>{selectedReport.desc}</p>
                </div>
              </div>

              <div className="attachments-section">
                <h4><ImageIcon size={18} className="text-gray" /> Attachments</h4>
                <div className="attachments-grid">
                  <div className="attachment-box">Screenshot_1.jpg</div>
                  <div className="attachment-box">Screenshot_2.jpg</div>
                </div>
              </div>

              <div className="report-timeline-section">
                <h4>Resolution Timeline</h4>
                <div className="timeline-vertical">
                  <div className="timeline-item completed">
                    <div className="dot"></div>
                    <div className="timeline-content">
                      <p>Report Filed</p>
                      <span>{selectedReport.date}</span>
                    </div>
                  </div>
                  <div className={`timeline-item ${['In Review', 'Resolved', 'Rejected'].includes(selectedReport.status) ? 'completed' : ''}`}>
                    <div className="dot"></div>
                    <div className="timeline-content">
                      <p>In Review by Admin</p>
                      <span>Admin assigned to case</span>
                    </div>
                  </div>
                  <div className={`timeline-item ${selectedReport.status === 'Resolved' || selectedReport.status === 'Rejected' ? 'completed' : ''}`}>
                    <div className="dot"></div>
                    <div className="timeline-content">
                      <p>Case Closed</p>
                      <span>{selectedReport.status === 'Resolved' ? 'Resolved successfully' : (selectedReport.status === 'Rejected' ? 'Rejected by admin' : 'Pending resolution')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-outline-danger">
                  <UserX size={18} /> Block User
                </button>
                <div className="right-actions">
                  <button className="btn-outline-danger">
                    <XCircle size={18} /> Reject
                  </button>
                  <button className="btn-success">
                    <CheckCircle size={18} /> Resolve Issue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
