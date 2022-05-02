import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { addAddress, changeRole, updateUser } from './actions';

export interface User {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  addresses: Address[];
  role: Role | undefined;
  teamMembers: string[];
}

export enum Role {
  Employee = 'employee',
  Manager = 'manager',
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
  role: undefined,
  teamMembers: [],
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
  }),
  on(changeRole, (state, { role }) => {
    return {
      ...state,
      role,
    };
  })
);

export const selectUser = createFeatureSelector<User>('user');
