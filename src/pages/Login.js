import React, { useState } from 'react';
import InputField from 'components/InputField';
import Layout from 'components/Layout';
import Page from 'components/Page';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fetchToken = async () => {
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
      .then((response) => response.json())
      .then((data) => data.access_token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = await fetchToken();
    await sessionStorage.setItem('token', JSON.stringify(token));
    const query = new URLSearchParams(props.location.search);
    props.history.push(query.get('redirect')??"/");
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
      </Page>
    </Layout>
  );
};

export default Login;
