import React, { useState } from 'react';
import { Search, Filter, Eye, Check, X as CloseIcon, MapPin, Phone, Mail, Package, IndianRupee, CreditCard, User } from 'lucide-react';
import './SellerOrders.css';

const MOCK_ORDERS = [
  {
    id: 'ORD-8901',
    customerName: 'Rahul Sharma',
    customerEmail: 'rahul.s@example.com',
    customerPhone: '+91 98765 43210',
    address: '123, Palm Grove Apartments, Andheri West, Mumbai, 400053',
    productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80',
    productName: 'Wireless Noise Cancelling Headphones',
    quantity: 1,
    totalPrice: 4999,
    paymentMethod: 'Credit Card',
    status: 'Pending',
    date: 'Oct 24, 2023 14:30'
  },
  {
    id: 'ORD-8902',
    customerName: 'Priya Patel',
    customerEmail: 'priya.p@example.com',
    customerPhone: '+91 87654 32109',
    address: '45, Sunrise Villa, Koramangala, Bengaluru, 560034',
    productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80',
    productName: 'Smart Watch Series 5',
    quantity: 2,
    totalPrice: 2998,
    paymentMethod: 'UPI',
    status: 'Processing',
    date: 'Oct 23, 2023 09:15'
  },
  {
    id: 'ORD-8903',
    customerName: 'Amit Kumar',
    customerEmail: 'amit.k@example.com',
    customerPhone: '+91 76543 21098',
    address: 'B-702, Galaxy Towers, Cyber City, Gurugram, 122002',
    productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80',
    productName: 'Men\'s Running Shoes',
    quantity: 1,
    totalPrice: 2499,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    date: 'Oct 20, 2023 18:45'
  },
  {
    id: 'ORD-8904',
    customerName: 'Neha Gupta',
    customerEmail: 'neha.g@example.com',
    customerPhone: '+91 65432 10987',
    address: 'Villa 12, Rose Garden, Banjara Hills, Hyderabad, 500034',
    productImage: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=100&q=80',
    productName: 'Casual Cotton Shirt',
    quantity: 3,
    totalPrice: 3897,
    paymentMethod: 'Net Banking',
    status: 'Cancelled',
    date: 'Oct 19, 2023 11:20'
  },
  {
    id: 'ORD-8905',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram.s@example.com',
    customerPhone: '+91 54321 09876',
    address: 'Flat 405, Green Valley, Vasant Kunj, New Delhi, 110070',
    productImage: 'https://images.unsplash.com/photo-1587049352851-8d4e8913475f?w=100&q=80',
    productName: 'Organic Honey 500g',
    quantity: 5,
    totalPrice: 2250,
    paymentMethod: 'Wallet',
    status: 'Pending',
    date: 'Oct 24, 2023 16:05'
  }
];

export default function SellerOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch(status) {
      case 'Pending': return 'status-pending';
      case 'Processing': return 'status-processing';
      case 'Delivered': return 'status-delivered';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const handleAction = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  return (
    <div className="seller-orders-page">
      {/* Header Section */}
      <div className="orders-header">
        <div className="header-title">
          <h1>Orders</h1>
          <p>Manage and track all your customer orders</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by ID, Customer, or Product..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={18} className="filter-icon" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      {filteredOrders.length > 0 ? (
        <div className="orders-list">
          <div className="table-responsive">
            <table className="orders-table-full">
              <thead>
                <tr>
                  <th>Order Details</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className="order-row">
                    <td>
                      <div className="order-id-cell">
                        <span className="order-id">{order.id}</span>
                        <span className="order-date">{order.date}</span>
                        <span className="payment-method">
                          <CreditCard size={14} /> {order.paymentMethod}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="customer-cell">
                        <span className="customer-name">{order.customerName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="product-cell-detail">
                        <img src={order.productImage} alt={order.productName} className="order-product-image" />
                        <div className="product-info-compact">
                          <span className="product-name" title={order.productName}>{order.productName}</span>
                          <span className="product-qty">Qty: {order.quantity}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="amount-cell">
                        <span className="total-price">₹{order.totalPrice.toLocaleString()}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="seller-action-btn view-btn" 
                          title="View Details"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye size={18} />
                        </button>
                        {order.status === 'Pending' && (
                          <>
                            <button 
                              className="seller-action-btn accept-btn" 
                              title="Accept Order"
                              onClick={() => handleAction(order.id, 'Processing')}
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              className="seller-action-btn reject-btn" 
                              title="Reject Order"
                              onClick={() => handleAction(order.id, 'Cancelled')}
                            >
                              <CloseIcon size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Card View (shown only on small screens via CSS) */}
          <div className="orders-mobile-cards">
            {filteredOrders.map(order => (
              <div key={order.id} className="order-mobile-card">
                <div className="card-header-flex">
                  <div>
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <span className={`order-status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="card-product-flex">
                  <img src={order.productImage} alt={order.productName} />
                  <div>
                    <span className="product-name">{order.productName}</span>
                    <span className="product-qty">Qty: {order.quantity}</span>
                  </div>
                </div>
                
                <div className="card-customer-flex">
                  <span className="customer-name"><User size={14}/> {order.customerName}</span>
                  <span className="total-price">₹{order.totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="card-actions-flex">
                  <button className="btn-secondary flex-1" onClick={() => setSelectedOrder(order)}>
                    <Eye size={16} /> Details
                  </button>
                  {order.status === 'Pending' && (
                    <div className="action-group">
                      <button className="btn-success" onClick={() => handleAction(order.id, 'Processing')}>
                        <Check size={16} /> Accept
                      </button>
                      <button className="btn-danger" onClick={() => handleAction(order.id, 'Cancelled')}>
                        <CloseIcon size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-wrapper">
            <Package size={64} className="empty-icon" />
          </div>
          <h3>No Orders Yet</h3>
          <p>
            {searchQuery || statusFilter !== 'All' 
              ? "No orders match your current filters." 
              : "When customers place orders, they will appear here."}
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Order Details</h2>
                <p className="order-id-subtitle">{selectedOrder.id} • {selectedOrder.date}</p>
              </div>
              <button className="close-modal-btn" onClick={() => setSelectedOrder(null)}>
                <CloseIcon size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="status-banner">
                <span>Current Status:</span>
                <span className={`order-status-badge ${getStatusClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              
              <div className="details-grid">
                <div className="details-card">
                  <h3><User size={18} /> Customer Info</h3>
                  <div className="info-row">
                    <span className="label">Name:</span>
                    <span className="value">{selectedOrder.customerName}</span>
                  </div>
                  <div className="info-row">
                    <Mail size={14} className="icon-muted" />
                    <span className="value">{selectedOrder.customerEmail}</span>
                  </div>
                  <div className="info-row">
                    <Phone size={14} className="icon-muted" />
                    <span className="value">{selectedOrder.customerPhone}</span>
                  </div>
                </div>
                
                <div className="details-card">
                  <h3><MapPin size={18} /> Delivery Address</h3>
                  <p className="address-text">{selectedOrder.address}</p>
                </div>
              </div>
              
              <div className="order-items-section">
                <h3>Ordered Products</h3>
                <div className="ordered-product-item">
                  <img src={selectedOrder.productImage} alt={selectedOrder.productName} />
                  <div className="item-details">
                    <span className="item-name">{selectedOrder.productName}</span>
                    <span className="item-meta">Qty: {selectedOrder.quantity} × ₹{(selectedOrder.totalPrice / selectedOrder.quantity).toLocaleString()}</span>
                  </div>
                  <span className="item-total">₹{selectedOrder.totalPrice.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="payment-summary">
                <div className="summary-row">
                  <span className="label">Payment Method</span>
                  <span className="value">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="summary-row total-row">
                  <span className="label">Total Amount</span>
                  <span className="value amount">₹{selectedOrder.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              {selectedOrder.status === 'Pending' ? (
                <>
                  <button className="btn-danger" onClick={() => handleAction(selectedOrder.id, 'Cancelled')}>
                    Reject Order
                  </button>
                  <button className="btn-success" onClick={() => handleAction(selectedOrder.id, 'Processing')}>
                    Accept Order
                  </button>
                </>
              ) : selectedOrder.status === 'Processing' ? (
                <button className="btn-primary" onClick={() => handleAction(selectedOrder.id, 'Delivered')}>
                  Mark as Delivered
                </button>
              ) : (
                <button className="btn-secondary" onClick={() => setSelectedOrder(null)}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
