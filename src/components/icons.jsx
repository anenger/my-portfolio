import * as React from "react";

import { VscGithub } from "react-icons/vsc";
import { AiOutlineLinkedin, AiOutlineMail } from "react-icons/ai";
import { PiSoundcloudLogoLight } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";

import { iconsDiv, iconStyle } from "./icons.module.css";
import { Link } from "gatsby";

const Icons = () => {
  const links = {
    github: "https://github.com/anenger",
    linkedin: "https://www.linkedin.com/in/andrew-enger/",
    email: "mailto:hi@anenger.com",
    soundcloud: "https://soundcloud.com/securecop?utm_campaign=social_sharing",
  };
  return (
    <div className={iconsDiv}>
      <a
        className={iconStyle}
        href={links["github"]}
        target="_blank"
        rel="noreferrer"
        aria-label="Github"
      >
        <VscGithub />
      </a>
      <a
        className={iconStyle}
        href={links["linkedin"]}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
      >
        <AiOutlineLinkedin />
      </a>
      <a
        className={iconStyle}
        href={links["email"]}
        target="_blank"
        rel="noreferrer"
        aria-label="Email me!"
      >
        <AiOutlineMail />
      </a>
      <a
        className={iconStyle}
        href={links["soundcloud"]}
        target="_blank"
        rel="noreferrer"
        aria-label="Soundcloud"
      >
        <PiSoundcloudLogoLight />
      </a>
      <a
        className={iconStyle}
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        aria-label="Resume"
      >
        <IoDocumentTextOutline />
      </a>
    </div>
  );
};

export default Icons;
