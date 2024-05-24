import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Sign = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSign = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.some((user) => user.username === username)) {
      alert("Username already exists");
      return;
    }

    const newUser = { username, password, email };
    existingUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(existingUsers)); 

    alert("Sign successful!");
    navigate("/login"); 
  };

  return (
    <div className="page-background">
      {" "}
      <div className="sign-box">
      {" "}
        <form onSubmit={handleSign}>
          <h1>Sign Up</h1>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
        
    </div>
    
  );
};

export default Sign;