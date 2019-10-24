import React from 'react';
import VerticalToggle from './VerticalToggle';
import VerticalMenu from './VerticalMenu';
// import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';
import { MenuItem, Dropdown } from 'react-bootstrap';

const PageSizeMenu = props => {
  const {
    open,
    toggleOpenState,
    setOpenStateToFalse,
    onPageSizeChanged,
    pageSize,
    total,
    dropup
  } = props;
  return (
    // <RootCloseWrapper onRootClose={setOpenStateToFalse}>
    <Dropdown
      id="dropdown-custom-menu"
      open={open}
      onToggle={toggleOpenState}
      dropup={dropup || false}
    >
      <VerticalToggle
        bsRole="toggle"
        iconName={dropup ? 'angle-up' : 'angle-down'}
        iconSize="15px"
        color="#2E71A9"
        text={`View ${pageSize} per Page`}
        textSize="14px"
      />
      <VerticalMenu bsRole="menu">
        <MenuItem
          eventKey="View 10 per Page"
          onSelect={() => onPageSizeChanged(10)}
        >
          View 10 per Page
        </MenuItem>
        <MenuItem
          eventKey="View 20 per Page"
          onSelect={() => onPageSizeChanged(20)}
        >
          View 20 per Page
        </MenuItem>
        <MenuItem
          eventKey="View 50 per Page"
          onSelect={() => onPageSizeChanged(50)}
        >
          View 50 per Page
        </MenuItem>
        <MenuItem
          eventKey="View 250 per Page"
          onSelect={() => onPageSizeChanged(250)}
        >
          View 250 per Page
        </MenuItem>
        <MenuItem eventKey="View All" onSelect={() => onPageSizeChanged(total)}>
          View All
        </MenuItem>
      </VerticalMenu>
    </Dropdown>
    // </RootCloseWrapper>
  );
};
export default PageSizeMenu;
