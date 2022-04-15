import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/model';

export enum UserActions {
  Init = '[User] init',
  GetCurrentUser = '[User] get current user'
}

export const Init = createAction(UserActions.Init);

export const GetCurrentUser = createAction(
  UserActions.GetCurrentUser,
  props<{ payload: User }>()
);
