import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data';
import { RefreshCw, Sparkles, ShoppingBag } from 'lucide-react';

const OrdersPage = ({ onProductSelect }) => {
  // Mock ordered items (customer's past order history)
  const orderedProducts = PRODUCTS.filter(p => [101, 103, 105, 108].includes(p.id));

  return (
    <div className="orders-page">
      {/* Reordering Banner */}
      <div className="reorder-banner">
        <div className="banner-glow"></div>
        <div className="reorder-banner-content">
          <div className="reorder-icon-wrapper">
            <RefreshCw size={24} className="reorder-spin-icon" />
          </div>
          <div className="reorder-text-content">
            <h2>reordering will be easy</h2>
            <p>Get your favorite essentials delivered in one click</p>
          </div>
          <div className="banner-sparkle">
            <Sparkles size={20} fill="#fff" color="#fff" />
          </div>
        </div>
      </div>

      {/* Past Orders Section */}
      <section className="past-orders-section">
        <div className="orders-section-header">
          <ShoppingBag size={18} className="orders-section-icon" />
          <h3 className="section-title">Your Past Ordered Items</h3>
        </div>
        <div className="product-grid">
          {orderedProducts.map(product => (
            <ProductCard key={product.id} product={product} isOrderView={true} onCardClick={onProductSelect} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;
