import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Eye, PackageX, X, CheckCircle, PlusCircle, MinusCircle } from 'lucide-react';
import './SellerProducts.css';

const CATEGORIES = [
  'All', 
  'Grocery / Fruits / Vegetables', 
  'Dairy', 
  'Drinks', 
  'Fashion', 
  'Electronics',
  'Beauty & Personal Care',
  'Furniture',
  'Shoes',
  'Toys'
];

const DYNAMIC_FIELDS_SCHEMA = {
  'Grocery / Fruits / Vegetables': [
    { name: 'weight', label: 'Weight', type: 'text', placeholder: 'e.g., 1kg, 500g' },
    { name: 'freshness', label: 'Freshness', type: 'select', options: ['Fresh', '1 day old', '2 days old'] },
    { name: 'organicOption', label: 'Organic Option', type: 'select', options: ['Yes', 'No'] }
  ],
  'Dairy': [
    { name: 'volume', label: 'Volume', type: 'text', placeholder: 'e.g., 1L, 500ml' },
    { name: 'expiryDate', label: 'Expiry Date', type: 'date' },
    { name: 'storageType', label: 'Storage Type', type: 'text', placeholder: 'e.g., Refrigerated' }
  ],
  'Drinks': [
    { name: 'volume', label: 'Volume', type: 'text', placeholder: 'e.g., 2L, 330ml' },
    { name: 'flavor', label: 'Flavor', type: 'text', placeholder: 'e.g., Cola, Orange' },
    { name: 'temperatureType', label: 'Temperature Type', type: 'select', options: ['Room Temperature', 'Cold', 'Chilled'] }
  ],
  'Fashion': [
    { name: 'size', label: 'Size', type: 'text', placeholder: 'e.g., S, M, L, XL' },
    { name: 'color', label: 'Color', type: 'text', placeholder: 'e.g., Red, Blue' },
    { name: 'material', label: 'Material', type: 'text', placeholder: 'e.g., Cotton, Silk' }
  ],
  'Electronics': [
    { name: 'warranty', label: 'Warranty', type: 'text', placeholder: 'e.g., 1 Year' },
    { name: 'battery', label: 'Battery', type: 'text', placeholder: 'e.g., 4000mAh' },
    { name: 'modelNumber', label: 'Model Number', type: 'text', placeholder: 'e.g., SM-G998B' }
  ]
};

export default function SellerProducts() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      const sellerInfo = JSON.parse(localStorage.getItem('seller_info') || '{}');
      const sellerProducts = data.filter(p => {
        const pSellerId = p.seller && p.seller._id ? p.seller._id : p.seller;
        return pSellerId === sellerInfo._id;
      });
      
      const formatted = sellerProducts.map(p => ({
        ...p,
        id: p._id,
        name: p.title,
        status: p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'In Stock'
      }));
      setProducts(formatted);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Grocery / Fruits / Vegetables',
    brand: '',
    originalPrice: '',
    price: '',
    stock: '',
    productStatus: 'Active',
    images: [''],
    description: '',
    dynamicFields: {},
    customAttributes: []
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
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      if (name === 'category') {
        newData.dynamicFields = {};
      }
      return newData;
    });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDynamicFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      dynamicFields: { ...prev.dynamicFields, [name]: value }
    }));
  };

  const handleCustomAttributeChange = (index, field, value) => {
    const newCustomAttributes = [...formData.customAttributes];
    newCustomAttributes[index][field] = value;
    setFormData(prev => ({ ...prev, customAttributes: newCustomAttributes }));
  };

  const addCustomAttribute = () => {
    setFormData(prev => ({
      ...prev,
      customAttributes: [...prev.customAttributes, { key: '', value: '' }]
    }));
  };

  const removeCustomAttribute = (index) => {
    const newCustomAttributes = formData.customAttributes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, customAttributes: newCustomAttributes }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const addImageInput = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImageInput = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    if (newImages.length === 0) newImages.push('');
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) newErrors.price = 'Valid selling price is required';
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    if (formData.images.length === 0 || !formData.images[0].trim()) newErrors.images = 'At least one image URL is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const stockNum = Number(formData.stock);
        const sellerInfo = JSON.parse(localStorage.getItem('seller_info') || '{}');

        const validImages = formData.images.filter(img => img.trim() !== '');

        const payload = {
          title: formData.name,
          category: formData.category,
          brand: formData.brand,
          originalPrice: Number(formData.originalPrice) || 0,
          price: Number(formData.price),
          stock: stockNum,
          status: formData.productStatus,
          image: validImages[0] || '',
          images: validImages.map(url => ({ url })),
          description: formData.description,
          dynamicFields: formData.dynamicFields,
          customAttributes: formData.customAttributes.filter(attr => attr.key.trim() && attr.value.trim()),
          sellerId: sellerInfo._id
        };

        const url = editingProduct 
          ? `http://localhost:5000/api/products/${editingProduct.id}`
          : 'http://localhost:5000/api/products';
          
        const method = editingProduct ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          await fetchProducts();
          closeModal();
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        } else {
          const data = await res.json();
          alert(data.message || 'Failed to save product');
        }
      } catch (error) {
        console.error('Error saving product:', error);
        alert('Server connection failed.');
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setProducts(products.filter(p => p.id !== productId));
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    
    let parsedImages = [''];
    if (product.images && product.images.length > 0) {
      parsedImages = product.images.map(img => typeof img === 'object' ? img.url : img);
    } else if (product.image) {
      parsedImages = [product.image];
    }

    setFormData({
      name: product.name,
      category: product.category || 'Grocery / Fruits / Vegetables',
      brand: product.brand || '',
      originalPrice: product.originalPrice || '',
      price: product.price,
      stock: product.stock,
      productStatus: product.status || 'Active',
      images: parsedImages,
      description: product.description || '',
      dynamicFields: product.dynamicFields || {},
      customAttributes: product.customAttributes || []
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '', category: 'Grocery / Fruits / Vegetables', brand: '', originalPrice: '', price: '', stock: '', productStatus: 'Active', images: [''], description: '', dynamicFields: {}, customAttributes: []
    });
    setErrors({});
  };

  const currentDynamicFields = DYNAMIC_FIELDS_SCHEMA[formData.category] || [];

  return (
    <div className="seller-products-page">
      {showSuccess && (
        <div className="success-toast">
          <CheckCircle size={20} />
          <span>Product {editingProduct ? 'updated' : 'added'} successfully!</span>
        </div>
      )}

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
          <button className="btn-primary" onClick={() => {
            setEditingProduct(null);
            setFormData({ name: '', category: 'Grocery / Fruits / Vegetables', brand: '', originalPrice: '', price: '', stock: '', productStatus: 'Active', images: [''], description: '', dynamicFields: {}, customAttributes: [] });
            setIsModalOpen(true);
          }}>
            <Plus size={20} />
            <span className="btn-text-hide-mobile">Add Product</span>
          </button>
        </div>
      </div>

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

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="product-image" />
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
                <button className="seller-action-btn edit-btn" title="Edit Product" onClick={() => handleEditProduct(product)}>
                  <Edit size={18} />
                </button>
                <button className="seller-action-btn delete-btn" title="Delete Product" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
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

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="close-modal-btn" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="add-product-form styled-form">
              <div className="form-section">
                <h3>Basic Information</h3>
                <div className="form-row">
                  <div className="form-group flex-2">
                    <label>Product Name</label>
                    <input type="text" name="name" placeholder="Enter product name" value={formData.name} onChange={handleInputChange} className={errors.name ? 'input-error' : ''} />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>
                  <div className="form-group flex-1">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                      {CATEGORIES.filter(c => c !== 'All').map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Brand</label>
                    <input type="text" name="brand" placeholder="Brand name" value={formData.brand} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Product Status</label>
                    <select name="productStatus" value={formData.productStatus} onChange={handleInputChange}>
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Discontinued">Discontinued</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Pricing & Inventory</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Selling Price (₹)</label>
                    <input type="number" name="price" placeholder="0.00" value={formData.price} onChange={handleInputChange} className={errors.price ? 'input-error' : ''} />
                    {errors.price && <span className="error-text">{errors.price}</span>}
                  </div>
                  <div className="form-group">
                    <label>Original Price (₹)</label>
                    <input type="number" name="originalPrice" placeholder="0.00 (Optional)" value={formData.originalPrice} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input type="number" name="stock" placeholder="0" value={formData.stock} onChange={handleInputChange} className={errors.stock ? 'input-error' : ''} />
                    {errors.stock && <span className="error-text">{errors.stock}</span>}
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3>Media & Description</h3>
                <div className="form-group">
                  <label>Product Images (URLs)</label>
                  {formData.images.map((img, index) => (
                    <div key={index} className="image-input-row">
                      <input type="text" placeholder="https://example.com/image.jpg" value={img} onChange={(e) => handleImageChange(index, e.target.value)} className={errors.images && index === 0 ? 'input-error' : ''} />
                      {formData.images.length > 1 && (
                        <button type="button" className="remove-btn" onClick={() => removeImageInput(index)}>
                          <MinusCircle size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="add-link-btn" onClick={addImageInput}>
                    <PlusCircle size={16} /> Add Another Image
                  </button>
                  {errors.images && <span className="error-text">{errors.images}</span>}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea name="description" placeholder="Product description..." rows="3" value={formData.description} onChange={handleInputChange} className={errors.description ? 'input-error' : ''}></textarea>
                  {errors.description && <span className="error-text">{errors.description}</span>}
                </div>
              </div>

              {currentDynamicFields.length > 0 && (
                <div className="form-section dynamic-section">
                  <h3>Category Details ({formData.category})</h3>
                  <div className="form-row flex-wrap">
                    {currentDynamicFields.map(field => (
                      <div key={field.name} className="form-group flex-1 min-w-200">
                        <label>{field.label}</label>
                        {field.type === 'select' ? (
                          <select name={field.name} value={formData.dynamicFields[field.name] || ''} onChange={handleDynamicFieldChange}>
                            <option value="">Select {field.label}</option>
                            {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        ) : (
                          <input type={field.type} name={field.name} placeholder={field.placeholder} value={formData.dynamicFields[field.name] || ''} onChange={handleDynamicFieldChange} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-section custom-attributes-section">
                <h3>Custom Attributes (Optional)</h3>
                <p className="section-hint">Add any additional specific details for this product.</p>
                {formData.customAttributes.map((attr, index) => (
                  <div key={index} className="custom-attr-row">
                    <input type="text" placeholder="Key (e.g. Flavor)" value={attr.key} onChange={(e) => handleCustomAttributeChange(index, 'key', e.target.value)} />
                    <input type="text" placeholder="Value (e.g. Chocolate)" value={attr.value} onChange={(e) => handleCustomAttributeChange(index, 'value', e.target.value)} />
                    <button type="button" className="remove-btn" onClick={() => removeCustomAttribute(index)}>
                      <MinusCircle size={20} />
                    </button>
                  </div>
                ))}
                <button type="button" className="add-link-btn" onClick={addCustomAttribute}>
                  <PlusCircle size={16} /> Add Custom Attribute
                </button>
              </div>

              <div className="modal-footer sticky-footer">
                <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn-primary">{editingProduct ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
