import React from 'react';
import { User, Wallet, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">blink<span className="logo-accent">it</span></span>
        </div>
        
        <div className="header-actions">
          <div className="action-item location">
            <MapPin size={20} />
            <span className="action-label">New Delhi</span>
          </div>
          <div className="action-item wallet">
            <Wallet size={20} />
            <span className="action-label">₹500</span>
          </div>
          <div className="action-item profile">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
