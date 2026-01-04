import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import {
  aboutMeDiv,
  aboutMeTitle,
  aboutMeTextFlex,
  aboutMeDescription,
  aboutMeUpdated,
} from "./aboutMe.module.css";

const getRelativeTime = (dateString) => {
  // Append T00:00:00 to parse as local midnight instead of UTC midnight
  const date = new Date(dateString + "T00:00:00");
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffDays < 7) return rtf.format(-diffDays, "day");
  if (diffDays < 30) return rtf.format(-Math.round(diffDays / 7), "week");
  if (diffDays < 365) return rtf.format(-Math.round(diffDays / 30), "month");
  return rtf.format(-Math.round(diffDays / 365), "year");
};

export const AboutMe = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      aboutMe: markdownRemark(
        fileAbsolutePath: { regex: "/content/aboutMe/" }
      ) {
        html
        frontmatter {
          updated
        }
      }
    }
  `);

  const html = data.aboutMe.html;
  const updated = data.aboutMe.frontmatter.updated;
  const relativeTime = getRelativeTime(updated);

  return (
    <div className={aboutMeDiv}>
      <h2 className={aboutMeTitle}>{title}</h2>
      <span className={aboutMeUpdated}>Last updated: {relativeTime}</span>
      <div className={aboutMeTextFlex}>
        <div
          className={aboutMeDescription}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </div>
    </div>
  );
};
