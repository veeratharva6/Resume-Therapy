import React from 'react';
import Employee from '../../component/heroImages/EmployeeHero';
import { Navbar } from '../../component/navbar/Navbar';
import { Footer } from "../../component/footer/Footer";

function EmployeeHome() {
  return (
    <>
      <div>
        <Navbar />
        <Employee />
        <Footer />
      </div>
    </>
  );
}

export default EmployeeHome;