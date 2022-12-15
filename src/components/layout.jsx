import * as React from "react";

import Navbar from "./navbar";
import Footer from "./footer";
import AboutMe from "./aboutMe";
import TitleCard from "./titleCard";
import Resume from "./resume";
import Gallery from "./gallery";

import { parentContainer, childrenContainer } from "./layout.module.css";

const Layout = () => {
  return (
    <div className={parentContainer}>
      <Navbar />
      <main className={childrenContainer}>
        <TitleCard title="Title Card"></TitleCard>
        <AboutMe title="About Me"></AboutMe>
        <Resume title="Resume"></Resume>
        <Gallery title="Photos"></Gallery>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
