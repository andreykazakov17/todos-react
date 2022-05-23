import { ITodo } from '../types/todo';

const filterTodos = (items: ITodo[], filter: string) => {
  switch (filter) {
    case 'Active':
      return items.filter((item) => !item.completed);
    case 'Completed':
      return items.filter((item) => item.completed);
    default:
      return items;
  }
};

export default filterTodos;
