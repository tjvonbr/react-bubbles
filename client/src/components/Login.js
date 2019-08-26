import React, { useState, Fragment } from "react";
import axios from 'axios';
import { BrowserRouter as Link, Route, Redirect } from 'react-router-dom';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = event => {
    setCredentials({
      ...credentials, [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', credentials)
      .then(response => {
        localStorage.setItem('token', response.data.payload);
        setCredentials({ username: '', password: '' });
        props.history.push('/api/colors')
      })
      .catch(error => console.log(error.response));
    }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="login-container">
        <form className="form">
          <h3 className="form-header">Please enter your login information!</h3>
          <input 
            className="input-field"
            type='text'
            placeholder="Please enter your username."
            name='username'
            value={credentials.username}
            onChange={handleChange}
          />
          <input 
            className="input-field"
            type='password'
            placeholder="Please enter your password."
            name='password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button className="btn login-btn" onClick={handleSubmit}>Log in</button>
        </form>
    </div>
    </>
  );
};

export default Login;
