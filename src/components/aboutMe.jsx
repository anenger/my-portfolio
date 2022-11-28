import * as React from "react";

import {
  aboutMeContainer,
  aboutMeText,
  aboutMeTitle,
  aboutMeDescription,
} from "./aboutMe.module.css";

const AboutMe = ({ title, description }) => {
  return (
    <div className={aboutMeContainer}>
      <div className={aboutMeText}>
        <h1 className={aboutMeTitle}>{title}</h1>
        <p className={aboutMeDescription}>{description}</p>
      </div>
    </div>
  );
};

export default AboutMe;
