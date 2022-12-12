import * as React from "react";

import { hoverUnderlineAnimation } from "../components/global.module.css";

import {
  resumeJobItem,
  resumeJobFlexbox,
  resumeJobTitle,
  resumeJobDescriptionItem,
} from "./resumeItem.module.css";

const ResumeItem = ({ index, title, url, company, range, html }) => {
  return (
    <div className={resumeJobItem}>
      <div className={resumeJobFlexbox}>
        <span className={resumeJobTitle}>
          {`${title} @ `}
          <a href={url} className={hoverUnderlineAnimation}>
            {company}
          </a>
        </span>
        <span className={resumeJobTitle}>{range}</span>
      </div>
      <div
        className={resumeJobDescriptionItem}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
};

export default ResumeItem;
