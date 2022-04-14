import './todoListItem.scss';

const TodoListItem = ({ id, text, completed, onCheck, onDelete }) => {

	let classNames = "todo-item";
    if (completed) {
        classNames += " checked completed";
    }

	return(
		<li key={id} data-id={id} className={classNames}>
			<button 
				className="todo-item-complete-btn" 
				data-complete="complete"
				onClick={onCheck}>
				<i className="fa-solid fa-circle-check"></i>
			</button>
			<div className="todo-item-wrapper">
				<div className="todo-item-wrapper-text">{text}</div>
				<input type="text" defaultValue={text} className="todo-item-wrapper-text-hidden"></input>
			</div>
			<button 
				className="todo-item-trash-btn" 
				data-trash="trash"
				onClick={onDelete}>
				<i className="fa-solid fa-circle-xmark"></i>
			</button>
		</li>
	)
}

export default TodoListItem;