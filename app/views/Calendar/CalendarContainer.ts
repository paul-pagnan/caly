import { connect } from 'react-redux';
import CalendarView from './CalendarView';
import { ICalyState } from '../../reducers/types';

function mapStateToProps(state: ICalyState) {
  return {
  };
}


export default connect(
  mapStateToProps,
)(CalendarView);
