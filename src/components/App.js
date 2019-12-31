import React from 'react';

import Header from './Header';
import TodoListWrapper from './Todo/TodoListWrapper';

const App = ({auth, db, logoutHandler}) => {
  
  return (
    <div>
      <Header logoutHandler={logoutHandler} />
      <div className="todo-list">
        <TodoListWrapper auth={auth} db={db} />
      </div>
    </div>
  );
};

export default App;
