import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

import {
  resumeDiv,
  resumeHeader,
  resumeJobList,
  resumeJobItem,
  resumeJobFlexbox,
  resumeJobDescriptionList,
} from "./resume.module.css";

import { hoverUnderlineAnimation } from "../components/global.module.css";

const Resume = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;

  return (
    <div className={resumeDiv} id="work">
      <h2 className={resumeHeader}>Where I've Worked</h2>
      <div className={resumeJobList}>
        {jobsData &&
          jobsData.map(({ node }, index) => {
            const { frontmatter, html } = node;
            const { title, url, company, range } = frontmatter;

            return (
              <div className={resumeJobItem} key={index}>
                <div className={resumeJobFlexbox}>
                  <span>
                    {`${title} @ `}
                    <a href={url} className={hoverUnderlineAnimation}>
                      {company}
                    </a>
                  </span>
                  <span>{range}</span>
                </div>
                <ul
                  className={resumeJobDescriptionList}
                  dangerouslySetInnerHTML={{ __html: html }}
                ></ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Resume;
