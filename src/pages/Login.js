import React, { useState } from 'react';
import InputField from 'components/InputField';

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
    global.location = props.location.pathname;
  };

  if (sessionStorage.getItem('token')) {
    global.location = '/';
    return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <InputField
        type="password"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
