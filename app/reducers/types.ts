import { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export interface ICalyState {
  counter: number;
}

export interface Action {
  type: string;
}

export type GetState = () => ICalyState;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
