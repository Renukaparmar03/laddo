import React, { useState } from 'react';
import { ArrowLeft, Heart, Search, Share2, Star, Clock, Check, ChevronRight, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';

const ProductDetailPage = ({ product, onBack, onSelectProduct }) => {
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Generate Unit Options based on the product
  const unitOptions = [
    {
      unit: product.weight,
      price: product.price,
      mrp: Math.round(product.price * 1.2),
    },
    {
      unit: `2 x ${product.weight}`,
      price: Math.round(product.price * 1.8),
      mrp: Math.round(product.price * 2.4),
    }
  ];

  const activeUnit = unitOptions[selectedUnitIndex];

  // Filter top products in this category
  const relatedProducts = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 5);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} on RR Mart!`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="product-detail-page">
      {/* Sticky Top Header */}
      <header className="detail-header">
        <button className="detail-header-btn" onClick={onBack} aria-label="Go Back">
          <ArrowLeft size={22} />
        </button>
        <div className="detail-header-right">
          <button 
            className={`detail-header-btn wishlist-btn-detail ${isWishlisted ? 'active' : ''}`}
            onClick={() => setIsWishlisted(!isWishlisted)}
            aria-label="Wishlist"
          >
            <Heart size={20} fill={isWishlisted ? "#ef4444" : "none"} color={isWishlisted ? "#ef4444" : "#1a1a1a"} />
          </button>
          <button className="detail-header-btn" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="detail-header-btn" onClick={handleShare} aria-label="Share">
            <Share2 size={20} />
          </button>
        </div>
      </header>

      {/* Product Image Section */}
      <div className="detail-img-section">
        <img src={product.image} alt={product.title} className="detail-img" />
        <div className="detail-img-dots">
          <span className="detail-dot active"></span>
          <span className="detail-dot"></span>
          <span className="detail-dot"></span>
        </div>
      </div>

      {/* Main Info Container */}
      <div className="detail-body-container">
        
        {/* Description Tag Info Box */}
        <div className="detail-info-card description-banner">
          <div className="description-text-col">
            <span className="desc-badge">Description</span>
            <p className="desc-snippet">
              Potatoes can be included in your daily meals. They are rich in vitamins, minerals, and healthy carbohydrates, sourced fresh directly from organic farms.
            </p>
          </div>
          <button className="view-details-btn">
            View details
          </button>
        </div>

        {/* Product Title and Delivery Tag */}
        <div className="detail-info-card main-info-card">
          <div className="detail-delivery-tag">
            <Clock size={12} />
            <span>{product.deliveryTime || '16 mins'}</span>
          </div>
          
          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating-meta">
            <div className="rating-badge">
              <Star size={12} fill="#FFD700" color="#FFD700" />
              <span>{product.rating}</span>
            </div>
            <span className="veg-indicator-text">
              <span className={`veg-dot ${product.isVeg ? 'veg' : 'non-veg'}`}></span>
              {product.isVeg ? '100% Vegetarian' : 'Non-Vegetarian'}
            </span>
          </div>
        </div>

        {/* Select Unit Options */}
        <div className="detail-info-card unit-section">
          <h3>Select Unit</h3>
          <div className="unit-options-grid">
            {unitOptions.map((option, index) => (
              <div 
                key={index} 
                className={`unit-option-card ${selectedUnitIndex === index ? 'active' : ''}`}
                onClick={() => setSelectedUnitIndex(index)}
              >
                <div className="unit-card-header">
                  <span className="unit-weight-label">{option.unit}</span>
                  {selectedUnitIndex === index && (
                    <span className="check-badge-active">
                      <Check size={10} color="#fff" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <div className="unit-card-pricing">
                  <div className="price-inline">
                    <span className="unit-price-label">₹{option.price}</span>
                    <span className="unit-mrp-label">MRP ₹{option.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 48 Hours Replacement Policy */}
        <div className="detail-info-card replacement-banner">
          <div className="replacement-icon">
            <ShieldCheck size={20} color="#0c831f" />
          </div>
          <div className="replacement-text">
            <h4>48 Hours Replacement</h4>
            <p>Direct refund or replacement if quality is not satisfactory.</p>
          </div>
          <ChevronRight size={18} color="#666" />
        </div>

        {/* Related / Top Products */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <h3 className="related-section-title">Top products in this category</h3>
            <div className="related-products-row hide-scrollbar">
              {relatedProducts.map(p => (
                <div key={p.id} className="related-card-wrapper" onClick={() => {
                  onSelectProduct(p);
                  setSelectedUnitIndex(0);
                  setAddedToCart(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Actions Bar */}
      <footer className="detail-sticky-footer">
        <div className="footer-price-info">
          <span className="footer-weight">{activeUnit.unit}</span>
          <div className="footer-price-row">
            <span className="footer-price">₹{activeUnit.price}</span>
            <span className="footer-mrp">MRP ₹{activeUnit.mrp}</span>
          </div>
          <p className="footer-tax-label">Inclusive of all taxes</p>
        </div>

        <button 
          className={`footer-add-btn ${addedToCart ? 'added' : ''}`}
          onClick={() => {
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
          }}
        >
          {addedToCart ? (
            <>
              <Check size={16} style={{ marginRight: '6px' }} />
              Added to cart
            </>
          ) : (
            'Add to cart'
          )}
        </button>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
