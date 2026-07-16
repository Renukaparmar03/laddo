import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, CheckCircle, Package, Calendar } from 'lucide-react';
import './AdminActiveDeliveries.css';

export default function AdminDeliveryHistory() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('All');

  React.useEffect(() => {
    fetchDeliveryHistory();
  }, []);

  const fetchDeliveryHistory = async () => {
    try {
      setLoading(true);
      const [delRes, ordersRes] = await Promise.all([
        fetch('http://localhost:5000/api/delivery'),
        fetch('http://localhost:5000/api/orders')
      ]);

      const riders = await delRes.json();
      const allOrders = await ordersRes.json();

      const completedOrders = allOrders.filter(o => o.status === 'Delivered');

      const mappedHistory = completedOrders.reduce((acc, order) => {
        const dBoyId = order.deliveryBoy?._id || order.deliveryBoy;
        const rider = riders.find(r => r._id === dBoyId);
        
        const timestamp = order.deliveredAt || order.updatedAt || order.createdAt;
        const formattedDate = new Date(timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        
        acc.push({
          orderId: order.orderId || order._id.substring(0,8).toUpperCase(),
          riderName: rider ? (rider.name || rider.fullName) : 'Unassigned / Unknown',
          customerName: order.user?.name || 'Customer',
          customerLocation: `${order.shippingAddress?.address || ''}, ${order.shippingAddress?.city || ''}`,
          restaurantName: order.orderItems?.[0]?.seller?.businessName || order.orderItems?.[0]?.seller?.ownerName || 'Unknown Store',
          date: formattedDate,
          time: new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          revenue: order.shippingPrice || 25
        });

        return acc;
      }, []);

      setDeliveries(mappedHistory);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = d.orderId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.riderName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return <div className="admin-active-deliveries"><div style={{padding: '50px', textAlign: 'center'}}>Loading delivery history...</div></div>;
  }

  return (
    <div className="admin-active-deliveries">
      <div className="page-header">
        <div className="header-title">
          <h2>Delivery History</h2>
          <p>Review completed deliveries and trip logs</p>
        </div>
        
        <div className="header-actions">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search Order ID or Rider..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-responsive" style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Delivery Partner</th>
              <th>Route</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Payout</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                  <CheckCircle size={40} style={{ color: '#10b981', marginBottom: '10px' }} />
                  <h3>No Delivery History</h3>
                  <p>There are currently no completed deliveries matching your criteria.</p>
                </td>
              </tr>
            ) : (
              filteredDeliveries.map((delivery, index) => (
                <tr key={index}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: '#1f2937' }}>
                      <Package size={16} className="text-blue" />
                      {delivery.orderId}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {delivery.riderName.charAt(0)}
                      </div>
                      <span style={{ fontWeight: '500', color: '#374151' }}>{delivery.riderName}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563' }}>
                        <MapPin size={12} style={{ color: '#ef4444' }} /> {delivery.restaurantName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6b7280' }}>
                        <MapPin size={12} style={{ color: '#3b82f6' }} /> {delivery.customerLocation}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.85rem', color: '#4b5563' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> {delivery.date}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6b7280' }}>
                        <Clock size={12} /> {delivery.time}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#d1fae5', color: '#059669', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      <CheckCircle size={12} /> Delivered
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: '#10b981', fontSize: '1rem' }}>₹{delivery.revenue}</strong>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
