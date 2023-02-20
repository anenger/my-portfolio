import * as React from "react";

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
  return (
    <div className={parentContainer}>
      <main
        className={
          isComplete
            ? `${childrenContainer} ${transitionAnimation}`
            : childrenContainer
        }
      >
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
