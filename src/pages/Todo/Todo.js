import React, { useState } from 'react';

import TodoForm from '../../features/TodoForm/TodoForm';
import TodoList from '../../features/TodoList/TodoList';
import FilterPanel from '../../features/FilterPanel/FilterPanel';

import './Todo.scss';

const App = () => {
  const [todosArr, updateTodosArr] = useState([]);
  const [filter, setFilter] = useState('All');

  const checkTodo = (id) => {
    updateTodosArr(
      todosArr.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  const deleteTodo = (id) => {
    updateTodosArr(todosArr.filter((todo) => todo.id !== id));
  };

  const toggleAllTodos = () => {
    const everyUnchecked = todosArr.every((item) => !item.completed);
    const someChecked = todosArr.some((item) => item.completed);
    const everyChecked = todosArr.every((item) => item.completed);

    if (everyChecked) {
      updateTodosArr(todosArr.map((item) => ({ ...item, completed: false })));
      return;
    }

    if (everyUnchecked || someChecked) {
      updateTodosArr(todosArr.map((item) => ({ ...item, completed: true })));
    }
  };

  const onAddTodo = (text) => {
    if (!text) return;

    const newTodo = {
      text,
      completed: false,
      id: new Date().getTime(),
    };

    updateTodosArr([...todosArr, newTodo]);
  };

  const updateTodo = (id, text) => {
    updateTodosArr(
      todosArr.map((item) => {
        if (item.id === id) {
          return { ...item, text };
        }
        return item;
      }),
    );
  };

  const setActiveFilter = (value) => {
    setFilter(value);
  };

  const clearCompleted = () => {
    updateTodosArr(todosArr.filter((item) => !item.completed));
  };

  return (
    <div className="todos-body">
      <h1 className="todos-title">todos</h1>
      <TodoForm onAddTodo={onAddTodo} toggleAllTodos={toggleAllTodos} />
      <TodoList
        todosArr={todosArr}
        filter={filter}
        onCheck={checkTodo}
        onDelete={deleteTodo}
        updateTodo={updateTodo}
      />
      <FilterPanel
        todosArr={todosArr}
        activeFilter={filter}
        onFilters={setActiveFilter}
        clearCompleted={clearCompleted}
      />
    </div>
  );
};

export default App;
