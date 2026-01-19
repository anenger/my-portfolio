import * as React from "react";

import {
  resumeJobItem,
  resumeJobFlexbox,
  resumeJobTitle,
  resumeJobCompany,
  resumeJobDescriptionItem,
} from "./resumeItem.module.css";

export const ResumeItem = ({
  index,
  location,
  title,
  url,
  company,
  range,
  content,
}) => {
  return (
    <div className={resumeJobItem}>
      <div className={resumeJobFlexbox} id={`resume-title-${index}`}>
        <a href={url} className={resumeJobCompany}>
          {company}
        </a>
        <span className={resumeJobTitle}>{title}</span>
        <span className={resumeJobTitle}>{range}</span>
        <span className={resumeJobTitle}>{location}</span>
      </div>
      <div
        id={`resume-description-${index}`}
        className={resumeJobDescriptionItem}
      >
        {content}
      </div>
    </div>
  );
};
