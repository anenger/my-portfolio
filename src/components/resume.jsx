import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ResumeItem from "./resumeItem";

import { resumeDiv, resumeHeader, resumeJobList } from "./resume.module.css";

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
              <ResumeItem
                index={index}
                title={title}
                url={url}
                company={company}
                range={range}
                html={html}
              ></ResumeItem>
            );
          })}
      </div>
    </div>
  );
};

export default Resume;
