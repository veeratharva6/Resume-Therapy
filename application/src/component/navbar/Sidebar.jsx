import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.scss";
import { auth, logout } from "../../firebase";

const sidebarNavItems = [
  {
    display: "Profile",
    icon: <i className="bx bx-home"></i>,
    to: "/user-dash/profile",
    section: "",
  },
  {
    display: "Connections",
    icon: <i className="bx bx-star"></i>,
    to: "/user-dash/connections",
    section: "upload-resume",
  },
  {
    display: "Meet Resume Therapists",
    icon: <i className="bx bx-calendar"></i>,
    to: "/user-dash/MeetReviewers/meet-reviewers",
    section: "meet-reviewers",
  },
  {
    display: "Messages",
    icon: <i className="bx bx-user"></i>,
    to: "/user-dash/messages",
    section: "messages",
  },
  {
    display: "Book Appointment",
    icon: <i className="bx bx-user"></i>,
    to: "/user-dash/book-appointment",
    section: "book-appointment",
  },
  {
    display: "Virtual Call",
    icon: <i className="bx bx-receipt"></i>,
    to: "/user-dash/virtual-call",
    section: "virtual-call",
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

const Sidebar = () => {
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
   
        indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      }
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);


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

export default Sidebar;