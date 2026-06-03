import React, { useState } from 'react';
import { Heart, Star, Clock, Check, ShoppingCart } from 'lucide-react';

// Fallback shown when a product image URL is broken / unreachable
const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f0fdf4'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='60'%3E🛒%3C/text%3E%3C/svg%3E";

const ProductCard = ({ product, isOrderView, onCardClick, cart = [], setCart, navigate }) => {
  const [isReordered, setIsReordered] = useState(false);

  const cartItem = cart.find(item => item.id === product.id);
  const isInCart = !!cartItem;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (setCart) {
      setCart(prev => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (e, delta) => {
    e.stopPropagation();
    if (setCart) {
      setCart(prev => prev.map(item => {
        if (item.id === product.id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean));
    }
  };

  const handleReorder = (e) => {
    e.stopPropagation();
    setIsReordered(true);
    setTimeout(() => {
      setIsReordered(false);
    }, 2000);
  };

  return (
    <div className="product-card new-design" onClick={() => onCardClick && onCardClick(product)}>
      <div className="product-img-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-img"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
        />
        <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
          <Heart size={16} />
        </button>
        {product.isVeg !== undefined && (
          <div className={`veg-indicator ${product.isVeg ? 'veg' : 'non-veg'}`}>
            <div className="indicator-circle"></div>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="delivery-tag">
          <Clock size={12} />
          <span>{product.deliveryTime}</span>
        </div>
        
        <h4 className="product-title">{product.title}</h4>
        
        <div className="product-subtitle">
          {product.weight} • Fresh quality
        </div>
        
        <div className="card-divider"></div>
        
        <div className="price-rating-row">
          <div className="price-section">
            <span className="product-price">₹{product.price}</span>
            <span className="price-unit">per pack</span>
          </div>
          
          <div className="rating-section">
            <span className="rating-label">Rating</span>
            <div className="rating-value">
              <Star size={14} fill="#FFB800" color="#FFB800" />
              <span className="score">{product.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="product-footer">
          {isOrderView ? (
            <button 
              className={`reorder-btn full-width ${isReordered ? 'reordered' : ''}`}
              onClick={handleReorder}
            >
              {isReordered ? (
                <>
                  <Check size={16} style={{ marginRight: '6px' }} />
                  Reordered
                </>
              ) : (
                'Reorder'
              )}
            </button>
          ) : isInCart ? (
            <div className="quantity-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0c831f', borderRadius: '6px', height: '36px', padding: '0 8px', color: '#fff' }}>
              <button onClick={(e) => updateQuantity(e, -1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>-</button>
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{cartItem.quantity}</span>
              <button onClick={(e) => updateQuantity(e, 1)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', padding: '0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>+</button>
            </div>
          ) : (
            <button className="add-btn full-width" onClick={handleAddToCart}>
              <ShoppingCart size={16} style={{ marginRight: '6px' }} />
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
