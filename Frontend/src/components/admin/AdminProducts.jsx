import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Edit, EyeOff, Trash2, X, Package, 
  Store, Tag, IndianRupee, Layers, AlertCircle, CheckCircle, PackageMinus
} from 'lucide-react';
import './AdminProducts.css';

const MOCK_PRODUCTS = [
  { id: 'PRD-1001', name: 'Premium Wireless Headphones', seller: 'Tech Store', category: 'Electronics', price: '₹2,999', stock: 120, status: 'Active', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80', description: 'High-quality wireless headphones with noise cancellation and 24-hour battery life.' },
  { id: 'PRD-1002', name: 'Organic Green Tea', seller: 'Fresh Foods', category: 'Groceries', price: '₹450', stock: 12, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1627492275512-7a1db2f50f69?w=100&q=80', description: 'Pure organic green tea leaves sourced from the finest tea gardens in Assam.' },
  { id: 'PRD-1003', name: 'Men\'s Running Shoes', seller: 'Fashion Hub', category: 'Fashion', price: '₹1,599', stock: 0, status: 'Out of Stock', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80', description: 'Lightweight and breathable running shoes designed for ultimate comfort and performance.' },
  { id: 'PRD-1004', name: 'Smart Fitness Band', seller: 'Gadget World', category: 'Electronics', price: '₹1,299', stock: 45, status: 'Hidden', img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b0?w=100&q=80', description: 'Track your daily activities, heart rate, and sleep patterns with this sleek fitness band.' },
  { id: 'PRD-1005', name: 'Wooden Coffee Table', seller: 'RR Mart', category: 'Home & Furniture', price: '₹4,500', stock: 8, status: 'Low Stock', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=100&q=80', description: 'Minimalist wooden coffee table perfect for modern living rooms.' },
];

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);
  const handleCategoryFilter = (e) => setCategoryFilter(e.target.value);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Active': return 'status-active';
      case 'Low Stock': return 'status-low';
      case 'Out of Stock': return 'status-out';
      case 'Hidden': return 'status-hidden';
      default: return '';
    }
  };

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    lowStock: products.filter(p => p.status === 'Low Stock').length,
    outOfStock: products.filter(p => p.status === 'Out of Stock').length,
  };

  return (
    <div className="admin-products-page">
      {/* Header Section */}
      <div className="products-header">
        <div className="header-title">
          <h1>Products</h1>
          <p>Manage inventory, prices, and product visibility</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="icon" />
            <input 
              type="text" 
              placeholder="Search products, sellers..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-dropdown">
            <Layers size={18} className="icon" />
            <select value={categoryFilter} onChange={handleCategoryFilter}>
              <option value="All">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Groceries">Groceries</option>
              <option value="Fashion">Fashion</option>
              <option value="Home & Furniture">Home & Furniture</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <Filter size={18} className="icon" />
            <select value={statusFilter} onChange={handleStatusFilter}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Stats Cards */}
      <div className="summary-cards">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Products</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Active Products</p>
            <h3 className="stat-value">{stats.active}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Low Stock</p>
            <h3 className="stat-value">{stats.lowStock}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-red">
            <PackageMinus size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Out of Stock</p>
            <h3 className="stat-value">{stats.outOfStock}</h3>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="products-card card">
        <div className="table-responsive">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <Package size={48} className="empty-icon" />
              <h3>No Products Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product Info</th>
                  <th>Category</th>
                  <th>Seller</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        <img src={product.img} alt={product.name} />
                        <div>
                          <p className="product-name">{product.name}</p>
                          <p className="product-id">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="category-tag">{product.category}</span></td>
                    <td><span className="seller-name">{product.seller}</span></td>
                    <td><span className="price-text">{product.price}</span></td>
                    <td>
                      <span className={`stock-text ${product.stock === 0 ? 'text-red' : product.stock < 15 ? 'text-orange' : 'text-green'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusClass(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Details" onClick={() => openModal(product)}>
                          <Eye size={18} />
                        </button>
                        <button className="btn-icon edit" title="Edit Product">
                          <Edit size={18} />
                        </button>
                        {product.status !== 'Hidden' ? (
                           <button className="btn-icon hide" title="Hide Product">
                             <EyeOff size={18} />
                           </button>
                        ) : (
                           <button className="btn-icon view" title="Show Product">
                             <Eye size={18} />
                           </button>
                        )}
                        <button className="btn-icon delete" title="Delete Product">
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

      {/* Product Details Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Product Details</h2>
              <button className="close-btn" onClick={closeModal}><X size={24} /></button>
            </div>
            
            <div className="modal-body">
              <div className="product-details-container">
                <div className="product-image-container">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="modal-large-img" />
                  <span className={`status-badge floating ${getStatusClass(selectedProduct.status)}`}>
                    {selectedProduct.status}
                  </span>
                </div>
                
                <div className="product-info-details">
                  <div className="product-title-section">
                    <h3>{selectedProduct.name}</h3>
                    <p className="product-id-modal">{selectedProduct.id}</p>
                    <h2 className="product-price-large">{selectedProduct.price}</h2>
                  </div>

                  <div className="product-desc-section">
                    <h4>Description</h4>
                    <p>{selectedProduct.description}</p>
                  </div>

                  <div className="modal-info-grid compact">
                    <div className="info-item">
                      <div className="info-icon bg-blue"><Store size={16} /></div>
                      <div className="info-text">
                        <label>Seller</label>
                        <p>{selectedProduct.seller}</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon bg-purple"><Tag size={16} /></div>
                      <div className="info-text">
                        <label>Category</label>
                        <p>{selectedProduct.category}</p>
                      </div>
                    </div>
                    <div className="info-item">
                      <div className="info-icon bg-orange"><Package size={16} /></div>
                      <div className="info-text">
                        <label>Stock Available</label>
                        <p className={selectedProduct.stock === 0 ? 'text-red font-bold' : ''}>
                          {selectedProduct.stock} Units
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-outline-danger">
                  <Trash2 size={18} /> Delete Product
                </button>
                <div className="right-actions">
                  <button className="btn-outline">
                    <Edit size={18} /> Edit Details
                  </button>
                  <button className="btn-primary" onClick={closeModal}>
                    Done
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
