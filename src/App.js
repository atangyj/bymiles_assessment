import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from 'pages/Login';
import Policy from 'pages/Policy';
import RouteWithAuth from 'hoc/RouteWithAuth';
import './App.scss';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <RouteWithAuth path="/policy" component={Policy} />
          <Redirect to="/policy" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
