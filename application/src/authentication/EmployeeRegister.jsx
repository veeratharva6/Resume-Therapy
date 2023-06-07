import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar/Navbar";
import { auth, registerWithEmailAndPasswordEmployee, getErrorText } from "../firebase";
import "./Login.css";

function EmployeeRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorText, setErrorText] = useState("");

  const navigate = useNavigate();

  let error = "";
  const register = async () => {
    await registerWithEmailAndPasswordEmployee(name, email, password, false)
    await setError(getErrorText());

    if (error === "") {
      setRegistrationStatus("success");
    } else {
      setRegistrationStatus("failure");
    }

  };

  const enter = (event) => {
    if (event.key === "Enter") {
      register();
    }
  }

  const setError = async(errorT) => {
    error = errorT;
    setErrorText(error);
  };


  useEffect(() => {
    if (registrationStatus === "success") {
      navigate("/reviewer-dash/profile");
    }
  }, [navigate, registrationStatus]);

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);
  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register__container">
          <h1>Register as Therapist</h1>

          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            onKeyDown={enter}

          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}

          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={enter}
          />
          <div className="error__text">
            {errorText && <p>{errorText}</p>}
          </div>
          <button className="register__btn" onClick={register}>
            Register
          </button>
          
          <a>Already have an account?</a>

          <div>
            <Link to="/EmployeeSignIn">Login now.</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeRegister;
