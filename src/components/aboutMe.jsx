import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import LastFM from "./lastFM";
import TimeSince from "./timeSince";

import {
  aboutMeDiv,
  aboutMeTitle,
  aboutMeFlex,
  aboutMeTextFlex,
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
    <div className={aboutMeDiv}>
      <h2 className={aboutMeTitle}>{title}</h2>
      <div className={aboutMeFlex}>
        <div className={aboutMeTextFlex}>
          <div
            className={aboutMeDescription}
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
          <TimeSince />
        </div>
        <LastFM />
      </div>
    </div>
  );
};

export default AboutMe;
