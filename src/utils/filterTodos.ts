import { FC } from 'react';
import { ITodo } from '../types/todo';

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
