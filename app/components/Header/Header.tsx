import React from 'react';
import styles from './HeaderStyles.scss';

interface Props {
}

export default function Header(props: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        account picker
      </div>
      <div className={styles.mainSection}>
        December 2018
      </div>
      <div className={styles.rightSection}>
        settings
      </div>
    </div>
  );
}
