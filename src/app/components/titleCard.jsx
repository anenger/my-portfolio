import * as React from "react";
import Image from "next/image";
import { Icons } from "./icons";
import headshot from "../../images/headshot.jpg";
import {
  titleDiv,
  titleText,
  titleHeading,
  titleSubHeading,
  titleDescription,
  titleImageDiv,
  titleImage,
} from "./titleCard.module.css";

export const TitleCard = () => {
  const title = "Hey! I'm Andrew 👋";
  const subtitle = "I'm a full-stack Software Engineer";

  return (
    <div className={titleDiv}>
      <div className={titleText}>
        <div className={titleHeading}>{title}</div>
        <div className={titleSubHeading}>{subtitle}</div>
        <p className={`${titleDescription}`}>
          I enjoy creating interactive experiences on the web. Currently, I work
          at CLEAR as a frontend engineer.
        </p>
        <Icons />
      </div>
      <div className={titleImageDiv}>
        <Image className={titleImage} src={headshot} alt={"Headshot of me"} />
      </div>
    </div>
  );
};
