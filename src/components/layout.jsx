import * as React from "react";

import Navbar from "./navbar";
import { container } from "./global.module.css";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className={container}>{children}</main>
    </div>
  );
};

export default Layout;
