import React, { Component } from "react";

const Variant = {
	PRIMARY: "primary",
	SECONDARY: "secondary"
}

const mapVariantToClass = {
	[Variant.PRIMARY]: "input-primary",
	[Variant.SECONDARY]: "input-secondary"
}

class ListItemInput extends Component {
	constructor(props) {
		super(props);
		this.elemRef = React.createRef();
	}
	
	componentDidMount() {
		this.elemRef.current.focus();
	}

	render() {
		const { id, text, className = "", variant, updateTodo } = this.props;

		return(
			<input
				ref={this.elemRef}
				type="text" defaultValue={text} 
				className={`list-item-input ${className} ${variant ? mapVariantToClass[variant] : ""}`}
				onChange={(e) => updateTodo(id, e.target.value)}>
			</input>
		)
	}

	
}

export default ListItemInput;


//autoFocus={autoFocus ? true : false} 