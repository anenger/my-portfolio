import * as React from "react";

import {
  aboutMeDiv,
  aboutMeText,
  aboutMeTitle,
  aboutMeDescription,
} from "./aboutMe.module.css";

const AboutMe = ({ title, description }) => {
  return (
    <div className={aboutMeDiv}>
      <div className={aboutMeText}>
        <div className={aboutMeTitle}>{title}</div>
        <p className={aboutMeDescription}>{description}</p>
      </div>
    </div>
  );
};

export default AboutMe;
