import { createAction, props } from '@ngrx/store';
import { Role, User } from './reducers';

export const updateUser = createAction('Update User', props<{ user: User }>());
export const addAddress = createAction('Add Address');
export const changeRole = createAction('Change Role', props<{ role: Role }>());
