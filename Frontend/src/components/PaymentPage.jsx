import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Wallet, Landmark, Banknote, ShieldCheck } from 'lucide-react';

const PaymentPage = ({ cart, navigate, setCart }) => {
  const [selectedMethod, setSelectedMethod] = useState('UPI');

  const paymentMethods = [
    { id: 'UPI', name: 'UPI', icon: <Landmark size={24} color="#0c831f" />, desc: 'Google Pay, PhonePe, Paytm' },
    { id: 'Card', name: 'Credit / Debit Card', icon: <CreditCard size={24} color="#333" />, desc: 'Visa, Mastercard, RuPay' },
    { id: 'Wallet', name: 'Wallets', icon: <Wallet size={24} color="#f59e0b" />, desc: 'Paytm, Amazon Pay, Mobikwik' },
    { id: 'COD', name: 'Cash on Delivery', icon: <Banknote size={24} color="#16a34a" />, desc: 'Pay at your doorstep' }
  ];

  const handlePayment = async () => {
    try {
      // Map cart to orderItems format expected by backend
      const orderItems = cart.map(item => ({
        product: item._id || item.id, // Fallback to id
        title: item.title,
        qty: item.quantity,
        image: item.image || item.images?.[0] || 'https://via.placeholder.com/150',
        price: item.price,
        seller: item.seller || item.sellerId || '000000000000000000000000'
      }));

      // Assuming we have a mock user logged in, use their ID or a dummy one
      const userInfoStr = localStorage.getItem('user_info');
      let userId = '000000000000000000000000';
      if (userInfoStr) {
        const userInfo = JSON.parse(userInfoStr);
        userId = userInfo._id || userInfo.id;
      }

      const payload = {
        orderItems,
        paymentMethod: selectedMethod,
        user: userId,
        shippingAddress: {
          address: '123 Default St',
          city: 'Mumbai',
          postalCode: '400001'
        }
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to create order');
      }

      const data = await res.json();
      
      // We get an array of created orders (split by seller)
      const mockOrderId = data && data.length > 0 ? data[0]._id.substring(0,8).toUpperCase() : 'ORD' + Math.floor(100000 + Math.random() * 900000);
      
      // Clear cart
      if (setCart) setCart([]);
      
      // Navigate to success page
      navigate('/user/order-success', { state: { orderId: mockOrderId, paymentMethod: selectedMethod } });
    } catch (err) {
      console.error(err);
      alert('Error placing order. Please try again.');
    }
  };

  return (
    <div className="payment-page" style={{ background: '#f5f7fa', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="header" style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '16px' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ margin: 0, fontSize: '18px' }}>Select Payment Method</h2>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          {paymentMethods.map((method, index) => (
            <div 
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                padding: '16px', 
                borderBottom: index !== paymentMethods.length - 1 ? '1px solid #f0f0f0' : 'none',
                background: selectedMethod === method.id ? '#f3f9f4' : '#fff',
                cursor: 'pointer'
              }}
            >
              <div style={{ marginRight: '16px' }}>{method.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1a1a1a' }}>{method.name}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{method.desc}</p>
              </div>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', 
                border: selectedMethod === method.id ? '6px solid #0c831f' : '2px solid #ccc',
                background: '#fff'
              }}></div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: '#666', fontSize: '12px' }}>
          <ShieldCheck size={16} color="#0c831f" />
          <span>100% Safe and Secure Payments</span>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', padding: '16px', boxShadow: '0 -2px 10px rgba(0,0,0,0.1)', zIndex: 100 }}>
        <button 
          onClick={handlePayment}
          style={{ width: '100%', background: '#0c831f', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          Pay & Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
