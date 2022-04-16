import { Component } from 'react';

import Button from '../../components/Button/Button';

import './TodoForm.scss';

class AppForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		}
	}

	onValueChange = (e) => {
		this.setState({
			text: e.target.value
		});
	}

	onSubmit = (e) => {
		e.preventDefault();

		this.props.onAdd(this.state.text);
		this.setState({
			text: ''
		})
	}

	render() {

		const { text } = this.state;
		const { toggleAllTodos } = this.props;

		return(
			<form 
				className='todo-form' 
				onSubmit={this.onSubmit}>
				<input 
					type="text" 
					className="todo-form-input" 
					placeholder="What needs to be done?"
					value={text}
					onChange={this.onValueChange}/>
				<Button 
					className="todo-form-submit-btn"
					children={<i className="fas fa-plus-square"></i>}
					type="submit"/>
				<Button 
					className="todo-form-complete-all"
					children={<i className="fa-solid fa-arrow-down"></i>}
					onClick={() => toggleAllTodos()}/>
			</form>
		)
	}
}

export default AppForm;