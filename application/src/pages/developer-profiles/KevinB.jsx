import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function KevinB() {
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="info-section">
        <div className="profile">
          <h1>Kevin Barbour </h1>
          <h5>Role: Team Lead</h5>
          <p>
            As a final-year Computer Science student at San Francisco State
            University, I am actively fostering a deep interest in Natural
            Language Processing (NLP), honing my skills in Python, Java, and
            full-stack web development. My collegiate journey has not only
            allowed me to delve into the technical aspects of the discipline but
            also provided me the opportunity to lead a team, cultivating my
            interpersonal skills and fuelling my passion for problem-solving.
            Upon graduation, I envision myself thriving in the dynamic tech
            landscape of New York City as a developer, applying my knowledge and
            skills to create meaningful solutions. Outside the world of code and
            algorithms, I find joy and relaxation in shooting hoops and playing
            pool. These hobbies have taught me the importance of focus, strategy and
            precision, lessons I carry into my professional life.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default KevinB;
