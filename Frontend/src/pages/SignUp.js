import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { UserContext } from "../context/UserContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
      });

      const { token } = response.data;
      login(token);
      alert(`Welcome, ${email}!`);
      navigate("/");
    } catch (err) {
      setError(err.response ? err.response.data.message : "SignUp failed");
    }

  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit} className="signup__form">
        <h2>Sign Up</h2>

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

        <button type="submit">Sign Up</button>

        <p>
          Already have an account? <Link to="/signin" style={{ color: 'royalblue', textDecoration: 'underline' }}>Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
