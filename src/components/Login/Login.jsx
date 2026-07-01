import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  const loginBtn = async (event) => {
    event.preventDefault();

    if (email === "") {
      alert("Email should not be empty.");
      return;
    }

    const res = await fetch(
      "http://localhost:3000/users?email=" + email
    );

    const data = await res.json();

    if (data.length > 0) {
      if (data[0].password === password) {
        alert("Login Successful");
        localStorage.setItem("userObj", JSON.stringify(data[0]));
      } else {
        alert("Invalid Credentials");
      }

      setEmail("");
      setPassword("");
    } else {
      setErr(true);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to continue shopping</p>

        <input
          type="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={loginBtn} type="submit">
          Login
        </button>

        {err && (
          <p className="error">
            User does not exist.
            <Link to="/register"> Register</Link>
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;