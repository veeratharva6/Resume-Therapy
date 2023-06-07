import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../component/navbar/Navbar";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  getErrorText,
} from "../firebase";
import "./Login.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  let error = "";
  const register = async () => {
    await registerWithEmailAndPassword(name, email, password);
    await setError(getErrorText());
    
    if (error === "") {
      setRegistrationStatus("success");
    } else {
      setRegistrationStatus("failure");
    }
  };

  const setError = async(errorT) => {
    error = errorT;
    setErrorText(error);
  };
  


  const enter = (event) => {
    if (event.key === "Enter") {
      register();
    }
  }

  useEffect(() => {
    if (registrationStatus === "success") {
      navigate("/user-dash/profile");
    }
  }, [registrationStatus]);

  const handleLogin = async () => {
    if (user) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0]?.data();
      if (data && data.employee) {
        await logout(); // Log the user out if they are an employee
      }
    }

    // Redirect to the login page
    window.location.href = "/SignIn";
  };

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);
  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register__container">
          <h1>Register </h1>

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
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            Register with Google
          </button>

          <a>Already have an account?</a>

          <div>
            <Link to="#" onClick={handleLogin}>
              Login now.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
