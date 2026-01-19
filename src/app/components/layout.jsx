import * as React from "react";

import { Footer } from "./footer";
import { AboutMe } from "./aboutMe";
import { TitleCard } from "./titleCard";
import { Resume } from "./resume";
import { Gallery } from "./gallery";
import { Integrations } from "./integrations";
import { LayoutShell } from "./layoutShell";

import { parentContainer } from "./layout.module.css";

export const Layout = () => {
  return (
    <div className={parentContainer}>
      <LayoutShell>
        <TitleCard title="Title Card"></TitleCard>
        <AboutMe title="About Me" />
        <Integrations title="What I'm Into"></Integrations>
        <Resume title="Resume" />
        <Gallery title="Photos"></Gallery>
      </LayoutShell>
      <Footer />
    </div>
  );
};
