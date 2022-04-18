import { Component } from 'react';

import Button from '../../components/Button/Button';
import './FilterPanel.scss';

const filtersArr = ['All', 'Active', 'Completed'];

class FilterPanel extends Component {

	constructor(props) {
		super(props);
		this.id = 1;
	}


	render() {

		const { todosArr, activeFilter, onFilters, clearCompleted } = this.props;

		if(!todosArr.length) {
			return null;
		};

		return(
			<div className={"todo-filters visible"}>
			<div className="todo-filters-total">Total: {todosArr.length}</div>
			<nav className="todo-filters-list">
				{
					filtersArr.map((filter) => (
						<Button
							key={this.id++}
							onClick={() => onFilters(filter)}
							className={`todo-filters-item ${filter === activeFilter ? "active-btn" : ""}`}>
								{filter}
						</Button>
					))
				}
			</nav>
			<Button
				className="todo-filters-clear"
				onClick={() => clearCompleted()}>
					Clear completed
			</Button>
		</div>
		)
	}
}

export default FilterPanel;


