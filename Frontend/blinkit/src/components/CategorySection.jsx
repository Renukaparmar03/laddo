import React from 'react';
import { CATEGORIES } from '../data';

const CategorySection = () => {
  return (
    <section className="category-section">
      <h3 className="section-title">Shop by Category</h3>
      <div className="category-grid hide-scrollbar">
        {CATEGORIES.slice(1).map((cat) => (
          <div key={cat.id} className="category-card" style={{ backgroundColor: cat.color }}>
            <div className="category-img-wrapper">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="category-img"
              />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
