import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { TYPES } from '../../inversify/types';
import { Initialiser } from '../../initialiser';
import { container } from '../../inversify/config';
import Routes from '../../constants/routes';

interface Props {
  push: typeof push;
  initialiser: Initialiser;
}

export default class SplashView extends Component<Props> {
  async componentDidMount() {
    const initialiser = container.get<Initialiser>(TYPES.Initialiser);
    await initialiser.init();


    const isLoggedIn = await initialiser.isLoggedIn();
    if (isLoggedIn) {
      return this.props.push(Routes.CALENDAR);
    }
    return this.props.push(Routes.LOGIN);
  }
  render() {
    return (
       <div>
           Splash Page...
        </div>
    );
  }
}
