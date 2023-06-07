import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function MaelT() {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="info-section">
        <div className="profile">
          <h1>Maël Teyssèdre</h1>
          <h5>Role: Backend Developer</h5>
          <p>
            About me: I'm an exchange student from France. I'm interessed in
            cyber security and AI.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MaelT;
