import { Link } from "react-router-dom";
import "./developers.css";
import { Navbar } from "../../component/navbar/Navbar";
import { Footer } from "../../component/footer/Footer";

function AboutUs() {
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="developers-section">
        <h1>Meet The Developers</h1>
        <div className="rcorners1">
          <Link to="KevinB">
            <h4>Kevin Barbour</h4>
            <p>Team Lead</p>
          </Link>
        </div>
        <div className="rcorners1">
          <Link to="AtharvaV">
            <h4>Atharva Veer</h4>
            <p>Front-End Lead</p>
          </Link>
        </div>
        <div className="rcorners1">
          <Link to="IvanR">
            <h4>Ivan Ramos</h4>
            <p>Back-End Lead</p>
          </Link>
        </div>
        <div className="rcorners1">
          <Link to="KeonA">
            <h4>Keon Abbasi</h4>
            <p>Scrum Master</p>
          </Link>
        </div>
        <div className="rcorners1">
          <Link to="MichaelP">
            <h4>Michael P</h4>
            <p>GitHub Master</p>
          </Link>
        </div>
        <div className="rcorners1">
          <Link to="KevinZ">
            <h4>Kevin Zeng</h4>
            <p>Front-End Help</p>
          </Link>
        </div>
        <div className="rcorners1">
          <Link to="MaelT">
            <h4>Mael T</h4>
            <p>Back-End Help</p>
          </Link>
        </div>
      </div>
      <div className="stack-section">
        <h1>Our Tech Stack</h1>
        <h2>
          Resume Therapy is powered by a blend of modern and robust
          technologies. We've built our platform using React.js and Express.js
          for our front-end and back-end, respectively, with additional UI
          components from libraries such as Material-UI and React-Bootstrap. Our
          state management is handled with Recoil, and we leverage Firebase for
          our database needs and user authentication. We use Daily.co's APIs for
          video calling functionality, integrating them into our React app with
          the help of their dedicated JavaScript and React libraries. For our
          calendar and time-picking components, we employ the
          react-day-time-picker and react-calendar libraries. Chat functionality
          is implemented with react-chat-elements. Our platform is enriched with
          other libraries such as Axios for promise-based HTTP requests,
          Mongoose for object modeling with Numeral.js for number formatting. We
          use the React Native Firebase Storage library for handling file
          storage. On the development side, we use Jest for testing, and tools
          like Prettier and ESLint ensure our code is clean and consistent. Our
          styles are elevated with Sass and Tailwind CSS. Finally, our platform
          is hosted on Google Cloud, with Nginx as our web server.
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
