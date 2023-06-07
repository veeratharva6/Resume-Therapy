import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function MichaelP() {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="info-section">
        <div className="profile">
          <h1> Michael Petrossian </h1>
          <h5> Role: Git Master / Back end</h5>
          <p>
            About me: Hello! I am a third year here at SF STATE. I am deeply
            interested in cyber security and I want to be invested in the
            future's internet security. Let's get started!!!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MichaelP;
