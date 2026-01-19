"use client";

import * as React from "react";

import { footer, footerDiv, footerLink, footerIcon } from "./footer.module.css";
import { SiNextdotjs } from "react-icons/si";
import { DeploymentStatus } from "./deploymentStatus";

export const Footer = () => {
  return (
    <footer className={footer}>
      <div className={footerDiv}>
        <a
          href="https://github.com/anenger/my-portfolio"
          className={footerLink}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          Built with Next.js
        </a>
        <SiNextdotjs className={footerIcon} />
      </div>
      <DeploymentStatus />
    </footer>
  );
};
