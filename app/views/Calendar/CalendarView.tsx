import React, { Component } from 'react';
import { Link } from 'react-router-dom';

interface Props {
}

export default class CalendarView extends Component<Props> {
  render() {
    return (
        <div>
            THis is the calendar page
            <Link to={'/login'}>Back to login</Link>
        </div>
    );
  }
}
