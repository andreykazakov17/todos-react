import './filterPanel.scss';


const FilterPanel = ({total, todosArr, onFilters}) => {

	let classNames = "todo-filters";
	if (todosArr.length) {
		classNames += " visible";
	}

	return(
		<div className={classNames}>
		<div className="todo-filters-total">Total: {total()}</div>
		<nav className="todo-filters-list" onClick={(e) => onFilters(e)}>
			<button type="button" data-btn="all" className="todo-filters-item active-btn">All</button>
			<button type="button" data-btn="active" className="todo-filters-item">Active</button>
			<button type="button" data-btn="completed" className="todo-filters-item">Completed</button>
		</nav>
		<button data-clear="clear-all" className="todo-filters-clear">Clear completed</button>
	</div>
	)
}

export default FilterPanel;