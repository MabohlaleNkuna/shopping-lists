// src/components/Sorting.js
import React from 'react';

const Sorting = ({ sortOption, setSortOption }) => {
  return (
    <div className="sorting-container" style={{ marginBottom: '20px' }}>
      <label htmlFor="sort" style={{ marginRight: '10px' }}>Sort by:</label>
      <select
        id="sort"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      >
        <option value="">Default</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="category-asc">Category (A-Z)</option>
        <option value="category-desc">Category (Z-A)</option>
        <option value="date-asc">Date (Old to New)</option>
        <option value="date-desc">Date (New to Old)</option>
      </select>
    </div>
  );
};

export default Sorting;
