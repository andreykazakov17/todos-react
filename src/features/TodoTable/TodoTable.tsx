import React, { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ITodo } from 'types/todo';
import TodoTableRow from 'components/TodoTableRow/TodoTableRow';
import Modal from 'components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';

const StyledTable = styled.table`
  width: 70%;
  margin: 0 auto;
  margin-bottom: 20px;
  border: 15px solid #f2f8f8;
  border-top: 5px solid #f2f8f8;
  border-collapse: collapse;
`;

const StyledTH = styled.th`
  text-align: left;
  font-weight: bold;
  padding: 5px;
  background: #f2f8f8;
  border: none;
  border-bottom: 5px solid #f2f8f8;
`;

const StyledWrapper = styled.div`
  position: relative;
  height: 350px;
`;

interface ITodos {
  todos: ITodo[];
}

const Table = memo(({ todos }: ITodos) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [todoToRemove, setTodoToRemove] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [todosPerPage] = useState<number>(5);

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDeleteTodo = useCallback(() => {
    dispatch({ type: 'DELETE_TODO', payload: todoToRemove });
  }, [todoToRemove]);

  const onDelete = useCallback((id: string | null) => {
    setIsOpen(true);
    setTodoToRemove(id);
  }, []);

  const onDiscardClick = () => setTodoToRemove(null);
  const onClose = () => setIsOpen(false);

  return (
    <StyledWrapper>
      <StyledTable>
        <thead>
          <tr>
            <StyledTH>Text</StyledTH>
            <StyledTH>Completed</StyledTH>
            <StyledTH>User ID</StyledTH>
            <StyledTH>Actions</StyledTH>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map((item) => (
            <TodoTableRow
              key={item.id}
              id={item.id}
              text={item.text}
              completed={item.completed}
              user={item.user}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </StyledTable>
      <Modal
        isOpen={isOpen}
        title="Are you sure want to delete this item?"
        onClose={onClose}
        onConfirmClick={handleDeleteTodo}
        onDiscardClick={onDiscardClick}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={todosPerPage}
        itemsLength={todos.length}
        paginate={paginate}
      />
    </StyledWrapper>
  );
});
export default Table;
