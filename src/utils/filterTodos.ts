import { FC } from 'react';
import { ITodo } from '../types/todo';

// interface IFilterTodos {
//   items: ITodo[] | ITodo;
//   activeFilter: string;
// }

const filterTodos = (items: ITodo[], activeFilter: string) => {
  switch (activeFilter) {
    case 'Active':
      return items.filter((item: ITodo) => !item.completed);
    case 'Completed':
      return items.filter((item: ITodo) => item.completed);
    default:
      return items;
  }
};

export default filterTodos;
