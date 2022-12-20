import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LastFM from "./lastFM";

import {
  aboutMeDiv,
  aboutMeTitle,
  aboutMeFlex,
  aboutMeDescription,
} from "./aboutMe.module.css";

const AboutMe = ({ title, refProp }) => {
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
    <div className={aboutMeDiv} ref={refProp}>
      <h2 className={aboutMeTitle}>{title}</h2>
      <div className={aboutMeFlex}>
        <div
          className={aboutMeDescription}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <LastFM></LastFM>
      </div>
    </div>
  );
};

export default AboutMe;
