import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import App from './App';

const mockAPI = (resp) => {
  const mockJsonPromise = Promise.resolve(resp);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
}

test('login should navigate to policy page', async() => {
  mockAPI({
    access_token: "mocktoken"
  })
  
  let history = createMemoryHistory();
  history.push('/login');

  act(()=> {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  })
 
  // action fill form
  act(() => {
    fireEvent.change(screen.getByTestId('input-username'), {
      target: { value: 'testuser' },
    });

    fireEvent.change(screen.getByTestId('input-password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByTestId('btn-login'));
  });

  await waitFor(() => { 
    // assert about url
    expect(window.location.pathname).toBe(`/policy`)}
    ,3000)
  
});

test('policy page should display policy reference, cover type, car, address', async() => {
  // mock token
  sessionStorage.setItem('token','mocktocken');
  
  //mock api
  const mockSuccessResponse = {
   policy: { policy_ref:"reference", cover: "cover", address: {line1: "line1", line2:"line2", postcode: "postcode"}},
   vehicle: {make: "maker", model: "model", colour: "colour", reg: "reg"}
  };
  mockAPI(mockSuccessResponse);
 
  let history = createMemoryHistory();
  history.push('/policy');

  act(()=>{
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  })

  await waitFor(() => { 
    // assert about url
    expect(screen.getByTestId('page__title')).toHaveTextContent('Policy');
    expect(screen.getByTestId('text-cover')).toHaveTextContent('cover');
    expect(screen.getByTestId('text-policy-ref')).toHaveTextContent('reference');
    expect(screen.getByTestId('text-car')).toHaveTextContent('model');
    expect(screen.getByTestId('text-address')).toHaveTextContent('postcode');
  }
    ,3000)
  
})
