import React from 'react';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import ProductCard from './ProductCard';
import './WishlistPage.css';

const WishlistPage = ({ wishlist, setWishlist, setCart, onProductSelect, navigate, setActiveTab }) => {
  const handleBackToHome = () => {
    setActiveTab('profile'); // The user came from Profile usually, or we can just navigate back to profile
  };

  const clearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      setWishlist([]);
    }
  };

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <button className="back-btn" onClick={handleBackToHome}>
          <ArrowLeft size={24} />
        </button>
        <h2>Your Wishlist</h2>
        {wishlist.length > 0 && (
          <button className="clear-btn" onClick={clearWishlist}>
            <Trash2 size={20} />
          </button>
        )}
      </div>

      <div className="wishlist-content">
        {wishlist.length === 0 ? (
          <div className="empty-wishlist">
            <Heart size={64} color="#ccc" className="empty-icon" />
            <h3>Your wishlist is empty</h3>
            <p>Save items you like in your wishlist to review them later.</p>
            <button className="btn-primary start-shopping" onClick={() => setActiveTab('home')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(product => (
              <div key={product.id} className="wishlist-item">
                <ProductCard 
                  product={product} 
                  cart={[]} // Pass empty or actual cart if we want Add to Cart to reflect state
                  setCart={setCart} 
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  onCardClick={onProductSelect}
                  navigate={navigate}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
