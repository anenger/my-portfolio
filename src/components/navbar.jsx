import * as React from "react";

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

  return (
    <nav className={navBox}>
      <ul className={navLinks}>
        {elements.map((value, index) => (
          <li className={navLinkItem} index={index}>
            <a href={Object.values(value)[0]} className={navLinkText}>
              {Object.keys(value)[0]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
