import React from 'react';

const defaultStyle = {
  margin: '10px 15px',
  float: 'right',
  fontWeight: 500,
  color: '#5c5c5c'
};

const SearchResultCount = ({ results, style }) => (
  <div
    className="hubble-search-result-count"
    data-testid="hubble-search-result-count"
    style={{...defaultStyle, ...style}}
  >
    {results && results.length ? results.length : 0 } RESULTS
  </div>
);

export default SearchResultCount;
