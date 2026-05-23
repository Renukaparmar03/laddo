import React from 'react';
import { Home, ClipboardList, Grid, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab, activeCategory, setActiveCategory }) => {
  return (
    <nav className="bottom-nav">
      <button 
        className={`bottom-nav-item ${activeTab === 'home' && activeCategory === 'All' ? 'active' : ''}`}
        onClick={() => {
          setActiveTab('home');
          setActiveCategory && setActiveCategory('All');
        }}
      >
        <Home size={22} />
        <span>Home</span>
      </button>
      <button 
        className={`bottom-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
        onClick={() => setActiveTab('orders')}
      >
        <ClipboardList size={22} />
        <span>Orders</span>
      </button>
      <button 
        className={`bottom-nav-item ${activeTab === 'home' && activeCategory !== 'All' ? 'active' : ''}`}
        onClick={() => {
          setActiveTab('home');
          if (setActiveCategory && activeCategory === 'All') {
            setActiveCategory('Grocery & Kitchen');
          }
        }}
      >
        <Grid size={22} />
        <span>Categories</span>
      </button>
      <button 
        className={`bottom-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => {
          setActiveTab('profile');
        }}
      >
        <User size={22} />
        <span>Profile</span>
      </button>
    </nav>
  );
};

export default BottomNav;
