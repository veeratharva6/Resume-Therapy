import React from "react";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Register from "./authentication/Register";
import AboutUs from "./pages/developer-profiles/AboutUs";
import AtharvaV from "./pages/developer-profiles/AtharvaV";
import KevinB from "./pages/developer-profiles/KevinB";
import IvanR from "./pages/developer-profiles/IvanR";
import KevinZ from "./pages/developer-profiles/KevinZ";
import KeonA from "./pages/developer-profiles/KeonA";
import MichaelP from "./pages/developer-profiles/MichaelP";
import MaelT from "./pages/developer-profiles/MaelT";
import EmployeeHome from "./pages/employee_pages/EmployeeHome";
import EmployeeRegister from "./authentication/EmployeeRegister";
import EmployeeSignIn from "./authentication/EmployeeSignIn";

// Users Imports
import PasswordReset from "./authentication/PasswordReset";
import SignIn from "./authentication/SignIn";
import UserMessages from "./pages/user_pages/Messages/UserMessages";
import MeetReviewers from "./pages/user_pages/MeetReviewers/MeetReviewers";
import VirtualCall from "./pages/user_pages/VirtualCall";
import UserProfile from "./pages/user_pages/UserProfile/UserProfile";
import BookAppointment from "./pages/user_pages/appointments/BookAppointment";

// Employee Imports
import UserConnections from "./pages/user_pages/connections/UserConnections";
import EmployeeProfile from "./pages/employee_pages/EmpProfile/EmpProfile";
import EmployeeAvailability from "./pages/employee_pages/Availability/EmpAvailability";
import EmployeeConnections from "./pages/employee_pages/EmpConnections/EmpConnections";
import EmployeePending from "./pages/employee_pages/EmpPending/EmployeePending";
import EmployeeMessages from "./pages/employee_pages/EmpMessages/EmpMessages";
import EmployeeVirtualCall from "./pages/employee_pages/virtual-call/EmployeeVirtualCall";
import "./index.css";
import DashLayout from "./pages/user_pages/DashLayout";
import EmployeeDashLayout from "./pages/employee_pages/EmployeeDashLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/EmployeeRegister" element={<EmployeeRegister />} />
        <Route path="/EmployeeSignIn" element={<EmployeeSignIn />} />
        <Route path="/PasswordReset" element={<PasswordReset />} />
        <Route path="/EmployeeHome" element={<EmployeeHome />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/AboutUs/AtharvaV" element={<AtharvaV />} />
        <Route path="/AboutUs/KevinB" element={<KevinB />} />
        <Route path="/AboutUs/IvanR" element={<IvanR />} />
        <Route path="/AboutUs/KevinZ" element={<KevinZ />} />
        <Route path="/AboutUs/KeonA" element={<KeonA />} />
        <Route path="/AboutUs/MichaelP" element={<MichaelP />} />
        <Route path="/AboutUs/MaelT" element={<MaelT />} />
      </Routes>

      <Routes>
        <Route path="/user-dash" element={<DashLayout />}>
          <Route
            path="/user-dash/MeetReviewers/meet-reviewers"
            element={<MeetReviewers />}
          />
          <Route path="/user-dash/messages" element={<UserMessages />} />
          <Route path="/user-dash/virtual-call" element={<VirtualCall />} />
          <Route path="/user-dash/profile" element={<UserProfile />} />
          <Route path="/user-dash/connections" element={<UserConnections />} />
          <Route
            path="/user-dash/book-appointment"
            element={<BookAppointment />}
          />
        </Route>
      </Routes>

      <Routes>
        <Route path="/reviewer-dash" element={<EmployeeDashLayout />}>
          <Route path="/reviewer-dash/profile" element={<EmployeeProfile />} />
          <Route
            path="/reviewer-dash/availability"
            element={<EmployeeAvailability />}
          />
          <Route
            path="/reviewer-dash/connections"
            element={<EmployeeConnections />}
          />
          <Route
            path="/reviewer-dash/pending-connections"
            element={<EmployeePending />}
          />
          <Route
            path="/reviewer-dash/Messages"
            element={<EmployeeMessages />}
          />
          <Route
            path="/reviewer-dash/virtual-call"
            element={<EmployeeVirtualCall />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
