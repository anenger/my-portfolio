import * as React from "react";

import AboutMe from "../components/aboutMe";
import Layout from "../components/layout";
import TitleCard from "../components/titleCard";
import Resume from "../components/resume";
import SeoItem from "../components/seo";

import { hoverUnderlineAnimation } from "../components/global.module.css";

const IndexPage = () => {
  return (
    <Layout pageTitle="Andrew's Portfolio">
      <TitleCard
        title="Hi, I'm Andrew Enger"
        subtitle="I'm a full-stack Software Engineer"
        description={
          <>
            I enjoy creating interactive experiences on the web. Currently, I
            work at Microsoft using technologies such as React, Node,
            Typescript, and Azure on the{" "}
            <a
              href="https://loop.microsoft.com/learn"
              target="_blank"
              rel="noreferrer"
              className={hoverUnderlineAnimation}
            >
              Microsoft Loop
            </a>{" "}
            team.
          </>
        }
      ></TitleCard>
      <AboutMe title="About Me"></AboutMe>
      <Resume></Resume>
    </Layout>
  );
};

export const Head = () => <SeoItem />;

export default IndexPage;
