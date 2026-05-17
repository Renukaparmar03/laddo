import React from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data';

const ProductGrid = () => {
  return (
    <section className="product-grid-section">
      <h3 className="section-title">Fresh Picks for You</h3>
      <div className="product-grid">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
