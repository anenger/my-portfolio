import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
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

const TitleCard = ({ title, subtitle, description }) => {
  const headshotFile = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "headshot.jpg" }) {
        name
        childImageSharp {
          gatsbyImageData(width: 1000, quality: 90, placeholder: BLURRED)
        }
      }
    }
  `);

  let image = getImage(headshotFile.file);
  let alt = headshotFile.file.name;

  return (
    <div className={titleDiv}>
      <div className={titleText}>
        <div className={titleHeading}>{title}</div>
        <div className={titleSubHeading}>{subtitle}</div>
        <p className={titleDescription}>{description}</p>
        <Icons />
      </div>
      <div className={titleImageDiv}>
        <GatsbyImage
          className={titleImage}
          image={image}
          alt={alt}
        ></GatsbyImage>
      </div>
    </div>
  );
};

export default TitleCard;
