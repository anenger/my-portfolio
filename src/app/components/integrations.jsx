"use client";

import * as React from "react";

import { LastFM } from "./lastFM";
import { Faceit } from "./faceit";
import { Letterboxd } from "./letterboxd";
import { Goodreads } from "./goodreads";

import {
  integrationsDiv,
  integrationsTitle,
  integrationsGrid,
} from "./integrations.module.css";

export const Integrations = ({ title }) => {
  return (
    <div className={integrationsDiv}>
      <h2 className={integrationsTitle}>{title}</h2>
      <div className={integrationsGrid}>
        <LastFM />
        <Faceit />
        <Letterboxd />
        <Goodreads />
      </div>
    </div>
  );
};
