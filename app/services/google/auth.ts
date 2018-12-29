import { remote } from 'electron';
import { IGoogleService, IProfileResponse, ITokenResponse } from './service/interfaces/google';
import Config from '../../constants/config';
import { parse } from 'url';
import * as qs from 'qs';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify/types';
import { CalyDb, ProviderEnum, IProfile } from '../db/db';
import * as moment from 'moment';

@injectable()
export class GoogleAuth {
  @inject(TYPES.GoogleService)
  private googleService: IGoogleService;

  @inject(TYPES.CalyDb)
  private calyDb: CalyDb;

  async initiateGoogleSignin(): Promise<IProfile> {
    const code = await this.signInWithPopup();
    const tokens = await this.googleService.getAccessTokenFromCode(code);

    const googleProfile = await this.googleService.getProfile(tokens.access_token);

    // Save the profile to the DB
    const profile = await this.saveProfile(tokens, googleProfile);

    return profile;
  }

  private async saveProfile(token: ITokenResponse, profile: IProfileResponse) {
    const mappedProfile = {
      external_id: profile.id,
      email: profile.email,
      family_name: profile.family_name,
      gender: profile.gender,
      given_name: profile.given_name,
      locale: profile.locale,
      name: profile.name,
      picture: profile.picture,
      provider: ProviderEnum.Google,
    };

    const profileId = await this.calyDb.saveProfile(mappedProfile);
    await this.calyDb.saveToken({
      profile_id: profileId,
      access_token: token.access_token,
      expires_at: moment().add(token.expires_in - 10, 'seconds').toDate(),
      id_token: token.id_token,
      refresh_token: token.refresh_token,
      scope: token.scope,
    });

    return {
      id: profileId,
      ...mappedProfile,
    };
  }

  private signInWithPopup(): Promise<string | string[]> {
    return new Promise((resolve, reject) => {
      const authWindow = new remote.BrowserWindow({
        width: 500,
        height: 600,
        show: true,
      });

      // TODO: Generate and validate PKCE code_challenge value
      const urlParams = {
        response_type: 'code',
        redirect_uri: Config.Google.RedirectUri,
        client_id: Config.Google.ClientId,
        scope: Config.Google.RequestedScopes.join(' '),
      };

      const authUrl = `${Config.Google.AuthUrl}?${qs.stringify(urlParams)}`;

      function handleNavigation (url: string) {
        const query = parse(url, true).query;
        if (query) {
          if (query.error) {
            return reject(new Error(`There was an error: ${query.error}`));
          }
          if (query.code) {
            // Login is complete
            authWindow.removeAllListeners('closed');

            setImmediate(() => authWindow.close());

            // This is the authorization code we need to request tokens
            return resolve(query.code);
          }
        }
      }

      authWindow.on('closed', () => {
        reject('Window closed by user');
      });

      authWindow.webContents.on('will-navigate', (event, url) => {
        handleNavigation(url);
      });

      authWindow.loadURL(authUrl);
    });
  }
}

