import { ITodo } from './todo';

export interface ITodosState {
	todosArr: ITodo[];
	idsArr: [];
  }

  export interface IUserState {
	userId: string;
	email: string;
  }

  export interface IFilterState {
	activeFilter: string;
  }

  export type IRootState = {
	todos: ITodosState;
	filter: IFilterState;
	user: IUserState;
  };