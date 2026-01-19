"use client";

import * as React from "react";

import { usePageLoad } from "../../hooks/usePageLoad";
import { childrenContainer, transitionAnimation } from "./layout.module.css";

export const LayoutShell = ({ children }) => {
  const isComplete = usePageLoad();

  return (
    <main
      className={
        isComplete
          ? `${childrenContainer} ${transitionAnimation}`
          : childrenContainer
      }
    >
      {children}
    </main>
  );
};
