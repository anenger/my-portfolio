import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Icons from "./icons";
import {
  titleDiv,
  titleText,
  titleHeading,
  titleSubHeading,
  titleDescription,
  titleImageDiv,
  titleImage,
} from "./titleCard.module.css";

const TitleCard = () => {
  const data = useStaticQuery(graphql`
    query {
      titleCard: markdownRemark(
        fileAbsolutePath: { regex: "/content/titleCard/" }
      ) {
        frontmatter {
          title
          subtitle
        }
        html
      }
    }
  `);

  const { frontmatter, html } = data.titleCard;
  const { title, subtitle } = frontmatter;

  return (
    <div className={titleDiv}>
      <div className={titleText}>
        <div className={titleHeading}>{title}</div>
        <div className={titleSubHeading}>{subtitle}</div>
        <p
          className={titleDescription}
          dangerouslySetInnerHTML={{ __html: html }}
        ></p>
        <Icons />
      </div>
      <div className={titleImageDiv}>
        <StaticImage
          className={titleImage}
          src={"../images/headshot.jpg"}
          alt={"Headshot of me"}
        ></StaticImage>
      </div>
    </div>
  );
};

export default TitleCard;
