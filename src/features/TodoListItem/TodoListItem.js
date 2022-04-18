import React, { Component } from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import "./TodoListItem.scss";

class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActiveInput: false,
    };
  }

  hideInput = () => {
    this.setState({
      isActiveInput: false,
    });
  };

  showInput = () => {
    this.setState({
      isActiveInput: true,
    });
  };

  // toggleInputVisibility = () => {
	// this.setState({
	// 	isActiveInput: !!this.state.isActiveInput
	// });
  // }

  render() {
    const { isActiveInput } = this.state;
    const { id, text, completed, onCheck, onDelete, updateTodo } = this.props;

    return (
      <li key={id} data-id={id} className={completed ? "todo-item checked completed" : "todo-item"}>
        <Button
          className="todo-item-complete-btn"
          onClick={onCheck}
        >
          <i className="fa-solid fa-circle-check" />
        </Button>
        <div className="todo-item-wrapper">
          {!isActiveInput ? (
            <div onDoubleClick={() => this.showInput()} className="todo-item-wrapper-text">
              {text}
            </div>
          ) : (
            <Input
              id={id}
              text={text}
              variant="secondary"
              onChange={updateTodo}
              defaultValue={text}
              isFocus
              onBlur={this.hideInput}
            />
          )}
        </div>
        <Button
          className="todo-item-trash-btn"
          onClick={onDelete}
        >
          <i className="fa-solid fa-circle-xmark" />
        </Button>
      </li>
    );
  }
}

export default TodoListItem;
