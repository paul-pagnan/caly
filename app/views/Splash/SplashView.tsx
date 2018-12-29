import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { TYPES } from '../../inversify/types';
import { Initialiser } from '../../initialiser';
import { container } from '../../inversify/config';

interface Props {
  push: typeof push;
  initialiser: Initialiser;
}

export default class SplashView extends Component<Props> {
  async componentDidMount() {
    const initialiser = container.get<Initialiser>(TYPES.Initialiser);
    await initialiser.init();

    // TODO: check if we are currently logged in
    this.props.push('/login');
  }
  render() {
    return (
       <div>
           Splash Page...
        </div>
    );
  }
}
