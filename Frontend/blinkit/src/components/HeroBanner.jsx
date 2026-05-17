import React from 'react';

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <div className="banner-content">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" 
          alt="Grocery Offer" 
          className="banner-img"
        />
        <div className="banner-overlay">
          <h2>Get 50% OFF</h2>
          <p>On your first grocery order</p>
          <button className="banner-btn">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
