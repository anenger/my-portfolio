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
      <Resume
        jobs={[
          [
            <>
              Software Engineer @{" "}
              <a
                href="https://microsoft.com"
                target="_blank"
                rel="noreferrer"
                className={hoverUnderlineAnimation}
              >
                Microsoft
              </a>
            </>,
            "Aug 2022 - Present",
          ],
          [
            <>
              Software Engineering QA Co-op @{" "}
              <a
                href="https://wellframe.com"
                target="_blank"
                rel="noreferrer"
                className={hoverUnderlineAnimation}
              >
                Wellframe
              </a>
            </>,
            "Feb 2021 - Jun 2021",
          ],
          [
            <>
              CorpIT Engineer Co-op @{" "}
              <a
                href="https://tripadvisor.com"
                target="_blank"
                rel="noreferrer"
                className={hoverUnderlineAnimation}
              >
                TripAdvisor
              </a>
            </>,
            "Jan 2020 - Jun 2020",
          ],
          [
            <>
              IT Intern @{" "}
              <a
                href="https://stadiumgoods.com"
                target="_blank"
                rel="noreferrer"
                className={hoverUnderlineAnimation}
              >
                Stadium Goods
              </a>
            </>,
            "Jun 2019 - Aug 2019",
          ],
        ]}
        descriptions={[
          [
            "Used React.js and Fluent UI to build functional components",
            "Updated styles to meet accessibility requirements",
          ],
          [
            "Built and refactored test suites for the application using Selenium Webdriver for Java.",
            "Built custom mock data loader using Python, MySQL, and Gitlab CI/CD for testing.",
            "Learned HIPAA compliance in technology.",
          ],
          [
            "Used HyperV, VMWare, Nutanix, Microsoft Exchange, Microsoft Active Directory, Powershell, and Bash to automate core IT functionality",
            "Created email purge scripts, tested VM infrastructure, installed VoIP systems, deployed various certificates",
          ],
          [
            "Learned Microsoft Intune and Microsoft Azure to roll out Device Management system for Mac, iOS and ChromeOS devices",
            "Set up wireless access points and servers using Ubiquiti and Cisco equipment",
          ],
        ]}
      ></Resume>
    </Layout>
  );
};

export const Head = () => <title>Home Page</title>;

export default IndexPage;
