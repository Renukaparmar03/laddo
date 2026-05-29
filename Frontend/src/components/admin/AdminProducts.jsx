import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Edit, EyeOff, Trash2, X, Package, 
  Store, Tag, IndianRupee, Layers, AlertCircle, CheckCircle, PackageMinus
} from 'lucide-react';
import './AdminProducts.css';



export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Fetch both products and sellers simultaneously for faster loading
      const [productsRes, sellersRes] = await Promise.all([
        fetch('http://localhost:5000/api/products'),
        fetch('http://localhost:5000/api/sellers')
      ]);
      
      const data = await productsRes.json();
      const sellersData = await sellersRes.json();
      
      // Create a dictionary map to easily look up seller names by ID
      const sellerMap = {};
      if (Array.isArray(sellersData)) {
        sellersData.forEach(s => {
          sellerMap[s._id] = s.businessName || s.ownerName || 'Unknown Shop';
        });
      }

      const formatted = data.map(p => {
        // Sometimes p.seller is an object, sometimes it's just the raw ID string
        const sellerId = p.seller?._id || p.seller;
        
        return {
          id: p._id,
          name: p.title,
          seller: sellerMap[sellerId] || p.seller?.businessName || 'Unknown',
          category: p.category,
          price: `₹${p.price}`,
          stock: p.stock,
          isApproved: p.isApproved,
          status: !p.isApproved ? 'Pending Approval' : (p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'Active'),
          img: p.image,
          description: p.description
        };
      });
      setProducts(formatted);
    } catch(err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    // Add delete API logic if backend has it. For now, just update state:
    setProducts(products.filter(p => p.id !== id));
    if (selectedProduct?.id === id) {
      setIsModalOpen(false);
    }
  };

  const handleApproveProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: true })
      });
      if (res.ok) {
        setProducts(products.map(p => 
          p.id === id ? { ...p, isApproved: true, status: p.stock === 0 ? 'Out of Stock' : p.stock < 10 ? 'Low Stock' : 'Active' } : p
        ));
        if (selectedProduct?.id === id) {
          setSelectedProduct(prev => ({
             ...prev, 
             isApproved: true, 
             status: prev.stock === 0 ? 'Out of Stock' : prev.stock < 10 ? 'Low Stock' : 'Active'
          }));
        }
      }
    } catch (error) {
      console.error('Error approving product:', error);
    }
  };
  
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
      case 'Pending Approval': return 'status-pending';
      default: return '';
    }
  };

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'Active').length,
    pending: products.filter(p => p.status === 'Pending Approval').length,
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
              <option value="Grocery & Kitchen">Grocery & Kitchen</option>
              <option value="Snacks & Drinks">Snacks & Drinks</option>
              <option value="Beauty & Personal Care">Beauty & Personal Care</option>
              <option value="Fashion">Fashion</option>
              <option value="Electronics">Electronics</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Furniture">Furniture</option>
              <option value="Shoes">Shoes</option>
              <option value="Toys">Toys</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <Filter size={18} className="icon" />
            <select value={statusFilter} onChange={handleStatusFilter}>
              <option value="All">All Status</option>
              <option value="Pending Approval">Pending Approval</option>
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
            <p className="stat-label">Pending Approval</p>
            <h3 className="stat-value">{stats.pending}</h3>
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
                        {!product.isApproved && (
                          <button className="btn-icon approve" style={{ color: 'green' }} title="Approve Product" onClick={() => handleApproveProduct(product.id)}>
                            <CheckCircle size={18} />
                          </button>
                        )}
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
                        <button className="btn-icon delete" title="Delete Product" onClick={() => handleDeleteProduct(product.id)}>
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
                <button className="btn-outline-danger" onClick={() => handleDeleteProduct(selectedProduct.id)}>
                   <Trash2 size={18} /> Delete Product
                </button>
                <div className="right-actions">
                  {!selectedProduct.isApproved && (
                    <button className="btn-primary" style={{ backgroundColor: 'green', borderColor: 'green', marginRight: '10px' }} onClick={() => handleApproveProduct(selectedProduct.id)}>
                      <CheckCircle size={18} /> Approve
                    </button>
                  )}
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
