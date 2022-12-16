import * as React from "react";

import { hoverUnderlineAnimation } from "../components/global.module.css";

import {
  resumeJobItem,
  resumeJobFlexbox,
  resumeJobTitle,
  resumeJobCompany,
  resumeJobDescriptionItem,
} from "./resumeItem.module.css";

const ResumeItem = ({ index, title, url, company, range, html }) => {
  return (
    <div className={resumeJobItem}>
      <div className={resumeJobFlexbox} id={`resume-title-${index}`}>
        <a
          href={url}
          className={`${resumeJobCompany} ${hoverUnderlineAnimation}`}
        >
          {company}
        </a>
        <span className={resumeJobTitle}>{title}</span>
        <span className={resumeJobTitle}>{range}</span>
      </div>
      <div
        id={`resume-description-${index}`}
        className={resumeJobDescriptionItem}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
};

export default ResumeItem;
