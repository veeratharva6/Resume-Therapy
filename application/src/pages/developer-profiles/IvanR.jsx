import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function IvanR() {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="info-section">
        <div className="profile">
          <h1> Ivan Ramos </h1>
          <h5> Role: Back end lead </h5>

          <p>
            {" "}
            Hello, my name is Ivan Ramos, and I'm a Computer Science student
            currently focusing on software development and machine learning. I'm
            a very passionate person, and I love to learn new things. I have
            experience with Java, C++, Python, and JavaScript. I'm currently
            learning ExpressJS. In my free time, I enjoy hanging out with
            friends, playing the guitar and listening to music.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default IvanR;
