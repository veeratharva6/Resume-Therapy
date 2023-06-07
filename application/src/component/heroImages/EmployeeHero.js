import "./HeroImgStyles.css";
import React from "react";
import IntroImg from "../../assets/solid.jpg";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const EmployeeHero = () => {
  const [user, loading] = useAuthState(auth);

  const handleLogin = async () => {
    if (user) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0]?.data();
      if (data && !data.employee) {
        await logout(); // Log the user out if they are NOT an employee
      }
    }

    // Redirect to the Employee Sign In page
    window.location.href = "/EmployeeSignIn";
  };

  return (
    <div className="hero">
      <div className="mask">
        <img className="into-img" src={IntroImg} alt="Hero Image" />
      </div>
      <div className="content">
        <h1>Become a Resume Therapist</h1>
        <p>
          Embark on a rewarding journey as a Resume Therapist, empowering
          individuals worldwide to create and polish their ideal resumes. From
          the comfort of your own home, and with the flexibility to manage your
          hours, you can provide your expert guidance to people from diverse
          backgrounds and career stages. Your unique expertise and experience
          will be instrumental in helping them navigate their career paths
          successfully. With the added benefit of setting your own availability,
          you can balance this rewarding work with your personal schedule,
          making an impactful difference when it suits you best. Join us today
          and help shape the future of careers, one resume at a time.
        </p>

        <div className="btn-style">
          <Link to="/EmployeeRegister" className="btn">
            Become a Therapist
          </Link>
          <Link to="#" onClick={handleLogin} className="btn-light">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHero;
