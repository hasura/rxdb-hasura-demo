import React, { Component } from "react";

import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import PropTypes from "prop-types";

class TodoListWrapper extends Component {
  state = {
    todos: []
  }

  render() {
    return (
      <div className="todoWrapper">
        <div className="sectionHeader"> Todos </div>

        <TodoInput auth={this.props.auth} />

        <TodoList todos={this.state.todos} auth={this.props.auth} />
      </div>
    );
  }
}

TodoListWrapper.propTypes = {
  auth: PropTypes.any.isRequired,
};

export default TodoListWrapper;
