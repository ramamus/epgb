import React from 'react';
import { connect } from 'react-redux';
import { requestEvents } from '../../ducks/events';

class EventsHotloader extends React.Component {
  render() {
    const { _requestEvents } = this.props;
    _requestEvents();
    return null;
  }
}

export default connect(
  null,
  dispatch => ({
    _requestEvents: () => dispatch(requestEvents())
  })
)(EventsHotloader);
