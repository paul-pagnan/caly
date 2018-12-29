import { LOGIN_ERROR, LOGIN_STARTED, LOGIN_SUCCESS, ILoginPayload } from '../reducers/login';
import { Dispatch } from '../reducers/types';
import { container } from '../inversify/config';
import { TYPES } from '../inversify/types';
import { GoogleAuth } from '../services/google/auth';
import { IProfileResponse } from 'app/services/google/service/interfaces/google';

export function googleOAuthLogin(
  onSuccess: (profile: IProfileResponse) => void,
  onError?: (err: Error) => void,
) {
  return async (dispatch: Dispatch<ILoginPayload>) => {
    dispatch({ type: LOGIN_STARTED });

    const googleAuth = container.get<GoogleAuth>(TYPES.GoogleAuthService);

    try {
      const profile = await googleAuth.initiateGoogleSignin();
      dispatch({ type: LOGIN_SUCCESS });
      if (onSuccess) {
        onSuccess(profile);
      }
    } catch (err) {
      dispatch({ type: LOGIN_ERROR, payload: { error: err } });
      if (onError) {
        onError(err);
      }
    }
  };
}
