import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
import Settings from './components/Settings';
import Board from './components/Board';
import Boards from './components/Boards';

function App({ isLogin }) {
  return !isLogin ? (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/">
        <Redirect to="/" />
      </Route>
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/">
        <Redirect to="/boards" />
      </Route>
      <Route exact path="/boards">
        <Boards />
      </Route>
      <Route exact path="/boards/:board_id">
        <Board />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
      <Route path="/">Not found</Route>
    </Switch>
  );
}

export default App;
