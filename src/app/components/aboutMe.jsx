import * as React from "react";

import styles from "./aboutMe.module.css";
import Content from "../../content/aboutMe/index.md";

const getRelativeTime = (dateString) => {
  if (!dateString) {
    return "";
  }

  // Append T00:00:00 to parse as local midnight instead of UTC midnight
  const date = new Date(dateString + "T00:00:00");
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (diffDays < 7) return rtf.format(-diffDays, "day");
  if (diffDays < 30) return rtf.format(-Math.round(diffDays / 7), "week");
  if (diffDays < 365) return rtf.format(-Math.round(diffDays / 30), "month");
  return rtf.format(-Math.round(diffDays / 365), "year");
};

export const AboutMe = ({ title, updated }) => {
  const relativeTime = getRelativeTime(updated);

  return (
    <div className={styles.aboutMeDiv}>
      <h2 className={styles.aboutMeTitle}>{title}</h2>
      {relativeTime && (
        <span className={styles.aboutMeUpdated}>
          Last updated: {relativeTime}
        </span>
      )}
      <div className={styles.aboutMeTextFlex}>
        <div className={styles.aboutMeDescription}>
          <Content />
        </div>
      </div>
    </div>
  );
};
