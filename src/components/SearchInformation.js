import React from 'react';
import SearchChips from './SearchChips';
import SearchResultCount from './SearchResultCount';

const defaultStyle = {
  marginBottom: '15px'
};

const SearchInformation = ({
  results,
  pills,
  onRemovePill,
  show = true,
  style
}) =>
  show && (
    <div
      className="hubble-search-information"
      data-testid="hubble-search-information"
      style={{ ...defaultStyle, ...style }}
    >
      <SearchChips pills={pills} onRemove={onRemovePill} />
      <SearchResultCount results={results} />
    </div>
  );

export default SearchInformation;
