import React from 'react';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const FloatingCart = ({ cart, navigate }) => {
  if (!cart || cart.length === 0) return null;

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div 
      className="floating-cart-slide-up"
      style={{
        position: 'fixed',
        bottom: '80px', // above bottom nav
        left: '50%',
        transform: 'translateX(-50%)',
        width: '92%',
        maxWidth: '500px',
        backgroundColor: '#0c831f',
        color: '#fff',
        borderRadius: '16px', // Rounded look requested by user
        padding: '14px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2000, // Make sure it sits above other sticky footers (like ProductDetailPage)
        boxShadow: '0 8px 24px rgba(12, 131, 31, 0.4)',
        cursor: 'pointer'
      }}
      onClick={() => navigate('/user/cart')}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '6px', display: 'flex' }}>
          <ShoppingBag size={20} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </div>
          <div style={{ fontSize: '13px', opacity: 0.9 }}>
            ₹{totalPrice}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold', fontSize: '15px' }}>
        View Cart
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default FloatingCart;
