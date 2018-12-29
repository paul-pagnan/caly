import { IGoogleService, IProfileResponse, ITokenResponse } from './interfaces/google';
import axios from 'axios';
import qs from 'qs';
import Config from '../../../constants/config';
import { injectable } from 'inversify';

@injectable()
export class GoogleService implements IGoogleService {
  getAccessTokenFromCode(code: string | string[]): Promise<ITokenResponse> {
    return this.queryPost('/oauth2/v4/token', {
      code,
      client_id: Config.Google.ClientId,
      redirect_uri: Config.Google.RedirectUri,
      grant_type: 'authorization_code',
    });
  }
  // private refreshAccessToken() {
  //   // return this.queryPost('/oauth2/v4/token', {
  //   //   code,
  //   //   client_id: Config.Google.ClientId,
  //   //   redirect_uri: Config.Google.RedirectUri,
  //   //   grant_type: 'authorization_code',
  //   // });
  // }
  async getProfile(accessToken: string): Promise<IProfileResponse> {
    return this.getRequest('/userinfo/v2/me', accessToken);
  }

  private async getRequest(url: string, accessToken: string) {
    const response = await axios.get(`${Config.Google.ApiUrl}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  private async queryPost(url: string, body: any) {
    const response = await axios.post(`${Config.Google.ApiUrl}${url}`,
      qs.stringify(body),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    return response.data;
  }
}
