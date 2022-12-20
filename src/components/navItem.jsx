import * as React from "react";

import {
  navLinkItem,
  navLinkText,
  transitionAnimation,
} from "./navItem.module.css";

const NavItem = ({ title, index, onClick, isPageLoaded }) => {
  return (
    <li
      className={
        isPageLoaded ? `${navLinkItem} ${transitionAnimation}` : navLinkItem
      }
      index={index}
    >
      <button className={navLinkText} onClick={() => onClick(index)}>
        {title}
      </button>
    </li>
  );
};

export default NavItem;
