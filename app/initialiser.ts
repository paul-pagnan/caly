import { inject, injectable } from 'inversify';
import { TYPES } from './inversify/types';
import { CalyDb } from './services/db/db';

@injectable()
export class Initialiser {
  @inject(TYPES.CalyDb)
  private calyDb: CalyDb;

  async init() {
    // Do everything here that needs to be done to bootstrap the app. The splash
    // screen will show until this is finished
    await this.calyDb.init();
  }
}
