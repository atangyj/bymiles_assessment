import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from 'pages/Login';

const withAuth = (component) => {
  if (sessionStorage.getItem('token')) {
    return component;
  }
  return Login;
};

export default withAuth;
