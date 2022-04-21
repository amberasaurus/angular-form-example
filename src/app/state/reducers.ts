import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { updateUser } from './actions';

export interface User {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

export interface AppState {
  user: User;
  otherDetails: any;
}

const initialState = { user: {} };

export const userReducer = createReducer(
  initialState,
  on(updateUser, (state, { user }) => {
    console.log(user);
    return {
      ...state,
      ...user,
    };
  })
);

export const selectUser = createFeatureSelector<User>('user');
