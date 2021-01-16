import React, { useState } from 'react';
import InputField from 'components/InputField';
import Layout from 'components/Layout';
import Page from 'components/Page';
import ErrorMessage from 'components/ErrorMessage';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchToken = async (username, password) => {
    return fetch('https://api.bybits.co.uk/auth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'applicatin/json',
        environment: 'mock',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        type: 'USER_PASSWORD_AUTH',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw 'Network response was not ok';
        }
        return response.json();
      })
      .then((data) => {
        if (!data.access_token) {
          throw 'Invalid username or password';
        }
        return data.access_token;
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = await fetchToken(username, password);
      await sessionStorage.setItem('token', token);
      const query = new URLSearchParams(props.location.search);
      props.history.push(query.get('redirect') ?? '/');
    } catch (e) {
      console.log(e);
      setErrorMessage(e);
    }
  };

  if (sessionStorage.getItem('token')) {
    props.history.push('/');
  }

  return (
    <Layout>
      <Page title="Login">
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            data-testid="input-username"
          />
          <InputField
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            data-testid="input-password"
          />
          <button type="submit" data-testid="btn-login">
            Login
          </button>
        </form>
        {errorMessage && <ErrorMessage error={errorMessage} />}
      </Page>
    </Layout>
  );
};

export default Login;
