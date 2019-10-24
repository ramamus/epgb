import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

export const StyledChip = styled.span`
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 16px;
  margin-right: 25px;
  position: relative;
`;
StyledChip.displayName = 'StyledChip';

export const StyledChipValue = styled.span`
  display: inline-block;
  padding: 5px;
  padding-left: 10px;
  padding-right: 15px;
  border-radius: 10px 0 0 10px;
  cursor: default;
  font-weight: 300;
  &:hover {
    background-color: #28669f;
  }
`;
StyledChipValue.displayName = 'StyledChipValue';

export const StyledChipDeleteButton = styled.button`
  border: 0;
  border-radius: 0 10px 10px 0;
  padding-right: 10px;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: -20px;
  line-height: 0.5;
`;
StyledChipDeleteButton.displayName = 'StyledChipDeleteButton';

const SearchChip = ({ pill, onRemove }) => {
  const { id, name } = pill;
  return (
    <StyledChip key={id} className="search-term">
      <StyledChipValue className="btn-primary search-term-text">
        {name}
      </StyledChipValue>
      <StyledChipDeleteButton className="btn-primary" onClick={onRemove}>
        <FontAwesome className="remove-search-term" name="times-circle-o" />
      </StyledChipDeleteButton>
    </StyledChip>
  );
};

const SearchChips = ({ pills, onRemove }) => {
  return pills.map(pill => (
    <SearchChip key={pill.id} pill={pill} onRemove={() => onRemove(pill.id)} />
  ));
};

export default SearchChips;
