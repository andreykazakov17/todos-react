import { Component } from 'react';
import './appForm.scss';

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
				<button className="todo-form-submit-btn" type="submit">
					<i className="fas fa-plus-square"></i>
				</button>
				<button className="todo-form-complete-all" data-complete-all="complete-all">
					<i className="fa-solid fa-arrow-down"></i>
				</button>
			</form>
		)
	}
}

export default AppForm;