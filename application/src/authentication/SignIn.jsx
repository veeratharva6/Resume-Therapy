import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle, getErrorText } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { Navbar } from "../component/navbar/Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/user-dash/profile");
    if (error) alert(error.message);
  }, [user, loading]);

  const enter = (event) => {
    if (event.key === "Enter") {
      login();
    }
  }

  const login = async() => {

    await logInWithEmailAndPassword(email, password);
    setErrorText(getErrorText());
  }

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="login__container">
          <h1> Login</h1>
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
            onClick={login}
          >
            Login
          </button>
          <button className="login__btn login__google" onClick={signInWithGoogle}>
            Login with Google
          </button>
          <div>
            <Link to="/PasswordReset">Forgot Password?</Link>
          </div>
          <div>
            Don't have an account? <Link to="/Register">Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;