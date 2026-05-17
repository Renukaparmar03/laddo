import React from 'react';
import { Home, ClipboardList, Grid, User } from 'lucide-react';

const BottomNav = () => {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-item active">
        <Home size={22} />
        <span>Home</span>
      </div>
      <div className="bottom-nav-item">
        <ClipboardList size={22} />
        <span>Orders</span>
      </div>
      <div className="bottom-nav-item">
        <Grid size={22} />
        <span>Categories</span>
      </div>
      <div className="bottom-nav-item">
        <User size={22} />
        <span>Profile</span>
      </div>
    </nav>
  );
};

export default BottomNav;
