import * as React from "react";

import {
  aboutMeDiv,
  aboutMeText,
  aboutMeTitle,
  aboutMeDescription,
} from "./aboutMe.module.css";

const AboutMe = ({ title, description }) => {
  return (
    <div className={aboutMeDiv} id={"about"}>
      <div className={aboutMeText}>
        <div className={aboutMeTitle}>{title}</div>
        <div className={aboutMeDescription}>{description}</div>
      </div>
    </div>
  );
};

export default AboutMe;
