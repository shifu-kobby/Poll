import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { UserState, USER_FEATURE_KEY } from "../state/user.state";

export const getUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const getCurrentUser = createSelector(
  getUserState,
  (state: UserState) => {
      let newState = localStorage.getItem("currentUser");

      return newState? JSON.parse(newState): state.user;
  }
);
