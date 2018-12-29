import { remote } from 'electron';
import { IGoogleService } from './service/interfaces/google';
import Config from '../../constants/config';
import { parse } from 'url';
import qs from 'qs';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../inversify/types';

@injectable()
export class GoogleAuth {
  @inject(TYPES.GoogleService)
  private googleService: IGoogleService;

  async initiateGoogleSignin() {
    const code = await this.signInWithPopup();
    const tokens = await this.googleService.getAccessTokenFromCode(code);

    const profile = await this.googleService.getProfile(tokens.access_token);

    // await saveProfile(tokens, profile);
    console.log(profile);

    return profile;
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

