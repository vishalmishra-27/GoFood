import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
  const host = "http://localhost:5000";

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/loginuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();

    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      navigate("/");
    }

    else {
      alert("User with this email already exists");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <Navbar />
      <div>
        <form onSubmit={handleSubmit}>
          <div className="logincontainer">

            <label htmlFor="usernameinput"><b>E-mail</b></label>
            <input id='usernameinput' type="email" autoComplete='on' onChange={onChange} value={credentials.email} placeholder="Enter your e-mail" name="email" required />

            <label htmlFor="passwordinput"><b>Password</b></label>
            <input id='passwordinput' type="password" onChange={onChange} value={credentials.password} placeholder="Enter Password" name="password" required />

            <button id='submitbutton' type="submit">Login</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login