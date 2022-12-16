import * as React from "react";

import { navLinkItem, navLinkText } from "./navItem.module.css";

const NavItem = ({ link, title, index, menuCallback }) => {
  return (
    <li className={navLinkItem} index={index}>
      <a href={link} className={navLinkText} onClick={menuCallback}>
        {title}
      </a>
    </li>
  );
};

export default NavItem;
