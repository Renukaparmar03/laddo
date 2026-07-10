import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FALLBACK_BANNERS = [
  {
    _id: '1',
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80",
    title: "Get 50% OFF",
    desc: "On your first grocery order",
    btnText: "Shop Now",
    gradient: "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 75%)"
  },
  {
    _id: '2',
    image: "https://images.unsplash.com/photo-1604719312566-8fa20f162af6?w=1200&q=80",
    title: "Fresh Fruits",
    desc: "Farm fresh fruits delivered to you",
    btnText: "Explore Now",
    gradient: "linear-gradient(90deg, rgba(34, 197, 94, 0.7) 0%, transparent 75%)"
  },
  {
    _id: '3',
    image: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=1200&q=80",
    title: "Daily Essentials",
    desc: "Everything you need, everyday",
    btnText: "Order Now",
    gradient: "linear-gradient(90deg, rgba(59, 130, 246, 0.7) 0%, transparent 75%)"
  }
];

const HeroBanner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/banners/active');
        if (res.data && res.data.length > 0) {
          const homeBanners = res.data.filter(b => b.location === 'Home Page Top' || !b.location);
          
          // Flatten all images into individual slides
          const flattenedSlides = [];
          homeBanners.forEach(b => {
            if (b.images && b.images.length > 0) {
              b.images.forEach(imgUrl => {
                if (imgUrl.trim() !== '') {
                  flattenedSlides.push({ ...b, image: imgUrl });
                }
              });
            } else if (b.image) {
              flattenedSlides.push(b);
            }
          });
          
          setBanners(flattenedSlides.length > 0 ? flattenedSlides : FALLBACK_BANNERS);
        } else {
          setBanners(FALLBACK_BANNERS);
        }
      } catch (error) {
        console.error('Error fetching active banners:', error);
        setBanners(FALLBACK_BANNERS);
      }
    };
    
    // Fetch immediately on mount
    fetchBanners();

    // Auto-refresh banners every 30 seconds to reflect admin changes instantly
    const refreshInterval = setInterval(fetchBanners, 30000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3500); // Auto-slide every 3.5 seconds
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  return (
    <div className="hero-banner">
      <div className="banner-slider-container">
        <div
          className="banner-slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, idx) => (
            <div key={`${banner._id}-${idx}`} className="banner-slide">
              <img
                src={banner.image}
                alt={banner.title}
                className="banner-img"
              />
              <div className="banner-overlay" style={{ background: banner.gradient || "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, transparent 75%)" }}>
                <h2>{banner.title}</h2>
                {banner.desc && <p>{banner.desc}</p>}
                <button className="banner-btn">{banner.btnText || 'Shop Now'}</button>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Indicators / Dots */}
        {banners.length > 1 && (
          <div className="banner-dots">
            {banners.map((_, idx) => (
              <button
                key={idx}
                className={`banner-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;
