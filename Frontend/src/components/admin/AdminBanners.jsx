import React, { useState, useEffect } from 'react';
import { Search, Plus, Image as ImageIcon, Trash2, Edit, Check, X, Eye, Loader2 } from 'lucide-react';
import axios from 'axios';
import './AdminBanners.css';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingBannerId, setEditingBannerId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    image: '', // Legacy primary image
    images: [''], // Array for multiple images
    location: 'Home Page Top',
    link: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/banners');
      setBanners(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      setLoading(false);
    }
  };

  const filteredBanners = banners.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      await axios.put(`http://localhost:5000/api/banners/${id}`, { status: newStatus });
      fetchBanners();
    } catch (error) {
      console.error('Error updating banner status:', error);
    }
  };

  const deleteBanner = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        await axios.delete(`http://localhost:5000/api/banners/${id}`);
        fetchBanners();
      } catch (error) {
        console.error('Error deleting banner:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBanner = async () => {
    try {
      const filteredImages = formData.images.filter(url => url.trim() !== '');
      const payload = {
        ...formData,
        // Remove empty image urls
        images: filteredImages,
        // Set first image as legacy image if not explicitly set
        image: formData.image || (filteredImages.length > 0 ? filteredImages[0] : '')
      };
      
      if (editingBannerId) {
        await axios.put(`http://localhost:5000/api/banners/${editingBannerId}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/banners', payload);
      }
      
      closeModal();
      fetchBanners();
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Failed to save banner');
    }
  };

  const openAddModal = () => {
    setFormData({ title: '', image: '', images: [''], location: 'Home Page Top', link: '', startDate: '', endDate: '' });
    setEditingBannerId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (banner) => {
    setFormData({
      title: banner.title || '',
      image: banner.image || '',
      images: banner.images && banner.images.length > 0 ? banner.images : (banner.image ? [banner.image] : ['']),
      location: banner.location || 'Home Page Top',
      link: banner.link || '',
      startDate: banner.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : '',
      endDate: banner.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : ''
    });
    setEditingBannerId(banner._id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBannerId(null);
    setFormData({ title: '', image: '', images: [''], location: 'Home Page Top', link: '', startDate: '', endDate: '' });
  };

  const addImageUrlField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const updateImageUrl = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const removeImageUrlField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
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
          <button className="btn-primary" onClick={openAddModal}>
            <Plus size={18} /> Add New Banner
          </button>
        </div>
      </div>

      <div className="banners-card">
        <div className="table-responsive">
          {loading ? (
             <div className="empty-state">
              <Loader2 size={48} className="empty-icon animate-spin" />
              <h3>Loading...</h3>
             </div>
          ) : filteredBanners.length === 0 ? (
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
                  <tr key={banner._id}>
                    <td>
                      <div className="banner-img-preview" onClick={() => setPreviewImage(banner.images && banner.images.length > 0 ? banner.images[0] : banner.image)}>
                        <img src={banner.images && banner.images.length > 0 ? banner.images[0] : banner.image} alt={banner.title} />
                        <div className="preview-overlay">
                          <Eye size={16} />
                        </div>
                        {(banner.images && banner.images.length > 1) && (
                          <div style={{position: 'absolute', bottom: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px'}}>
                            +{banner.images.length - 1} more
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="banner-info">
                        <h4>{banner.title}</h4>
                        <p>ID: {banner._id.substring(0, 8)}...</p>
                        <span className="location-tag">{banner.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="duration-info">
                        <p><strong>Start:</strong> {banner.startDate ? new Date(banner.startDate).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>End:</strong> {banner.endDate ? new Date(banner.endDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </td>
                    <td>
                      <button 
                        className={`status-toggle ${banner.status.toLowerCase()}`}
                        onClick={() => toggleStatus(banner._id, banner.status)}
                      >
                        <span className="toggle-circle"></span>
                        {banner.status}
                      </button>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon edit" title="Edit Banner" onClick={() => openEditModal(banner)}>
                          <Edit size={18} />
                        </button>
                        <button className="btn-icon delete" title="Delete Banner" onClick={() => deleteBanner(banner._id)}>
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

      {/* Add/Edit Banner Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="add-banner-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingBannerId ? 'Edit Banner' : 'Add New Banner'}</h2>
              <button className="close-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="upload-box" style={{ padding: '20px', border: '1px dashed #ccc', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <ImageIcon size={20} />
                  <h4 style={{ margin: 0 }}>Banner Images</h4>
                </div>
                
                {formData.images.map((url, index) => (
                  <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', padding: '12px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        value={url.startsWith('data:image') ? 'Uploaded Image File' : url} 
                        onChange={(e) => updateImageUrl(index, e.target.value)} 
                        placeholder="Enter Image URL here..." 
                        className="form-input" 
                        style={{ flex: 1, backgroundColor: url.startsWith('data:image') ? '#e5e7eb' : '#fff' }} 
                        readOnly={url.startsWith('data:image')}
                      />
                      {formData.images.length > 1 && (
                        <button type="button" onClick={() => removeImageUrlField(index)} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', padding: '0 12px', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'bold' }}>OR</span>
                      <label style={{ cursor: 'pointer', background: '#e0e7ff', color: '#4338ca', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ImageIcon size={14} /> Upload from PC
                        <input 
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              if (file.size > 5 * 1024 * 1024) {
                                alert('Please upload an image smaller than 5MB to ensure fast loading.');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateImageUrl(index, reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      {url.startsWith('data:image') && (
                        <button type="button" onClick={() => updateImageUrl(index, '')} style={{ fontSize: '13px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                          Remove Upload
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                <button onClick={addImageUrlField} style={{ background: '#f0fdf4', color: '#0c831f', border: '1px solid #bbf7d0', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 'bold' }}>
                  <Plus size={16} /> Add Another Image URL
                </button>
              </div>

              <div className="form-group">
                <label>Banner Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Summer Sale 50% Off" className="form-input" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Display Location</label>
                  <select name="location" value={formData.location} onChange={handleInputChange} className="form-input">
                    <option>Home Page Top</option>
                    <option>Home Page Middle</option>
                    <option>Category Page</option>
                    <option>Checkout Page</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Target URL / Link</label>
                  <input type="text" name="link" value={formData.link} onChange={handleInputChange} placeholder="https://..." className="form-input" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="form-input" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveBanner} disabled={!formData.title || formData.images[0] === ''}>
                {editingBannerId ? 'Update Banner' : 'Save Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
