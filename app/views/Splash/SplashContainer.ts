import { connect } from 'react-redux';
import SplashView from './SplashView';
import { Dispatch } from '../../reducers/types';
import { push } from 'connected-react-router';
import { Action, bindActionCreators } from 'redux';


const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  push,
}, dispatch);


export default connect(
    null,
    mapDispatchToProps,
)(SplashView);
