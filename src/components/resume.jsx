import * as React from "react";

import {
  resumeDiv,
  resumeHeader,
  resumeJobList,
  resumeJobItem,
  resumeJobText,
  resumeJobFlexbox,
  resumeJobDescriptionList,
  resumeJobDescriptionItem,
} from "./resume.module.css";

const Resume = ({ jobs, descriptions }) => {
  return (
    <div className={resumeDiv} id="work">
      <h2 className={resumeHeader}>Where I've Worked</h2>
      <div className={resumeJobList}>
        {jobs.map((job, index) => {
          return (
            <div className={resumeJobItem} key={index}>
              <div className={resumeJobFlexbox}>
                {job.map((element) => {
                  return <div className={resumeJobText}>{element}</div>;
                })}
              </div>
              <ul className={resumeJobDescriptionList}>
                {descriptions[index].map((description) => {
                  return (
                    <li className={resumeJobDescriptionItem}>{description}</li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resume;
