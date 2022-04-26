import { createAction, props } from '@ngrx/store';
import { User } from './reducers';

export const updateUser = createAction('Update User', props<{ user: User }>());
export const addAddress = createAction('Add Address');
