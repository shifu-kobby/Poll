import { User } from "src/app/model";

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  user: User;
}

export const initialUserState: UserState = {
  user: {
    userId: 0,
    email: "",
    firstName: "",
    lastName: "",
    passwords: "",
    polls: [],
    userName: ""
  }
}
