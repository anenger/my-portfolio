import * as React from "react";

import {
  titleDiv,
  titleText,
  titleHeading,
  titleSubHeading,
  titleDescription,
  titleImageDiv,
} from "./titleCard.module.css";

const TitleCard = ({ title, subtitle, description }) => {
  return (
    <div className={titleDiv}>
      <div className={titleText}>
        <div className={titleHeading}>{title}</div>
        <div className={titleSubHeading}>{subtitle}</div>
        <p className={titleDescription}>{description}</p>
      </div>
      <div className={titleImageDiv}></div>
    </div>
  );
};

export default TitleCard;
