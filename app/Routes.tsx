import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import Login from './views/Login/LoginContainer';
import Calendar from './views/Calendar/CalendarContainer';
import Splash from './views/Splash/SplashContainer';

export default class Routes extends Component {
  render() {
    return (
      <App>
        <Switch>
          <Route path={routes.LOGIN} component={Login} />
          <Route path={routes.CALENDAR} component={Calendar} />
          <Route path={routes.SPLASH} component={Splash} />
        </Switch>
      </App>
    );
  }
}
