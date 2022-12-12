import * as React from "react";

import {
  titleDiv,
  titleText,
  titleHeading,
  titleSubHeading,
  titleDescription,
  titleImageDiv,
  titleImage,
} from "./titleCard.module.css";

import headshot from "../images/headshot.jpg";

const TitleCard = ({ title, subtitle, description }) => {
  return (
    <div className={titleDiv}>
      <div className={titleText}>
        <div className={titleHeading}>{title}</div>
        <div className={titleSubHeading}>{subtitle}</div>
        <p className={titleDescription}>{description}</p>
      </div>
      <div className={titleImageDiv}>
        <img className={titleImage} src={headshot} alt={"My face!"}></img>
      </div>
    </div>
  );
};

export default TitleCard;
