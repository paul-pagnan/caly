import { Action } from './types';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_STARTED = 'LOGIN_STARTED';

export interface ILoginReducer {
  loading: boolean;
  error?: string;
}

export interface ILoginPayload {
  error?: string;
}

export default function login(state = {}, action: Action<ILoginPayload>) {
  switch (action.type) {
  case LOGIN_STARTED:
    return {
      loading: true,
    };
  case LOGIN_SUCCESS:
    return {
      loading: false,
    };
  case LOGIN_ERROR:
    return {
      loading: false,
      error: action.payload.error,
    };
  default:
    return state;
  }
}
