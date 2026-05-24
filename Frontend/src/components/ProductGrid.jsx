import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ activeCategory, onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        
        // Map backend product model to frontend expected format
        const formattedData = data.map(item => ({
          ...item,
          id: item._id, // map _id to id for existing components
          title: item.name, // map name to title
        }));
        
        setProducts(formattedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(product => product.category === activeCategory);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading products...</div>;
  }

  return (
    <section className="product-grid-section">
      <h3 className="section-title">
        {activeCategory === 'All' ? 'Fresh Picks for You' : `${activeCategory}`}
      </h3>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onCardClick={onProductSelect} />
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
