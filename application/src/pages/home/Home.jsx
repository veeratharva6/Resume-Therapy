import React from "react";
import { Navbar } from "../../component/navbar/Navbar";
import { HeroImg } from "../../component/heroImages/HeroImg";
import { Footer } from "../../component/footer/Footer";
import { Work } from "../../component/work/Work";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroImg />
      <Work />
      <Footer />
    </div>
  );
}

export default Home;
