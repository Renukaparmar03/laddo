import React from 'react';
import { CheckCircle, Package, Clock, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const OrderSuccessPage = ({ navigate }) => {
  const location = useLocation();
  const { orderId = 'ORD123456', paymentMethod = 'UPI' } = location.state || {};

  return (
    <div className="order-success-page" style={{ background: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
      
      <div style={{ background: '#0c831f', color: '#fff', padding: '40px 20px', textAlign: 'center', borderBottomLeftRadius: '24px', borderBottomRightRadius: '24px' }}>
        <CheckCircle size={60} color="#fff" style={{ margin: '0 auto 16px' }} />
        <h1 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 'bold' }}>Order Placed!</h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>Your order {orderId} has been confirmed.</p>
      </div>

      <div style={{ padding: '20px', flex: 1 }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '20px', marginTop: '-20px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: '#f3f9f4', padding: '10px', borderRadius: '12px' }}>
              <Clock size={24} color="#0c831f" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: '#1a1a1a' }}>Estimated Delivery</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#0c831f', fontWeight: 'bold' }}>10 - 15 Minutes</p>
            </div>
          </div>
          
          <div style={{ borderTop: '1px dashed #eee', margin: '16px 0' }}></div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: '#f8f9fa', padding: '10px', borderRadius: '12px' }}>
              <Package size={24} color="#444" />
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '14px', color: '#666' }}>Payment Method</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#1a1a1a', fontWeight: 'bold' }}>{paymentMethod}</p>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', color: '#1a1a1a' }}>Order Status</h3>
          <div className="status-timeline" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '24px', width: '2px', background: '#eee', zIndex: 0 }}></div>
            
            <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1 }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#0c831f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }}></div>
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#1a1a1a' }}>Order Confirmed</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>We have received your order</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1, opacity: 0.5 }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#1a1a1a' }}>Packed</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Order is being packed</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', position: 'relative', zIndex: 1, opacity: 0.5 }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#1a1a1a' }}>Out for Delivery</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Partner is on the way</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', gap: '12px' }}>
        <button 
          onClick={() => navigate('/user/home')}
          style={{ flex: 1, background: '#fff', color: '#0c831f', border: '1px solid #0c831f', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px' }}
        >
          Back to Home
        </button>
        <button 
          onClick={() => navigate('/user/orders')}
          style={{ flex: 1, background: '#0c831f', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px' }}
        >
          Track Order
        </button>
      </div>

    </div>
  );
};

export default OrderSuccessPage;
