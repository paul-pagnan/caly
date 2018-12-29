import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Login from './views/Login/LoginContainer';
import Calendar from './views/Calendar/CalendarContainer';

export default () => (
  <App>
    <Switch>
      <Route path={routes.LOGIN} component={Login} />
      <Route path={routes.CALENDAR} component={Calendar} />
    </Switch>
  </App>
);
