import { Action, createReducer, on } from '@ngrx/store';
import { initialUserState } from '../state/user.state';
import * as userActions from '../actions/user.actions';
import { User } from 'src/app/model';

export const userReducer = createReducer(
  initialUserState,
  on(userActions.Init, (state) => ({ ...state })),
  on(userActions.GetCurrentUser, (state, { payload }) => ({
    ...state,
    user: payload,
  }))
);

export function reducer(state: User | any, action: Action){
  return userReducer(state, action);
}
