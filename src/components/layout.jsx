import * as React from "react";

import Navbar from "./navbar";
import Footer from "./footer";
import AboutMe from "./aboutMe";
import TitleCard from "./titleCard";
import Resume from "./resume";
import Gallery from "./gallery";

import { usePageLoad } from "../hooks/usePageLoad";
import {
  parentContainer,
  childrenContainer,
  transitionAnimation,
} from "./layout.module.css";

const Layout = () => {
  const isComplete = usePageLoad();
  const titleRef = React.useRef(null);
  const aboutRef = React.useRef(null);
  const workRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const refs = [titleRef, aboutRef, workRef, projectsRef];
  return (
    <div className={parentContainer}>
      <Navbar isPageLoaded={isComplete} refs={refs} />
      <main
        className={
          isComplete
            ? `${childrenContainer} ${transitionAnimation}`
            : childrenContainer
        }
      >
        <TitleCard title="Title Card" refProp={titleRef}></TitleCard>
        <AboutMe title="About Me" refProp={aboutRef}></AboutMe>
        <Resume title="Resume" refProp={workRef}></Resume>
        <Gallery title="Photos" refProp={projectsRef}></Gallery>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
