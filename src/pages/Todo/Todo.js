import { Component } from 'react';

import TodoForm from '../../features/TodoForm/TodoForm';
import TodoList from '../../features/TodoList/TodoList';
import FilterPanel from '../../features/FilterPanel/FilterPanel';

import './Todo.scss';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			todosArr: [],
			filter: 'All'
		}
	}

	checkTodo = (id) => {
		this.setState(({todosArr}) => {
			return {
				todosArr: todosArr.map((item) => item.id === id ? { ...item, completed: !item.completed } : item)
			}
		})
	}

	deleteTodo = (id) => {
		this.setState(({todosArr}) => {
			return {
				todosArr: todosArr.filter((todo) => todo.id !== id)
			}
		})
	}

	toggleAllTodos = () => {

		const { todosArr } = this.state;

		const everyUnchecked = todosArr.every((item) => !item.completed);
		const someChecked = todosArr.some((item) => item.completed);
		const everyChecked = todosArr.every((item) => item.completed);

		if (everyChecked) {
			this.setState(({todosArr}) => {
				return {
					todosArr: todosArr.map((item) => {
						return {...item, completed: false}
					})
				}
			})
			return;
		}

		if (everyUnchecked || someChecked) {
			this.setState(({todosArr}) => {
				return {
					todosArr: todosArr.map((item) => {
						return {...item, completed: true}
					})
				}
			})
			return;
    	}
	}

	addTodo = (text) => {

		if (!text) return;

		const newTodo = {
			text,
			completed: false,
			id: new Date().getTime()
		}

		this.setState(({todosArr}) => ({todosArr: [...todosArr, newTodo]}));
	}

	updateTodo = (id, text) => {
		this.setState(({todosArr}) => ({todosArr: todosArr.map((item) => {
			if(item.id === id) {
				return { ...item, text: text }
			} 
			return item;
		})}));
	}

	setActiveFilter = (value) => {
		this.setState({
			filter: value
		});
	}

	clearCompleted = () => {
		this.setState(({todosArr}) => ({todosArr: todosArr.filter((item) => !item.completed)}))
	}

	render() {

		const { todosArr, filter } = this.state;

		return (
			<div className='todos-body'>
				<h1 className='todos-title'>todos</h1>
				<TodoForm 
					onAdd={this.addTodo}
					toggleAllTodos={this.toggleAllTodos}/>
				<TodoList 
					todosArr={todosArr}
					filter={filter}
					onCheck={this.checkTodo}
					onDelete={this.deleteTodo}
					updateTodo={this.updateTodo}
				/>
				<FilterPanel
					total={this.countTodos}
					todosArr={todosArr}
					activeFilter={filter}
					onFilters={this.setActiveFilter}
					clearCompleted={this.clearCompleted}/>
			</div>
		);
	}
}

export default App;