import React, { Component } from 'react';
import styles from './LoginView.scss';
import { googleOAuthLogin } from '../../actions/loginActions';
import GoogleLoginButton from '../../components/GoogleLoginButton';

interface Props {
  startLogin: typeof googleOAuthLogin;
  loading: boolean;
}

export default class LoginView extends Component<Props> {
  initiateGoogleLogin() {
    this.props.startLogin((profile) => {
      console.log('GOT THE PROFILE IN THE COMPONENT');
      console.log(profile);
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
