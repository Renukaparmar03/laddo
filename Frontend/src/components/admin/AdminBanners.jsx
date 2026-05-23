import React, { useState } from 'react';
import { Search, Plus, Image as ImageIcon, Trash2, Edit, Check, X, Eye } from 'lucide-react';
import './AdminBanners.css';

const MOCK_BANNERS = [
  {
    id: 'BAN-001',
    title: 'Summer Sale Deals',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=300&fit=crop',
    location: 'Home Page Top',
    startDate: '10 May, 2026',
    endDate: '20 May, 2026',
    status: 'Active'
  },
  {
    id: 'BAN-002',
    title: 'Electronics Festival',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=300&fit=crop',
    location: 'Category Page',
    startDate: '15 May, 2026',
    endDate: '25 May, 2026',
    status: 'Active'
  },
  {
    id: 'BAN-003',
    title: 'Grocery Weekend',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=300&fit=crop',
    location: 'Home Page Middle',
    startDate: '01 May, 2026',
    endDate: '05 May, 2026',
    status: 'Inactive'
  }
];

export default function AdminBanners() {
  const [banners, setBanners] = useState(MOCK_BANNERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const filteredBanners = banners.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id) => {
    setBanners(banners.map(b => 
      b.id === id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b
    ));
  };

  const deleteBanner = (id) => {
    setBanners(banners.filter(b => b.id !== id));
  };

  return (
    <div className="admin-banners-page">
      <div className="page-header">
        <div className="header-title">
          <h2>Banner Management</h2>
          <p>Manage promotional banners across the app</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search banners..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Add New Banner
          </button>
        </div>
      </div>

      <div className="banners-card">
        <div className="table-responsive">
          {filteredBanners.length === 0 ? (
            <div className="empty-state">
              <ImageIcon size={48} className="empty-icon" />
              <h3>No Banners Found</h3>
              <p>There are no banners matching your search.</p>
            </div>
          ) : (
            <table className="banners-table">
              <thead>
                <tr>
                  <th>Banner Preview</th>
                  <th>Details</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBanners.map((banner) => (
                  <tr key={banner.id}>
                    <td>
                      <div className="banner-img-preview" onClick={() => setPreviewImage(banner.image)}>
                        <img src={banner.image} alt={banner.title} />
                        <div className="preview-overlay">
                          <Eye size={16} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="banner-info">
                        <h4>{banner.title}</h4>
                        <p>ID: {banner.id}</p>
                        <span className="location-tag">{banner.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="duration-info">
                        <p><strong>Start:</strong> {banner.startDate}</p>
                        <p><strong>End:</strong> {banner.endDate}</p>
                      </div>
                    </td>
                    <td>
                      <button 
                        className={`status-toggle ${banner.status.toLowerCase()}`}
                        onClick={() => toggleStatus(banner.id)}
                      >
                        <span className="toggle-circle"></span>
                        {banner.status}
                      </button>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon edit" title="Edit Banner">
                          <Edit size={18} />
                        </button>
                        <button className="btn-icon delete" title="Delete Banner" onClick={() => deleteBanner(banner.id)}>
                          <Trash2 size={18} />
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

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="modal-overlay" onClick={() => setPreviewImage(null)}>
          <div className="image-preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-preview" onClick={() => setPreviewImage(null)}>
              <X size={24} />
            </button>
            <img src={previewImage} alt="Banner Full Preview" className="full-preview-img" />
          </div>
        </div>
      )}

      {/* Add Banner Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="add-banner-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Banner</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="upload-box">
                <ImageIcon size={40} className="upload-icon" />
                <h4>Click or drag image to upload</h4>
                <p>Recommended size: 1200x400px (Max 2MB)</p>
                <button className="upload-btn">Browse Files</button>
              </div>

              <div className="form-group">
                <label>Banner Title</label>
                <input type="text" placeholder="e.g. Summer Sale 50% Off" className="form-input" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Display Location</label>
                  <select className="form-input">
                    <option>Home Page Top</option>
                    <option>Home Page Middle</option>
                    <option>Category Page</option>
                    <option>Checkout Page</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Target URL / Link</label>
                  <input type="text" placeholder="https://..." className="form-input" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" className="form-input" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setIsModalOpen(false)}>Save Banner</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
