import React, { useState, useEffect } from 'react';
import { SUBCATEGORIES, PRODUCTS } from '../data';
import ProductCard from './ProductCard';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = ({ activeCategory, setActiveCategory, onProductSelect }) => {
  const subCats = SUBCATEGORIES[activeCategory] || [];
  const [activeSubCategory, setActiveSubCategory] = useState('');

  // Update active subcategory whenever activeCategory changes
  useEffect(() => {
    const newSubCats = SUBCATEGORIES[activeCategory] || [];
    if (newSubCats.length > 0) {
      setActiveSubCategory(newSubCats[0].name);
    } else {
      setActiveSubCategory('');
    }
  }, [activeCategory]);

  const filteredProducts = PRODUCTS.filter(
    (product) =>
      product.category === activeCategory &&
      (!activeSubCategory || product.subCategory === activeSubCategory)
  );

  return (
    <div className="category-page-container">
      {/* Header bar with Back button */}
      <div className="category-page-header">
        <button 
          className="back-home-btn" 
          onClick={() => setActiveCategory('All')}
          title="Back to Home"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="category-header-title-section">
          <h2 className="category-title">{activeCategory}</h2>
          <span className="items-count-badge">{filteredProducts.length} items available</span>
        </div>
      </div>

      <div className="category-page-content">
        {/* Left Subcategory Sidebar */}
        <aside className="subcategory-sidebar hide-scrollbar">
          {subCats.map((sub) => (
            <button
              key={sub.id}
              className={`subcategory-sidebar-item ${activeSubCategory === sub.name ? 'active' : ''}`}
              onClick={() => setActiveSubCategory(sub.name)}
            >
              <div className="subcat-img-wrapper">
                <img src={sub.image} alt={sub.name} className="subcat-img" />
              </div>
              <span className="subcat-name">{sub.name}</span>
            </button>
          ))}
          {subCats.length === 0 && (
            <div className="empty-subcategories">
              <p>No subcategories</p>
            </div>
          )}
        </aside>

        {/* Right Product Grid Area */}
        <main className="subcategory-products-area hide-scrollbar">
          <div className="subcategory-banner">
            <h3 className="subcategory-banner-title">{activeSubCategory || 'All Products'}</h3>
            <p className="subcategory-banner-subtitle">
              Fresh and handpicked items under {activeSubCategory || activeCategory}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="category-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onCardClick={onProductSelect} />
              ))}
            </div>
          ) : (
            <div className="category-no-products">
              <div className="no-items-illustration">📦</div>
              <p className="no-items-title">Restocking Soon!</p>
              <p className="no-items-desc">
                We are currently stocking up on fresh {activeSubCategory || activeCategory} products. Please check back in a few minutes!
              </p>
              <button className="browse-all-btn" onClick={() => setActiveCategory('All')}>
                Explore Other Categories
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
