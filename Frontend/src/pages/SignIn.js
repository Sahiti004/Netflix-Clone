import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);

      navigate("/");

    } catch (err) {
      setError(err.response ? err.response.data.message : "Sign In failed");
    }
  };

  return (
    <div className="signin">
      <form onSubmit={handleSubmit} className="signin__form">
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="error">{error}</div>}

        <button type="submit">Sign In</button>

        <p>
          Don't have an account? <Link to="/signup" style={{ color: 'royalblue', textDecoration: 'underline' }}>Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
