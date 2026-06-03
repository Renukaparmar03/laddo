import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import axios from 'axios';
import { CATEGORIES } from '../data';

const CategoryNav = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/categories');
        if (data && data.length > 0) {
          const allCat = { _id: 'all', name: 'All', icon: 'Store' };
          setCategories([allCat, ...data]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <nav className="category-nav hide-scrollbar">
      <div className="category-nav-inner">
        {categories.map((cat) => {
          const IconComponent = LucideIcons[cat.icon];
          return (
            <button
              key={cat._id || cat.id}
              className={`category-nav-item ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {IconComponent && <IconComponent size={14} className="nav-icon" />}
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default CategoryNav;
