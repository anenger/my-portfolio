import * as React from "react";

import { Link } from "gatsby";
import {
  navBox,
  navLinks,
  navLinkItem,
  navLinkText,
} from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={navBox}>
      <ul className={navLinks}>
        <li className={navLinkItem}>
          <Link to="/" className={navLinkText}>
            Home
          </Link>
        </li>
        <li className={navLinkItem}>
          <Link to="#about" className={navLinkText}>
            About
          </Link>
        </li>
        <li className={navLinkItem}>
          <Link to="#work" className={navLinkText}>
            Work
          </Link>
        </li>
        <li className={navLinkItem}>
          <Link to="#projects" className={navLinkText}>
            Projects
          </Link>
        </li>
        <li className={navLinkItem}>
          <Link to="/blog" className={navLinkText}>
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
