export interface ITokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string;
}

export interface IProfileResponse {
  email: string;
  family_name: string;
  gender: string;
  given_name: string;
  hd: string;
  id: string;
  link: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}


export interface IGoogleService {
  getAccessTokenFromCode(code: string | string[]): Promise<ITokenResponse>;
  getProfile(accessToken: string): Promise<IProfileResponse>;
}

