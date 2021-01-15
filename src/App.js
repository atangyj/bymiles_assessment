import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from 'pages/Login';
import Policy from 'pages/Policy';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/policy" component={Policy} />
          <Redirect to="/policy" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
