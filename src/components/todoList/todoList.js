import TodoListItem from '../todoListItem/todoListItem';
import './todoList.scss';

const TodoList = ({todosArr, filter, onCheck, onDelete}) => {

	const filterTodos = (items, filter) => {
		switch (filter) {
			case "active":
				return items.filter((item) => !item.completed);
			case "completed":
				return items.filter((item) => item.completed);
			default:
				return items;
		}
	}

	const todos = filterTodos(todosArr, filter).map((item) => {
		const { id, ...itemProps } = item;
		
		return(
			<TodoListItem
				key={id} 
				{...itemProps}
				onCheck={() => onCheck(id)}
				onDelete={() => onDelete(id)}
			/>
		)
	});

	return(
		<div className="todo-container">
			<ul className="todo-list">
				{todos}
			</ul>
		</div>
	)
}

export default TodoList;