import React, { Component } from 'react';
import styles from './LoginView.scss';
import { googleOAuthLogin } from '../../actions/loginActions';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import { push } from 'connected-react-router';

interface Props {
  startLogin: typeof googleOAuthLogin;
  push: typeof push;
  loading: boolean;
}

export default class LoginView extends Component<Props> {
  initiateGoogleLogin() {
    this.props.startLogin(() => {
      this.props.push('/calendar');
    });
  }
  render() {
    const { loading } = this.props;
    return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1>Caly</h1>
            <GoogleLoginButton
              loading={loading}
              onClick={this.initiateGoogleLogin.bind(this)}
            />
          </div>
        </div>
    );
  }
}
