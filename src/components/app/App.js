import { Component } from 'react';

import AppForm from '../appForm/appForm';
import TodoList from '../todoList/todoList';
import FilterPanel from '../filterPanel/filterPanel';

import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			todosArr: [],
			filter: 'all'
		}
	}

	countTodos = () => {
		return this.state.todosArr.length;
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

	createTodo = (text) => {

		if (!text) return;

		const newTodo = {
			text,
			completed: false,
			id: new Date().getTime()
		}

		this.setState(({todosArr}) => {

			const newArr = [...todosArr, newTodo];
			return {
				todosArr: newArr
			}
		})
	}

	activeFilter = (e) => {
		const nav = e.target.parentElement;
		const filterBtns = Object.values(nav.children);

		if (e.target.tagName !== 'BUTTON') return;

		for(let btn of filterBtns) {
			btn.classList.remove('active-btn');
		}
	
		this.setState({
			filter: e.target.dataset['btn']
		});
		e.target.classList.add('active-btn');
	}

	render() {

		const { todosArr, filter } = this.state;

		return (
			<div className='todos-body'>
				<h1 className='todos-title'>todos</h1>
				<AppForm onAdd={this.createTodo}/>
				<TodoList 
					todosArr={todosArr}
					filter={filter}
					onCheck={this.checkTodo}
					onDelete={this.deleteTodo}
				/>
				<FilterPanel 
					total={this.countTodos}
					todosArr={todosArr}
					onFilters={this.activeFilter}/>
			</div>
		);
	}
}

export default App;