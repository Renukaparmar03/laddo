import React from 'react';
import { ArrowLeft, Trash2, ShieldCheck, Clock, FileText } from 'lucide-react';

const CartPage = ({ cart, setCart, navigate }) => {
  const [settings, setSettings] = React.useState({
    deliveryTime: '10-15 minutes',
    freeDeliveryThreshold: 199,
    deliveryFee: 25,
    gstPercentage: 5,
    handlingFee: 2,
    platformFee: 0,
    cancellationPolicyTitle: 'Cancellation Policy',
    cancellationPolicyText: 'Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.'
  });

  React.useEffect(() => {
    fetch('http://localhost:5000/api/settings')
      .then(res => res.json())
      .then(data => setSettings(prev => ({...prev, ...data})))
      .catch(err => console.error(err));
  }, []);

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = itemTotal > 0 && itemTotal < settings.freeDeliveryThreshold ? settings.deliveryFee : 0;
  const handlingFee = itemTotal > 0 ? settings.handlingFee : 0;
  const platformFee = itemTotal > 0 ? settings.platformFee : 0;
  const gst = Math.round(itemTotal * (settings.gstPercentage / 100));
  const grandTotal = itemTotal > 0 ? itemTotal + deliveryFee + handlingFee + platformFee + gst : 0;

  if (cart.length === 0) {
    return (
      <div className="cart-empty-page" style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
        <h2>Your cart is empty</h2>
        <p style={{ color: '#666', marginTop: '10px', marginBottom: '20px' }}>Looks like you haven't added anything yet.</p>
        <button 
          onClick={() => navigate('/user/home')}
          style={{ background: '#0c831f', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page-container" style={{ padding: '0 0 80px 0', background: '#f5f7fa', minHeight: '100vh' }}>
      <div className="cart-header" style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '16px', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ margin: 0, fontSize: '18px' }}>Checkout</h2>
      </div>

      <div className="cart-content" style={{ padding: '16px' }}>
        {/* Items Section */}
        <div className="cart-section" style={{ background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
            <Clock size={18} color="#0c831f" />
            <h3 style={{ margin: 0, fontSize: '15px' }}>Delivery in {settings.deliveryTime}</h3>
          </div>

          <div className="cart-items-list">
            {cart.map(item => (
              <div key={item.id} className="cart-item" style={{ display: 'flex', gap: '12px', marginBottom: '16px', alignItems: 'flex-start' }}>
                <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#333' }}>{item.title}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{item.weight}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>₹{item.price}</span>
                    <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', background: '#0c831f', borderRadius: '6px', overflow: 'hidden' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>-</button>
                      <span style={{ color: '#fff', width: '20px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Details Section */}
        <div className="cart-section" style={{ background: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} /> Bill Details
          </h3>
          
          <div className="bill-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#444' }}>
            <span>Item Total</span>
            <span>₹{itemTotal}</span>
          </div>
          <div className="bill-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#444' }}>
            <span>Delivery Fee {deliveryFee === 0 && <span style={{ color: '#0c831f', fontSize: '12px', marginLeft: '4px' }}>(Free over ₹{settings.freeDeliveryThreshold})</span>}</span>
            <span>{deliveryFee > 0 ? `₹${deliveryFee}` : <span style={{ color: '#0c831f' }}>FREE</span>}</span>
          </div>
          <div className="bill-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#444' }}>
            <span>Handling Fee</span>
            <span>₹{handlingFee}</span>
          </div>
          {settings.platformFee > 0 && (
            <div className="bill-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#444' }}>
              <span>Platform Fee</span>
              <span>₹{settings.platformFee}</span>
            </div>
          )}
          <div className="bill-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#444' }}>
            <span>GST ({settings.gstPercentage}%)</span>
            <span>₹{gst}</span>
          </div>
          
          <div style={{ borderTop: '1px dashed #ccc', margin: '12px 0' }}></div>
          
          <div className="bill-row total" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '16px', color: '#111' }}>
            <span>To Pay</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="cart-section" style={{ background: '#fff', borderRadius: '12px', padding: '16px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#0c831f" /> {settings.cancellationPolicyTitle}
          </h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#666', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
            {settings.cancellationPolicyText}
          </p>
        </div>
      </div>

      {/* Fixed Checkout Bar */}
      <div className="checkout-bar" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', padding: '16px', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
        <div>
          <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>To Pay</p>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>₹{grandTotal}</h3>
        </div>
        <button 
          onClick={() => {
            navigate('/user/payment');
          }}
          style={{ background: '#0c831f', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '999px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CartPage;
