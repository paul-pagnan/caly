import { Container } from 'inversify';
import { TYPES } from './types';
import { GoogleService } from '../services/google/service/google';
import { IGoogleService } from '../services/google/service/interfaces/google';
import { GoogleAuth } from '../services/google/auth';

const container = new Container();

container.bind<IGoogleService>(TYPES.GoogleService).to(GoogleService);

container.bind<GoogleAuth>(TYPES.GoogleAuthService).to(GoogleAuth);

export { container };
