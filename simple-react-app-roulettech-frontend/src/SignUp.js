import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { signup } from './api';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);

  const validate = () => {
    let errors = {};
    const { username, email, password, confirmPassword } = formData;

    if (!username) {
      errors.username = 'Username is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, 'secret key').toString();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const encryptedPassword = encryptPassword(formData.password);

    const submissionData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await signup(submissionData);
      console.log('Sign-Up Successful', response.data);
      setSignupSuccess(true);
      // You might want to redirect the user or clear the form here
    } catch (error) {
      console.error('Sign-Up Error', error.response?.data || error.message);
      setErrors({ api: 'An error occurred during sign-up. Please try again.' });
    }
  };

  return (
    <Container style={{ maxWidth: '500px', marginTop: '50px', color:'white', borderRadius: '25px', padding: '20px'}}>
      <h2 className="text-center">Sign Up</h2>
      {signupSuccess && (
        <Alert variant="success">
          Sign-up successful! You can now log in.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            placeholder="Enter username"
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="Enter email"
          />
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Enter password"
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mt-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {errors.api && (
          <Alert variant="danger" className="mt-3">
            {errors.api}
          </Alert>
        )}

        <Button variant="primary" type="submit" className="mt-4" block>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;