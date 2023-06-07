import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function KeonA() {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="info-section">
        <div className="profile">
          <h1> Keon Abbasi </h1>
          <h5> Role: Scrum Master</h5>
          <p>
            About me: I'm a senior at SFSU studying CS. Hoping to land a job in
            Cyber and Data Security. My hobbies include tennis, video games, and
            traveling.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default KeonA;
