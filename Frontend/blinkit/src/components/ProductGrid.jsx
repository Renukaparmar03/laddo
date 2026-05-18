import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data';

const ProductGrid = ({ activeCategory }) => {
  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(product => product.category === activeCategory);

  return (
    <section className="product-grid-section">
      <h3 className="section-title">
        {activeCategory === 'All' ? 'Fresh Picks for You' : `${activeCategory}`}
      </h3>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products-container">
          <p className="no-products-text">No products found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
