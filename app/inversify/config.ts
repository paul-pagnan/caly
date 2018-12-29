import { Container } from 'inversify';
import { TYPES } from './types';
import { GoogleService } from '../services/google/service/google';
import { IGoogleService } from '../services/google/service/interfaces/google';
import { GoogleAuth } from '../services/google/auth';
import { CalyDb } from '../services/db/db';
import { Initialiser } from '../initialiser';
import Config from '../constants/config';

const container = new Container();
container.bind<Initialiser>(TYPES.Initialiser).to(Initialiser);

container.bind<IGoogleService>(TYPES.GoogleService).to(GoogleService);

container.bind<GoogleAuth>(TYPES.GoogleAuthService).to(GoogleAuth);
container.bind<CalyDb>(TYPES.CalyDb).to(CalyDb).inSingletonScope();

container.bind<string>(TYPES.DatabaseName).toConstantValue(Config.DbName);
container.bind<any>(TYPES.DatabaseOptions).toConstantValue({});

export { container };
