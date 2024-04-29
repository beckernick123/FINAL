// src/components/SearchSortBar.jsx
import React from 'react';

const SearchSortBar = ({ searchQuery, setSearchQuery, setSortOrder }) => {
  return (
    <div className="search-sort-bar">
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="sort-buttons">
        <button onClick={() => setSortOrder('newest')} className="button">Newest</button>
        <button onClick={() => setSortOrder('most_popular')} className="button">Most Popular</button>
      </div>
    </div>
  );
};

export default SearchSortBar;
