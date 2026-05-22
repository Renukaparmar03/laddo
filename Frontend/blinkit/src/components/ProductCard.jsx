import React, { useState } from 'react';
import { Heart, Star, Clock, Check, ShoppingCart } from 'lucide-react';

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
    <div className="product-card new-design" onClick={() => onCardClick && onCardClick(product)}>
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.title} className="product-img" />
        <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
          <Heart size={16} />
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
          ) : (
            <button className="add-btn full-width" onClick={(e) => {
              e.stopPropagation();
            }}>
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
