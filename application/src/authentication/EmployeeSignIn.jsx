import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPasswordEmployee, getErrorText } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { Navbar } from "../component/navbar/Navbar";

const EmployeeSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  let err = "";
  useEffect(() => {
    if (user) navigate("/reviewer-dash/profile");
    if (error) alert(error.message);
  }, [user, loading, navigate, error]);

  const enter = (event) => {
    if (event.key === "Enter") {
      login();
    }
  }

  const login = async() => {
    await logInWithEmailAndPasswordEmployee(email, password);
    await setError(getErrorText());
    console.log(err);
    
  }
  const setError = async(errorT) => {
    err = errorT;
    setErrorText(err);
  };
  
  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login__container">
          <h1>Therapist Login</h1>
          <input
            type="email"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={enter}
          />
          <div className="error__text">
            {errorText && <p>{errorText}</p>}
          </div>
          <button
            className="login__btn"
            onClick={() => logInWithEmailAndPasswordEmployee(email, password)}
          >
            Login
          </button>
          <div>
            <Link to="/PasswordReset">Forgot Password?</Link>
          </div>
          <div>
            Don't have an account? <Link to="/EmployeeRegister">Register</Link>{" "}
            now.
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSignIn;
