import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CATEGORIES } from '../data';

const CategorySection = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/categories');
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(CATEGORIES.slice(1)); // Fallback if DB is empty
        }
      } catch (error) {
        console.error('Error fetching categories from backend:', error);
        setCategories(CATEGORIES.slice(1)); // Fallback on error
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="category-section">
      <h3 className="section-title">Shop by Category</h3>
      <div className="category-grid hide-scrollbar">
        {categories.map((cat) => (
          <div 
            key={cat._id || cat.id} 
            className={`category-card ${activeCategory === cat.name ? 'active' : ''}`} 
            style={{ backgroundColor: cat.color }}
            onClick={() => setActiveCategory && setActiveCategory(cat.name)}
          >
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
