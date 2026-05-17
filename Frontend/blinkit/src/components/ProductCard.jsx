import React from 'react';
import { Heart, Star, Clock } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.title} className="product-img" />
        <button className="wishlist-btn">
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
          <button className="add-btn">ADD</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
