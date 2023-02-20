import * as React from "react";
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
import { hoverUnderlineAnimation } from "./global.module.css";

const TitleCard = () => {
  const title = "Hey! I'm Andrew 👋";
  const subtitle = "I'm a full-stack Software Engineer";

  return (
    <div className={titleDiv}>
      <div className={titleText}>
        <div className={titleHeading}>{title}</div>
        <div className={titleSubHeading}>{subtitle}</div>
        <p className={`${titleDescription}`}>
          I enjoy creating interactive experiences on the web. Currently, I work
          at Microsoft using technologies such as React, Node, Typescript, and
          Azure on the{" "}
          <a
            href={"https://loop.microsoft.com/learn"}
            className={hoverUnderlineAnimation}
            style={{
              color: "var(--title-text-color)",
            }}
          >
            Microsoft Loop
          </a>{" "}
          team.
        </p>
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
