import { GetState, Dispatch, Action } from '../reducers/types';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../reducers/counter';

export function increment(): Action {
  return {
    type: INCREMENT_COUNTER,
  };
}

export function decrement(): Action {
  return {
    type: DECREMENT_COUNTER,
  };
}

export function incrementIfOdd() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
