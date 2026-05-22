import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, PackageX, ChevronDown, Filter, X, CheckCircle } from 'lucide-react';
import './SellerProducts.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: 4999,
    stock: 45,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-quality wireless headphones.'
  },
  {
    id: 2,
    name: 'Men\'s Casual Cotton Shirt',
    category: 'Fashion',
    price: 1299,
    stock: 12,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=500&q=80',
    description: 'Comfortable casual cotton shirt.'
  },
  {
    id: 3,
    name: 'Organic Honey 500g',
    category: 'Grocery',
    price: 450,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e8913475f?w=500&q=80',
    description: 'Pure organic honey.'
  },
  {
    id: 4,
    name: 'Running Shoes for Men',
    category: 'Shoes',
    price: 2499,
    stock: 89,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    description: 'Comfortable running shoes.'
  },
  {
    id: 5,
    name: 'Smart Home Security Camera',
    category: 'Electronics',
    price: 3299,
    stock: 5,
    status: 'Low Stock',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=500&q=80',
    description: 'Smart home security camera with night vision.'
  },
  {
    id: 6,
    name: 'Women\'s Floral Summer Dress',
    category: 'Fashion',
    price: 1899,
    stock: 34,
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80',
    description: 'Beautiful floral summer dress.'
  }
];

const CATEGORIES = ['All', 'Electronics', 'Fashion', 'Grocery', 'Shoes'];

export default function SellerProducts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    stock: '',
    image: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'status-in-stock';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-of-stock';
      default: return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for field when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const stockNum = Number(formData.stock);
      let status = 'In Stock';
      if (stockNum === 0) status = 'Out of Stock';
      else if (stockNum < 10) status = 'Low Stock';

      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: stockNum,
        status: status,
        image: formData.image,
        description: formData.description
      };

      setProducts([newProduct, ...products]);
      setIsModalOpen(false);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Electronics',
        price: '',
        stock: '',
        image: '',
        description: ''
      });
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  return (
    <div className="seller-products-page">
      {/* Success Toast */}
      {showSuccess && (
        <div className="success-toast">
          <CheckCircle size={20} />
          <span>Product added successfully!</span>
        </div>
      )}

      {/* Header Section */}
      <div className="products-header">
        <div className="header-title">
          <h1>Products</h1>
          <p>Manage your inventory, pricing, and product details</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
            <span className="btn-text-hide-mobile">Add Product</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="category-filters">
        {CATEGORIES.map(category => (
          <button 
            key={category}
            className={`filter-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <span className={`product-status-badge ${getStatusColor(product.status)}`}>
                  {product.status}
                </span>
              </div>
              
              <div className="product-details">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                
                <div className="product-meta">
                  <div className="product-price">₹{product.price.toLocaleString()}</div>
                  <div className="product-stock">
                    <span className="stock-label">Stock:</span> 
                    <span className={`stock-value ${product.stock < 10 ? (product.stock === 0 ? 'text-danger' : 'text-warning') : ''}`}>
                      {product.stock}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="product-actions">
                <button className="seller-action-btn view-btn" title="View Details">
                  <Eye size={18} />
                </button>
                <button className="seller-action-btn edit-btn" title="Edit Product">
                  <Edit size={18} />
                </button>
                <button className="seller-action-btn delete-btn" title="Delete Product" onClick={() => setProducts(products.filter(p => p.id !== product.id))}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <PackageX size={64} className="empty-icon" />
          </div>
          <h3>No Products Found</h3>
          <p>
            {searchQuery 
              ? `No products match your search "${searchQuery}" in ${activeCategory}.`
              : "You haven't added any products yet."}
          </p>
          <button className="btn-primary mt-4" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} />
            <span>Add Your First Product</span>
          </button>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddProduct} className="add-product-form">
              <div className="form-group">
                <label>Product Image URL</label>
                <input 
                  type="text" 
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={errors.image ? 'input-error' : ''}
                />
                {errors.image && <span className="error-text">{errors.image}</span>}
              </div>

              <div className="form-group">
                <label>Product Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    name="category" 
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (₹)</label>
                  <input 
                    type="number" 
                    name="price"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={errors.price ? 'input-error' : ''}
                  />
                  {errors.price && <span className="error-text">{errors.price}</span>}
                </div>

                <div className="form-group">
                  <label>Stock Quantity</label>
                  <input 
                    type="number" 
                    name="stock"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className={errors.stock ? 'input-error' : ''}
                  />
                  {errors.stock && <span className="error-text">{errors.stock}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description"
                  placeholder="Product description..."
                  rows="3"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={errors.description ? 'input-error' : ''}
                ></textarea>
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
