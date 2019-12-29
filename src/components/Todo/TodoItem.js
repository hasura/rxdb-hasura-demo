import React from 'react';

const TodoItem = ({index, todo}) => {

  const removeTodo = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleTodo = () => {

  };

  return (
    <li>
      <div className="view">
        <div className="round">
          <input
            checked={todo.isCompleted}
            type="checkbox"
            id={todo.id}
            onChange={toggleTodo}
          />
          <label htmlFor={todo.id}/>
        </div>
      </div>

      <div className={"labelContent" + (todo.isCompleted ? " completed" : '')}>
          {todo.text}
      </div>

      <button className="closeBtn" onClick={removeTodo}>
        x
      </button>
    </li>
  );
};

export default TodoItem;
