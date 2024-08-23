import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { login } from './api';
import { useAuth } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { login: authLogin } = useAuth();

  const validate = () => {
    let errors = {};

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }


    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await login(formData);
      console.log('Login Successful', response.data);
      authLogin(response.data);
      setLoginSuccess(true);
    } catch (error) {
      console.error('Login Error', error.response?.data || error.message);
      setErrors({ api: 'Invalid username or password. Please try again.' });
    }
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '50px', color:'white', borderRadius: '25px', padding: '20px' }}>
      <h2 className="text-center">Login</h2>
      {loginSuccess && (
        <Alert variant="success">
          Login successful! Redirecting...
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isInvalid={!!errors.username}
            placeholder="Enter username"
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
            placeholder="Enter password"
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {errors.api && (
          <Alert variant="danger" className="mt-3">
            {errors.api}
          </Alert>
        )}

        <Button variant="primary" type="submit" className="mt-4" block>
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default Login;