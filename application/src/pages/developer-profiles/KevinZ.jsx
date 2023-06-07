import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function KevinZ() {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="info-section">
        <div className="profile">
          <h1> Kevin Zeng </h1>
          <h5> Role: Front end</h5>
          <p>
            About me: Hello, I'm a computer science major in SF State
            University. In the future I hope to land a job that is related to
            computers. Right now I'm improving as much as I can with React and
            hope to get better with it over time. I enjoy playing computer games
            to relieve my stress.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default KevinZ;
