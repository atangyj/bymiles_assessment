import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteWithAuth = ({ path, component: Component }) => {
  return (
    <Route
      path={path}
      render={(routeProps) => {
        let redirect = routeProps.location.pathname;
        return sessionStorage.getItem('token') ? (
          <Component />
        ) : (
          <Redirect to={`/login?redirect=${redirect}`} />
        );
      }}
    />
  );
};

export default RouteWithAuth;
