import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import App from './App';

const mockFetchWithResponse = (resp) => {
  const mockJsonPromise = Promise.resolve(resp);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    ok: true,
  });
  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
};

test('login should navigate to policy page', async () => {
  mockFetchWithResponse({
    access_token: 'mocktoken',
  });

  let history = createMemoryHistory();
  history.push('/login');

  act(() => {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  });

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
    expect(window.location.pathname).toBe(`/policy`);
  }, 3000);
});

test('policy page should display policy reference, cover type, car, address', async () => {
  // mock token
  sessionStorage.setItem('token', 'mocktocken');

  const mockSuccessResponse = {
    policy: {
      policy_ref: 'reference',
      cover: 'cover',
      address: {
        line_1: 'line1',
        line_2: 'line2',
        line_3: 'line3',
        postcode: 'postcode',
      },
    },
    vehicle: { make: 'maker', model: 'model', colour: 'colour', reg: 'reg' },
  };
  mockFetchWithResponse(mockSuccessResponse);

  let history = createMemoryHistory();
  history.push('/policy');

  act(() => {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  });

  await waitFor(() => {
    // assert about url
    expect(screen.getByTestId('page__title').textContent).toBe('Policy');
    expect(screen.getByTestId('text-cover').textContent).toBe('cover');
    expect(screen.getByTestId('text-policy-ref').textContent).toBe('reference');
    expect(screen.getByTestId('text-car').textContent).toBe(
      'maker model colour reg'
    );
    expect(screen.getByTestId('text-address').textContent).toBe(
      'line1, line2, line3, postcode'
    );
  }, 3000);
});
