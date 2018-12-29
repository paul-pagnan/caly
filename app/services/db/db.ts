import { injectable, inject, decorate } from 'inversify';
import Dexie from 'dexie';
import { TYPES } from '../../inversify/types';

export class CalyDb extends Dexie {
  private initialised = false;
  private profiles: Dexie.Table<IProfile, number>; // number = type of the primkey
  private tokens: Dexie.Table<IToken, number>;

  // These vars are injected from inversify at the bottom of this class.
  // Couldn't get the constructor decorators working with babel
  constructor(dbName: string, options?: any) {
    super(dbName, options);

    // For testing, the second argument of the parent constructor can be a fake
    // instance of indexedDb. See this post:
    // https://stackoverflow.com/questions/47934383/indexeddb-testing-with-jest-enzyme-referenceerror-indexeddb-is-not-defined
    this.version(1).stores({
      profiles: '++id, external_id, email, family_name, gender, given_name, locale, name, picture, provider',
      tokens: '++id, profile_id, access_token, expires_at, id_token, refresh_token, scope',
    });
  }

  async init() {
    this.profiles = this.table('profiles');
    this.tokens = this.table('tokens');
    this.initialised = true;
  }

  get isInitialised() {
    return this.initialised;
  }

  async saveProfile(profile: IProfile) {
    return this.transaction('rw', this.profiles, async () => {
      const existingProfile = await this.profiles
        .where('email')
        .equals(profile.email)
        .first();

      if (existingProfile && existingProfile.id) {
        return this.profiles.update(existingProfile.id, profile);
      }
      return this.profiles.add(profile);
    });
  }

  async saveToken(token: IToken) {
    if (!token.profile_id) throw new Error('Profile id must be provided');
    return this.transaction('rw', this.tokens, async () => {
      // delete existing tokens for this user
      await this.tokens
        .where('profile_id')
        .equals(token.profile_id)
        .delete();

      return await this.tokens.add(token);
    });
  }
}

decorate(injectable(), CalyDb);
decorate(injectable(), Dexie);
decorate(inject(TYPES.DatabaseName), CalyDb, 0);
decorate(inject(TYPES.DatabaseOptions), CalyDb, 1);

export enum ProviderEnum {
  Google = 'GOOGLE',
}

export interface IProfile {
  id?: number;
  external_id: string;
  email: string;
  family_name: string;
  gender: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  provider: ProviderEnum;
}

export interface IToken {
  id?: number;
  profile_id: number;
  access_token: string;
  expires_at: Date;
  id_token: string;
  refresh_token: string;
  scope: string;
}
