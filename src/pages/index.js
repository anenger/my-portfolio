import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

import AboutMe from "../components/aboutMe";
import Layout from "../components/layout";
import TitleCard from "../components/titleCard";
import Resume from "../components/resume";

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
        image={
          <StaticImage
            src="../images/headshot.jpg"
            alt="Picture of me!"
          ></StaticImage>
        }
      ></TitleCard>
      <AboutMe
        title="About Me"
        description={
          <>
            <p>
              My journey into programming started at a young age, through making
              custom maps for Minecraft and Roblox as well as attempting to make
              my own mods. I was always interested in how computers worked, so
              in high school I decided to take a CS course, and I've been coding
              ever since.
            </p>
            <p>
              Over the years, I've had the pleasure of working at a digital
              health startup, a travel aggregator, and a luxury consignment
              company. Outside of work, you can probably find me researching the
              latest in espresso making, working out, skiing, or playing FIFA
              23.
            </p>
          </>
        }
      ></AboutMe>
      <Resume></Resume>
    </Layout>
  );
};

export const Head = () => <title>Andrew Enger</title>;

export default IndexPage;
