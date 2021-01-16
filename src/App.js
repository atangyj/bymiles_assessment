import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from 'pages/Login';
import Policy from 'pages/Policy';
import './App.scss';
import withAuth from 'hoc/withAuth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/policy" render={ (routeProps)=> {
            let redirect = routeProps.location.pathname;
            return withAuth(Policy, redirect)
          }} />
          <Redirect to="/policy" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
