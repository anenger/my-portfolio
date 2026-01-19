import * as React from "react";
import { ResumeItem } from "./resumeItem";

import { resumeDiv, resumeHeader, resumeJobList } from "./resume.module.css";

export const Resume = ({ jobs }) => {
  return (
    <div className={resumeDiv}>
      <h2 className={resumeHeader}>Where I've Worked</h2>
      <div className={resumeJobList}>
        {jobs &&
          jobs.map((job, index) => {
            const { frontmatter, content } = job;
            const { title, url, company, range, location } = frontmatter;

            return (
              <ResumeItem
                key={`${company}-${title}-${index}`}
                index={index}
                location={location}
                title={title}
                url={url}
                company={company}
                range={range}
                content={content}
              ></ResumeItem>
            );
          })}
      </div>
    </div>
  );
};
