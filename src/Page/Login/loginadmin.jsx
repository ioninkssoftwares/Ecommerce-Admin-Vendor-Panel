import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the Cookies library
import "./loginadmin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        const { token } = response.data;
        Cookies.set("token", token, { expires: 7 });
        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred while logging in");
    }
  };

  return (
    <>
      <div className="containering">
        <h2 className="text-red-600 font-bold">Login</h2>
        {error && <div className="error">{error}</div>}
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <p onClick={() => navigate("/vendor/login")} className="text-blue-600 cursor-pointer underline">Login as Vendor</p>
      </div>
    </>
  );
};

export default Login;
