import * as React from "react";

import Navbar from "./navbar";
import { parentContainer, childrenContainer } from "./layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={parentContainer}>
      <Navbar />
      <main className={childrenContainer}>{children}</main>
    </div>
  );
};

export default Layout;
