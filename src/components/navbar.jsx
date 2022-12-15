import * as React from "react";

import { Link } from "gatsby";
import {
  navBox,
  navLinks,
  navLinkItem,
  navLinkText,
} from "./navbar.module.css";

const Navbar = () => {
  const elements = [
    { Home: "/" },
    { About: "#about" },
    { Work: "#work" },
    { Photos: "#projects" },
  ];

  return (
    <nav className={navBox}>
      <ul className={navLinks}>
        {elements.map((value, index) => (
          <li className={navLinkItem} index={index}>
            <Link to={Object.values(value)[0]} className={navLinkText}>
              {Object.keys(value)[0]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
