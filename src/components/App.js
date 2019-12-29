import React from 'react';

import Header from './Header';
import TodoListWrapper from './Todo/TodoListWrapper';

const App = ({auth, logoutHandler}) => {
  
  return (
    <div>
      <Header logoutHandler={logoutHandler} />
      <div className="todo-list">
        <TodoListWrapper auth={auth} />
      </div>
    </div>
  );
};

export default App;
