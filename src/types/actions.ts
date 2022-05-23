import { IUserRecord } from './record';

export type StoreUserActions =
  | { type: 'SIGN_UP'; payload: IUserRecord }
  | { type: 'LOG_IN'; payload: IUserRecord }
  | { type: 'LOG_OUT' }
  | { type: 'LOAD_USER' };

export type StoreTodosActions =
  | { type: 'LOAD_TODOS' }
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'CHECK_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'UPDATE_TODO'; payload: { id: string; value: string } }
  | { type: 'TOGGLE_ALL' }
  | { type: 'CLEAR_COMPLETED' };
