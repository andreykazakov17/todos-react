import { Component } from 'react';

import Button from '../../components/Button/Button';
import ListItemInput from '../../components/ListItemInput/ListItemInput';

import './TodoListItem.scss';

class TodoListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isActiveInput: false
		}
	}

	setActiveInput() {
		this.setState({
			isActiveInput: true
		});
	}

	render() {
		const { id, text, completed, onCheck, onDelete, updateTodo } = this.props;

		return(
			<li key={id} data-id={id} className={completed ? "todo-item checked completed" : "todo-item"}>
				<Button 
					className="todo-item-complete-btn"
					children={<i className="fa-solid fa-circle-check"></i>}
					onClick={onCheck} />
				<div className="todo-item-wrapper">
					{
						!this.state.isActiveInput ? (
							<div
								onDoubleClick={() => this.setActiveInput()}
								className="todo-item-wrapper-text">{text}</div>
						) : (
							<ListItemInput
								id={id} 
								text={text} 
								className="todo-item-wrapper-text"
								updateTodo={updateTodo}/>
						)
					}
				</div>
				<Button
					className="todo-item-trash-btn"
					children={<i className="fa-solid fa-circle-xmark"></i>}
					onClick={onDelete}
				/>
			</li>
		)
	}
}

export default TodoListItem;