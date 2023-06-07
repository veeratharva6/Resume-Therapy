import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function AtharvaV() {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="info-section">
        <div className="profile">
          <h1>Atharva Veer</h1>
          <h5>Role: Front-End Lead</h5>
          <p>
            About me: Hi, my name is Atharva Veer and I'm a Senior studying
            Computer Science at San Francisco State University. I have
            experience working with ReactJs, Java, and Python. I am interested
            in becoming a full-time Software Engineer and I want to work on
            Full-Stack Web Development projects. In my free time I enjoy working
            out and playing competitive soccer.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AtharvaV;
