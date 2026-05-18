import React, { useState } from 'react';
import { Heart, Star, Clock, Check } from 'lucide-react';

const ProductCard = ({ product, isOrderView, onCardClick }) => {
  const [isReordered, setIsReordered] = useState(false);

  const handleReorder = (e) => {
    e.stopPropagation();
    setIsReordered(true);
    setTimeout(() => {
      setIsReordered(false);
    }, 2000);
  };

  return (
    <div className="product-card" onClick={() => onCardClick && onCardClick(product)}>
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.title} className="product-img" />
        <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
          <Heart size={18} />
        </button>
        <div className={`veg-indicator ${product.isVeg ? 'veg' : 'non-veg'}`}>
          <div className="indicator-circle"></div>
        </div>
      </div>
      
      <div className="product-info">
        <div className="delivery-tag">
          <Clock size={12} />
          <span>{product.deliveryTime}</span>
        </div>
        
        <h4 className="product-title">{product.title}</h4>
        
        <div className="product-meta">
          <span className="product-weight">{product.weight}</span>
          <div className="product-rating">
            <Star size={14} fill="#FFD700" color="#FFD700" />
            <span>{product.rating}</span>
          </div>
        </div>
        
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          {isOrderView ? (
            <button 
              className={`reorder-btn ${isReordered ? 'reordered' : ''}`}
              onClick={handleReorder}
            >
              {isReordered ? (
                <>
                  <Check size={12} style={{ marginRight: '2px' }} />
                  Reordered
                </>
              ) : (
                'Reorder'
              )}
            </button>
          ) : (
            <button className="add-btn" onClick={(e) => {
              e.stopPropagation();
              // Prevent detail trigger when clicking ADD
            }}>ADD</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
