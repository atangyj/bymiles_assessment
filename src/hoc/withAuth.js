import { Redirect, Route } from 'react-router-dom';



const withAuth = (Component, redirect) => {
  if (sessionStorage.getItem('token')) {
    return <Component />
  }
  return <Redirect to={`/login?redirect=${redirect}`} />
};

export default withAuth;
