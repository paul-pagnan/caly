import { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';
import { ILoginReducer } from './login';

export interface ICalyState {
  // The reducers go here
  login: ILoginReducer;
}

export interface Action<T> {
  type: string;
  payload?: T;
}

export type GetState = () => ICalyState;

export type Dispatch<T> = ReduxDispatch<Action<T>>;

export type Store<T> = ReduxStore<GetState, Action<T>>;
