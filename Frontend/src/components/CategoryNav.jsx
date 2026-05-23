import React from 'react';
import * as LucideIcons from 'lucide-react';
import { CATEGORIES } from '../data';

const CategoryNav = ({ activeCategory, setActiveCategory }) => {
  return (
    <nav className="category-nav hide-scrollbar">
      <div className="category-nav-inner">
        {CATEGORIES.map((cat) => {
          const IconComponent = LucideIcons[cat.icon];
          return (
            <button
              key={cat.id}
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
