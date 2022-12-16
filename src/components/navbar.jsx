import * as React from "react";
import { useWidth } from "../hooks/useWidth";
import { AiOutlineMenu } from "react-icons/ai";

import {
  navBox,
  navLinks,
  navLinkItem,
  navLinkText,
} from "./navbar.module.css";

const Navbar = () => {
  const elements = [
    { Home: "#title" },
    { About: "#about" },
    { Work: "#work" },
    { Photos: "#projects" },
  ];

  const { isMobile } = useWidth();

  return (
    <nav className={navBox}>
      <ul className={navLinks}>
        {isMobile ? (
          <li className={navLinkItem}>
            <a className={navLinkText} href="#burger">
              <AiOutlineMenu />
            </a>
          </li>
        ) : (
          elements.map((value, index) => (
            <li className={navLinkItem} index={index}>
              <a href={Object.values(value)[0]} className={navLinkText}>
                {Object.keys(value)[0]}
              </a>
            </li>
          ))
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
