import TodoListItem from '../TodoListItem/TodoListItem';
import filterTodos from '../../utils/filterTodos';
import './TodoList.scss';

const TodoList = ({todosArr, filter, onCheck, onDelete, updateTodo}) => {

	return(
		<div className="todo-container">
			<ul className="todo-list">
				{
					filterTodos(todosArr, filter).map((item) => {
						const { id, ...itemProps } = item;
						
						return(
							<TodoListItem
								key={id}
								id={id}
								{...itemProps}
								onCheck={() => onCheck(id)}
								onDelete={() => onDelete(id)}
								updateTodo={updateTodo}
							/>
						)
					})
				}
			</ul>
		</div>
	)
}

export default TodoList;