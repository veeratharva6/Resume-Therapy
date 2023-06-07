import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { auth, logout } from "../../firebase";

const sidebarNavItems = [
  {
    display: "Therapist Profile",
    display: "Resume Therapist Profile",
    icon: <i className="bx bx-home"></i>,
    to: "/reviewer-dash/profile",
    section: "",
  },
  {
    display: "Availability",
    icon: <i className="bx bx-home"></i>,
    to: "/reviewer-dash/availability",
    section: "",
  },
  {
    display: "Pending Connections",
    icon: <i className="bx bx-home"></i>,
    to: "/reviewer-dash/pending-connections",
    section: "",
  },
  {
    display: "Connections",
    icon: <i className="bx bx-home"></i>,
    to: "/reviewer-dash/connections",
    section: "",
  },
  {
    display: "Messages",
    icon: <i className="bx bx-home"></i>,
    to: "/reviewer-dash/messages",
    section: "",
  },
  {
    display: "Virtual Call",
    icon: <i className="bx bx-home"></i>,
    to: "/reviewer-dash/virtual-call",
    section: "",
  },
  {
    display: "Logout",
    icon: <i className="bx bx-log-out"></i>,
    to: "",
    section: "logout",
    onClick: async () => {
      try {
        await logout(auth);
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
];

const EmployeeSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      if (indicatorRef.current) {
        // Add this check
        indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      }
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <div className="title">Resume Therapy</div>
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        {sidebarNavItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            onClick={item.onClick ? item.onClick : () => {}}
          >
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSidebar;
