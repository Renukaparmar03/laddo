import React, { useState, useEffect } from 'react';

const BANNERS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    title: "Get 50% OFF",
    desc: "On your first grocery order",
    btnText: "Shop Now",
    gradient: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 75%)"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506617564039-2f3b650ad755?w=1200&q=80",
    title: "Super Fast Delivery",
    desc: "Fresh essentials in 10 minutes",
    btnText: "Order Now",
    gradient: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, transparent 75%)"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80",
    title: "Fresh Farm Produce",
    desc: "Up to 30% OFF on fresh vegetables",
    btnText: "Explore Fresh",
    gradient: "linear-gradient(90deg, rgba(0,0,0,0.75) 0%, transparent 75%)"
  }
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BANNERS.length);
    }, 3500); // Auto-slide every 3.5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-banner">
      <div className="banner-slider-container">
        <div 
          className="banner-slider-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div key={banner.id} className="banner-slide">
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="banner-img"
              />
              <div className="banner-overlay" style={{ background: banner.gradient }}>
                <h2>{banner.title}</h2>
                <p>{banner.desc}</p>
                <button className="banner-btn">{banner.btnText}</button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Slider Indicators / Dots */}
        <div className="banner-dots">
          {BANNERS.map((_, idx) => (
            <button
              key={idx}
              className={`banner-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
