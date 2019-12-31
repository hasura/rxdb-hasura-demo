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

        <TodoInput auth={this.props.auth} db={this.props.db} />

        <TodoList todos={this.state.todos} db={this.props.db} auth={this.props.auth} />
      </div>
    );
  }
}

TodoListWrapper.propTypes = {
  auth: PropTypes.any.isRequired,
};

export default TodoListWrapper;
