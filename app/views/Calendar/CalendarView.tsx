import React, { Component } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import styles from './CalendarView.scss';

interface Props {
}

export default class CalendarView extends Component<Props> {
  render() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.body}>
              <Sidebar />
            </div>
        </div>
    );
  }
}
