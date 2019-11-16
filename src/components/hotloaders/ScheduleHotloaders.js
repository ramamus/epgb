import React from 'react';
import { connect } from 'react-redux';
import { requestSchedules } from '../../ducks/schedule';

class ScheduleHotloader extends React.Component {
  render() {
    const { _requestSchedules } = this.props;
    _requestSchedules();
    return null;
  }
}

export default connect(
  null,
  dispatch => ({
    _requestSchedules: () => dispatch(requestSchedules())
  })
)(ScheduleHotloader);
