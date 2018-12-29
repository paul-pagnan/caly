import React from 'react';
import GoogleLogo from '../../resources/icons/google.svg';
import styles from './GoogleLoginButtonStyles.scss';

interface Props {
  loading: boolean;
  onClick: () => void;
}

const component = ({ loading, onClick }: Props) => {
  if (loading) {
    return (
      <a className={[styles.googleLogin, styles.disabled].join(' ')}>
        Signing in...
      </a>
    );
  }

  return (
    <a onClick={onClick} className={styles.googleLogin}>
      <img src={GoogleLogo} alt='Google logo' />
      Sign in with Google
    </a>
  );
};


component.defaultProps = {
  loading: false,
  onClick: () => {},
};

export default component;
