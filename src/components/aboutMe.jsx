import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import {
  aboutMeDiv,
  aboutMeTitle,
  aboutMeDescription,
} from "./aboutMe.module.css";

const AboutMe = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      aboutMe: markdownRemark(
        fileAbsolutePath: { regex: "/content/aboutMe/" }
      ) {
        html
      }
    }
  `);

  const html = data.aboutMe.html;

  return (
    <div className={aboutMeDiv} id="about">
      <h2 className={aboutMeTitle}>{title}</h2>
      <div
        className={aboutMeDescription}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
};

export default AboutMe;
