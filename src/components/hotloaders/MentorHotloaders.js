import React from 'react';
import { connect } from 'react-redux';
import { requestmentors } from '../../ducks/mentor';

class MentorHotloader extends React.Component {
  render() {
    const { _requestmentors } = this.props;
    _requestmentors();
    return null;
  }
}

export default connect(
  null,
  dispatch => ({
    _requestmentors: () => dispatch(requestmentors())
  })
)(MentorHotloader);
