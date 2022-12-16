import * as React from "react";

import {
  navLinkItem,
  navLinkText,
  transitionAnimation,
} from "./navItem.module.css";

const NavItem = ({ link, title, index, menuCallback, isPageLoaded }) => {
  return (
    <li
      className={
        isPageLoaded ? `${navLinkItem} ${transitionAnimation}` : navLinkItem
      }
      index={index}
    >
      <a href={link} className={navLinkText} onClick={menuCallback}>
        {title}
      </a>
    </li>
  );
};

export default NavItem;
