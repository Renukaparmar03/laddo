import React, { useState } from 'react';
import { 
  Search, Filter, Eye, Edit, XCircle, Trash2, X, MapPin, 
  ShoppingBag, CheckCircle, Truck, PackageOpen, CreditCard, Clock, User, Store, IndianRupee
} from 'lucide-react';
import './AdminOrders.css';

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deliveryFilter, setDeliveryFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const sellersRes = await fetch('http://localhost:5000/api/sellers');
      const sellersData = await sellersRes.json();
      
      const sellerMap = {};
      if (Array.isArray(sellersData)) {
        sellersData.forEach(s => {
          sellerMap[s._id] = s.businessName || s.ownerName || 'Unknown Seller';
        });
      }

      let allOrders = [];
      await Promise.all(sellersData.map(async (seller) => {
        try {
          const orderRes = await fetch(`http://localhost:5000/api/orders/seller/${seller._id}`);
          const orderData = await orderRes.json();
          if (orderData.orders) {
            allOrders = [...allOrders, ...orderData.orders];
          }
        } catch (e) {
          console.error(e);
        }
      }));

      // Deduplicate orders
      const uniqueOrdersMap = new Map();
      allOrders.forEach(o => uniqueOrdersMap.set(o._id, o));
      const uniqueOrders = Array.from(uniqueOrdersMap.values());
      
      // Sort by newest
      uniqueOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const formattedOrders = uniqueOrders.map(order => {
        const firstItem = order.orderItems && order.orderItems[0];
        const sellerId = firstItem ? (firstItem.seller?._id || firstItem.seller) : null;
        
        return {
          id: order._id,
          customer: order.user?.name || 'Customer', // Populated user data
          seller: sellerMap[sellerId] || 'Multiple/Unknown',
          product: order.orderItems?.length > 1 
            ? `${firstItem?.title} + ${order.orderItems.length - 1} more` 
            : firstItem?.title || 'Unknown Product',
          img: firstItem?.image || 'https://via.placeholder.com/50',
          amount: `₹${order.totalPrice}`,
          paymentMethod: order.paymentMethod || 'UPI',
          paymentStatus: order.isPaid ? 'Paid' : 'Pending',
          deliveryStatus: order.status || 'Pending',
          date: new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          qty: order.orderItems?.reduce((acc, item) => acc + item.qty, 0) || 1,
          address: order.shippingAddress 
            ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`
            : 'Not Provided',
          rawOrder: order
        };
      });

      setOrders(formattedOrders);
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleDeliveryFilter = (e) => setDeliveryFilter(e.target.value);
  const handlePaymentFilter = (e) => setPaymentFilter(e.target.value);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDelivery = deliveryFilter === 'All' || order.deliveryStatus === deliveryFilter;
    const matchesPayment = paymentFilter === 'All' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesDelivery && matchesPayment;
  });

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getDeliveryClass = (status) => {
    switch (status) {
      case 'Delivered': return 'status-delivered';
      case 'Processing': return 'status-processing';
      case 'Pending': return 'status-pending';
      case 'Cancelled': return 'status-cancelled';
      default: return '';
    }
  };

  const getPaymentClass = (status) => {
    switch (status) {
      case 'Paid': return 'status-delivered';
      case 'Pending': return 'status-pending';
      case 'Failed': return 'status-cancelled';
      default: return '';
    }
  };

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.deliveryStatus === 'Delivered').length,
    pending: orders.filter(o => o.deliveryStatus === 'Pending' || o.deliveryStatus === 'Preparing').length,
    revenue: `₹${orders.filter(o => o.paymentStatus === 'Paid' || o.deliveryStatus === 'Delivered').reduce((sum, o) => sum + Number(o.amount.replace(/[^0-9.-]+/g,"")), 0).toLocaleString()}`
  };

  return (
    <div className="admin-orders-page">
      {/* Header Section */}
      <div className="orders-header">
        <div className="header-title">
          <h1>Orders</h1>
          <p>Monitor and manage customer transactions</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="icon" />
            <input 
              type="text" 
              placeholder="Search ID, customer, seller..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-dropdown">
            <Truck size={18} className="icon" />
            <select value={deliveryFilter} onChange={handleDeliveryFilter}>
              <option value="All">All Delivery Status</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="filter-dropdown">
            <CreditCard size={18} className="icon" />
            <select value={paymentFilter} onChange={handlePaymentFilter}>
              <option value="All">All Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Stats Cards */}
      <div className="summary-cards">
        <div className="stat-card">
          <div className="stat-icon bg-blue">
            <ShoppingBag size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Orders</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-green">
            <PackageOpen size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Delivered Orders</p>
            <h3 className="stat-value">{stats.delivered}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-orange">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Pending Orders</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-purple">
            <IndianRupee size={24} />
          </div>
          <div className="stat-info">
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">{stats.revenue}</h3>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-card card">
        <div className="table-responsive">
          {loading ? (
            <div className="empty-state">
              <div style={{ padding: '40px', color: '#666' }}>Loading real-time orders...</div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="empty-state">
              <ShoppingBag size={48} className="empty-icon" />
              <h3>No Orders Found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Info</th>
                  <th>Product</th>
                  <th>Total Amount</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div className="order-info-cell">
                        <p className="order-id">{order.id}</p>
                        <p className="customer-name">{order.customer}</p>
                        <p className="order-date">{order.date}</p>
                      </div>
                    </td>
                    <td>
                      <div className="product-cell">
                        <img src={order.img} alt={order.product} />
                        <div>
                          <p className="product-name">{order.product}</p>
                          <p className="seller-name">by {order.seller}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="amount-text">{order.amount}</span></td>
                    <td>
                      <div className="payment-cell">
                        <span className={`order-badge ${getPaymentClass(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                        <p className="method-text">{order.paymentMethod}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`order-badge ${getDeliveryClass(order.deliveryStatus)}`}>
                        {order.deliveryStatus}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view" title="View Details" onClick={() => openModal(order)}>
                          <Eye size={18} />
                        </button>
                        <button className="btn-icon edit" title="Update Status">
                          <Edit size={18} />
                        </button>
                        {order.deliveryStatus !== 'Cancelled' && order.deliveryStatus !== 'Delivered' && (
                           <button className="btn-icon cancel" title="Cancel Order">
                             <XCircle size={18} />
                           </button>
                        )}
                        <button className="btn-icon delete" title="Delete Order">
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

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-btn" onClick={closeModal}><X size={24} /></button>
            </div>
            
            <div className="modal-body bg-gray-light">
              <div className="order-modal-top">
                <div>
                  <h3 className="modal-order-id">{selectedOrder.id}</h3>
                  <p className="modal-order-date">Placed on {selectedOrder.date}</p>
                </div>
                <div className="modal-status-badges">
                  <span className={`order-badge large ${getPaymentClass(selectedOrder.paymentStatus)}`}>
                    Payment: {selectedOrder.paymentStatus}
                  </span>
                  <span className={`order-badge large ${getDeliveryClass(selectedOrder.deliveryStatus)}`}>
                    Delivery: {selectedOrder.deliveryStatus}
                  </span>
                </div>
              </div>

              <div className="order-details-grid">
                <div className="details-card">
                  <h4><User size={18} className="text-blue" /> Customer Information</h4>
                  <div className="details-card-content">
                    <p><strong>Name:</strong> {selectedOrder.customer}</p>
                    <p><strong>Address:</strong> {selectedOrder.address}</p>
                  </div>
                </div>
                <div className="details-card">
                  <h4><Store size={18} className="text-purple" /> Seller Information</h4>
                  <div className="details-card-content">
                    <p><strong>Shop Name:</strong> {selectedOrder.seller}</p>
                  </div>
                </div>
                <div className="details-card">
                  <h4><CreditCard size={18} className="text-orange" /> Payment Details</h4>
                  <div className="details-card-content">
                    <p><strong>Method:</strong> {selectedOrder.paymentMethod}</p>
                    <p><strong>Total Amount:</strong> <span className="text-green font-bold">{selectedOrder.amount}</span></p>
                  </div>
                </div>
              </div>

              <div className="ordered-products-section">
                <h4>Ordered Items</h4>
                <div className="ordered-product-card">
                  <img src={selectedOrder.img} alt={selectedOrder.product} />
                  <div className="op-info">
                    <h5>{selectedOrder.product}</h5>
                    <p>Qty: {selectedOrder.qty}</p>
                  </div>
                  <div className="op-price">
                    {selectedOrder.amount}
                  </div>
                </div>
              </div>

              <div className="order-timeline-section">
                <h4>Order Timeline</h4>
                <div className="timeline">
                  <div className={`timeline-step ${selectedOrder.deliveryStatus !== 'Cancelled' ? 'completed' : 'cancelled'}`}>
                    <div className="step-icon"><CheckCircle size={16} /></div>
                    <div className="step-text">Order Placed</div>
                  </div>
                  <div className={`timeline-step ${['Processing', 'Delivered'].includes(selectedOrder.deliveryStatus) ? 'completed' : ''}`}>
                    <div className="step-icon"><PackageOpen size={16} /></div>
                    <div className="step-text">Processing</div>
                  </div>
                  <div className={`timeline-step ${selectedOrder.deliveryStatus === 'Delivered' ? 'completed' : ''}`}>
                    <div className="step-icon"><Truck size={16} /></div>
                    <div className="step-text">Delivered</div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-outline-danger">
                  <XCircle size={18} /> Cancel Order
                </button>
                <div className="right-actions">
                  <button className="btn-outline">
                    <Edit size={18} /> Update Status
                  </button>
                  <button className="btn-primary" onClick={closeModal}>
                    Close
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
