import "./NavbarStyles.css";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import EmployeeHome from "../../pages/employee_pages/EmployeeHome";
// import Messages from "../../tests/Messages";


export const EmployeeNavbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const logUserOut = async () => {
    try {
        await logout(auth);
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
  }

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <h1>Resume Therapy</h1>
      </Link>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        
     
        <li>
          <Link to="/reviewer-dash/profile">Profile</Link>
        </li>

        <li>
          <Link to="/reviewer-dash/availability">Availability</Link>
        </li>

        <li>
          <Link to="/reviewer-dash/pending-connections">Pending Connections</Link>
        </li>

        <li>
          <Link to="/reviewer-dash/connections">Connections</Link>
        </li>

        <li>
          <Link to="/reviewer-dash/messages">Messages</Link>
        </li>

        <li>
          <Link to="/reviewer-dash/virtual-call">Virtual Call</Link>
        </li>

        <li>
            <Link to = "/" onClick={logUserOut}>Logout</Link>
        </li>
      </ul>

      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};


export default EmployeeNavbar;