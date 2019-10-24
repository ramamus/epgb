import React, { Component } from 'react';
import PageSizeMenu from './PageSizeMenu';
import { Pagination } from 'react-bootstrap';

const PaginationWrapperStyling = {
  margin: 0,
  display: 'flex',
  float: 'right'
};

const paginationCounterStyling = {
  height: '33px',
  color: '#000000',
  fontSize: '14px',
  fontStyle: 'italic',
  fontWeight: '300',
  lineHeight: '15px',
  paddingRight: '10px'
};

export default class ListPagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paginatorItems: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      let paginatorItems = this.updatePaginatorItems(this.props);
      this.setState({ paginatorItems });
    }
  }

  updatePaginatorItems = props => {
    const { totalNumberOfPages, active, onPageNumberChanged } = props;
    let pageArray = Array.apply(null, { length: totalNumberOfPages }).map(
      Number.call,
      Number
    );
    return pageArray.map((_, i) => {
      if (active - 3 < i && i < active + 3) {
        return (
          <Pagination.Item
            active={active === i}
            onClick={() => {
              onPageNumberChanged(i);
            }}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
    });
  };

  render() {
    const {
      onPageSizeChanged,
      totalLength,
      toggleOpenState,
      setOpenStateToFalse,
      openPageSizeSelector,
      pageSize,
      startPageRow,
      endPageRow,
      totalNumberOfPages,
      active,
      onPageNumberChanged
    } = this.props;
    return (
      <div style={{ padding: '0 15px' }}>
        <PageSizeMenu
          onPageSizeChanged={onPageSizeChanged}
          total={totalLength}
          pageSize={pageSize}
          open={openPageSizeSelector}
          toggleOpenState={toggleOpenState}
          setOpenStateToFalse={setOpenStateToFalse}
          dropup={true}
        />
        <div className="pagination-wrapper" style={PaginationWrapperStyling}>
          <h4 className="pagination-counter" style={paginationCounterStyling}>
            Showing {startPageRow}-{endPageRow} of {totalLength}
          </h4>
          <Pagination bsSize="small" style={{ margin: '0' }}>
            <Pagination.First
              disabled={active === 0}
              onClick={() => onPageNumberChanged(0)}
            />
            <Pagination.Prev
              disabled={active === 0}
              onClick={() => active && onPageNumberChanged(active - 1)}
            />
            {this.state.paginatorItems}
            <Pagination.Next
              disabled={active === totalNumberOfPages - 1}
              onClick={() =>
                !(active === totalNumberOfPages - 1) &&
                onPageNumberChanged(active + 1)
              }
            />
            <Pagination.Last
              disabled={active === totalNumberOfPages - 1}
              onClick={() => onPageNumberChanged(totalNumberOfPages - 1)}
            />
          </Pagination>
        </div>
      </div>
    );
  }
}
