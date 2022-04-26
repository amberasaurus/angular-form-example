import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { addAddress, updateUser } from './actions';

export interface User {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  addresses: Address[];
}

export interface Address {
  street: string | undefined;
  city: string | undefined;
  state: string | undefined;
}

export interface AppState {
  user: User;
  otherDetails: any;
}

const initialUserState: User = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  addresses: [],
};

export const userReducer = createReducer(
  initialUserState,
  on(updateUser, (state, { user }) => {
    console.log(user);
    return {
      ...state,
      ...user,
    };
  }),
  on(addAddress, (state) => {
    const emptyAddress = {
      street: undefined,
      city: undefined,
      state: undefined,
    };
    return {
      ...state,
      addresses: [...state.addresses, emptyAddress],
    };
  })
);

export const selectUser = createFeatureSelector<User>('user');
