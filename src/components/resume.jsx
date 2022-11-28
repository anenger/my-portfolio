import * as React from "react";

import {
  resumeDiv,
  resumeHeader,
  resumeJobList,
  resumeJobItem,
  resumeJobText,
  resumeJobDescription,
} from "./resume.module.css";

const Resume = ({ jobs, descriptions }) => {
  return (
    <div className={resumeDiv}>
      <div className={resumeHeader}>Where I've Worked</div>
      <ul className={resumeJobList}>
        {jobs.map((job, index) => {
          return (
            <li className={resumeJobItem} key={index}>
              <div className={resumeJobText}>{job}</div>
              <div className={resumeJobDescription}>{descriptions[index]}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Resume;
