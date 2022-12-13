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
      <a className={iconStyle} href={links["github"]}>
        <VscGithub />
      </a>
      <a className={iconStyle} href={links["linkedin"]}>
        <AiOutlineLinkedin />
      </a>
      <a className={iconStyle} href={links["email"]}>
        <AiOutlineMail />
      </a>
    </div>
  );
};

export default Icons;
