// src/components/Search.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState(new URLSearchParams(location.search).get('search') || '');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('search', query);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [query, navigate, location]);

  const handleSearch = () => {
    const params = new URLSearchParams(location.search);
    params.set('search', query);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name"
        style={{
          flex: '1',
          padding: '8px 12px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px',
          width: '200px',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: '#004AAD',
          border: 'none',
          color: '#fff',
          borderRadius: '4px',
          padding: '8px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
