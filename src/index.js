import ReactDOM from "react-dom";
import React from "react";
import { Route, Router } from "react-router-dom";

import './styles/App.css';

import AppWrapper from "./components/AppWrapper";
import history from "./utils/history";
import * as serviceWorker from './serviceWorker';

const mainRoutes = (
  <Router history={history}>
    <Route path="/" render={props => (<AppWrapper {...props} />)} />
  </Router>
);

ReactDOM.render(mainRoutes, document.getElementById("root"));

serviceWorker.unregister();
