import React from 'react';
import { Search, Mic } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder='Search "milk"' 
          className="search-input"
        />
        <Mic className="mic-icon" size={20} />
      </div>
    </div>
  );
};

export default SearchBar;
