import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import './AdminCategories.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    icon: 'Store',
    color: '#FFFDD0',
    isActive: true
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/categories/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/categories', formData);
      }
      setShowModal(false);
      setEditingId(null);
      setFormData({ name: '', image: '', icon: 'Store', color: '#FFFDD0', isActive: true });
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert(error.response?.data?.message || 'Error saving category');
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      image: category.image,
      icon: category.icon || 'Store',
      color: category.color || '#FFFDD0',
      isActive: category.isActive !== undefined ? category.isActive : true
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="admin-categories">
      <div className="page-header">
        <h2>Manage Categories</h2>
        <button 
          className="add-btn"
          onClick={() => {
            setEditingId(null);
            setFormData({ name: '', image: '', icon: 'Store', color: '#FFFDD0', isActive: true });
            setShowModal(true);
          }}
        >
          <PlusCircle size={20} />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading categories...</div>
      ) : (
        <div className="categories-grid">
          {categories.map((cat) => (
            <div className="category-card-admin" key={cat._id}>
              <div className="category-img-container" style={{ backgroundColor: cat.color }}>
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="category-info">
                <h3>{cat.name}</h3>
                <div className="category-meta">
                  <span className={`status-badge ${cat.isActive ? 'active' : 'inactive'}`}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span>Icon: {cat.icon}</span>
                </div>
              </div>
              <div className="category-actions">
                <button className="edit-btn" onClick={() => handleEdit(cat)}>
                  <Edit size={18} />
                </button>
                <button className="delete-btn" onClick={() => handleDelete(cat._id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><XCircle size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label>Category Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input 
                  type="text" 
                  name="image" 
                  value={formData.image} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Lucide Icon Name (e.g. Store, Cookie, Smartphone)</label>
                <input 
                  type="text" 
                  name="icon" 
                  value={formData.icon} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Background Color (Hex code)</label>
                <div className="color-picker-container">
                  <input 
                    type="color" 
                    name="color" 
                    value={formData.color} 
                    onChange={handleInputChange} 
                  />
                  <input 
                    type="text" 
                    name="color" 
                    value={formData.color} 
                    onChange={handleInputChange} 
                    placeholder="#FFFDD0"
                  />
                </div>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleInputChange} 
                  />
                  Active (Visible on Frontend)
                </label>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">{editingId ? 'Update' : 'Save'} Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
