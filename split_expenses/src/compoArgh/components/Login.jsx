import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = existingUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="page-background">
      {" "}
      
      <div className="login-box">
        {" "}
        
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;