import { connect } from 'react-redux';
import LoginView from './LoginView';
import { ICalyState, Dispatch } from '../../reducers/types';
import { Action, bindActionCreators } from 'redux';
import { googleOAuthLogin } from '../../actions/loginActions';

function mapStateToProps(state: ICalyState) {
  return {
    loading: state.login.loading,
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
  startLogin: googleOAuthLogin,
}, dispatch);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginView);
