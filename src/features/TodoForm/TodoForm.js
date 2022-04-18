import React from "react";

import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

import "./TodoForm.scss";

class AppForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  handleInputChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    const { onAddTodo } = this.props;

    onAddTodo(text);
    this.setState({
      text: "",
    });
  };

  render() {
    const { text } = this.state;
    const { toggleAllTodos } = this.props;

    return (
      <form className="todo-form" onSubmit={this.onSubmit}>
        <Input
          type="text"
          variant="primary"
          placeholder="What needs to be done?"
          value={text}
          onChange={this.handleInputChange}
        />
        <Button
          className="todo-form-submit-btn"
          type="submit"
        >
          <i className="fas fa-plus-square" />
        </Button>
        <Button
          className="todo-form-complete-all"
          onClick={() => toggleAllTodos()}
        >
          <i className="fa-solid fa-arrow-down" />
        </Button>
      </form>
    );
  }
}

export default AppForm;
