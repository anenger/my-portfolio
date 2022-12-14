import * as React from "react";

import { footer, footerDiv, footerLink, footerIcon } from "./footer.module.css";
import { hoverUnderlineAnimation } from "./global.module.css";
import { GrGatsbyjs } from "react-icons/gr";

const Footer = () => {
  return (
    <footer className={footer}>
      <div className={footerDiv}>
        <a
          href="https://github.com/anenger/my-portfolio"
          className={`${footerLink} ${hoverUnderlineAnimation}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          This site was built with Gatsby.js
        </a>
        <GrGatsbyjs className={footerIcon} />
      </div>
    </footer>
  );
};

export default Footer;
