import * as React from "react";

import { VscGithub } from "react-icons/vsc";
import { AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";

import { iconsDiv, iconStyle } from "./icons.module.css";

const Icons = () => {
  const links = {
    github: "https://github.com/anenger",
    linkedin: "https://www.linkedin.com/in/andrew-enger/",
    email: "mailto:hi@anenger.com",
  };
  return (
    <div className={iconsDiv}>
      <a
        className={iconStyle}
        href={links["github"]}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label="Github"
      >
        <VscGithub />
      </a>
      <a
        className={iconStyle}
        href={links["linkedin"]}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label="LinkedIn"
      >
        <AiOutlineLinkedin />
      </a>
      <a
        className={iconStyle}
        href={links["email"]}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label="Email me!"
      >
        <AiOutlineMail />
      </a>
    </div>
  );
};

export default Icons;
