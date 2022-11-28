import * as React from "react";

import {
  titleDiv,
  titleText,
  titleHeading,
  titleSubHeading,
  titleDescription,
  titleImage,
} from "./titleCard.module.css";

const TitleCard = ({ title, subtitle, description, image }) => {
  return (
    <div className={titleDiv}>
      <div className={titleText}>
        <div className={titleHeading}>{title}</div>
        <div className={titleSubHeading}>{subtitle}</div>
        <p className={titleDescription}>{description}</p>
      </div>
      <div className={titleImage}>{image}</div>
    </div>
  );
};

export default TitleCard;
