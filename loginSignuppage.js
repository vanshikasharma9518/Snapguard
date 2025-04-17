import React, { useState } from 'react';
import axios from 'axios';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/signup
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Toggle between Login and Signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
    });
    setErrorMessage('');
  };

  // Submit form (Login or Signup)
  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/signup';
    
    // Send form data to backend
    axios.post(`http://localhost:5000${endpoint}`, formData)
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem('userToken', response.data.token); // Store token in localStorage
          alert(`${isLogin ? 'Logged in' : 'Signed up'} successfully`);
          // Redirect user to the home page or dashboard (adjust the path accordingly)
          window.location.href = '/home';
        }
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || 'An error occurred');
      });
  };

  return (
    <div className="login-signup-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p>
        {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
        <button onClick={toggleForm}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default LoginSignupPage;
