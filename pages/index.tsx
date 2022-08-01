import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { GithubLogo, TwitterLogo } from "phosphor-react";
import { useRouter } from "next/router";
import botPic from "../public/Bot.png";
import devDoctorPic from "../public/Dev-Doctor.png";
import launcherPic from "../public/Launcher.png";
import butterflyBannerPic from "../public/ButterflyBanner.png";
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import ProjectCard from "../components/Project";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Linwood Dev</title>
        <meta
          name="description"
          content="Official Linwood Development Home Page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container size={"lg"} style={{ minHeight: "100vh" }}>
          <Box mt="10em" mb={10}>
            <Title align="center" order={1} mb={10}>
              Linwood <Text color={"green"}>Development</Text>
            </Title>
            <Group spacing={3} position="center">
              <Button
                component={NextLink}
                href="#projects"
                color="green"
                size="lg"
              >
                Projects
              </Button>
              <Button component={NextLink} href="#contact" size="lg">
                Contact
              </Button>
            </Group>
          </Box>
        </Container>
        <Container size={"lg"} id="projects">
          <Box>
            <Title order={2}>Projects</Title>
            <Space h="md" />
            <Title order={3}>Apps</Title>
            <Space h="md" />
            <ProjectCard
              banner={butterflyBannerPic}
              name="Butterfly"
              description="Change the world"
              source="https://github.com/LinwoodCloud/butterfly"
              website="https://docs.butterfly.linwood.dev"
              blog="butterfly"
              big={true}
            />
            <Space h="md" />
            <Group noWrap={false} align="stretch" position="left">
              <ProjectCard
                banner={devDoctorPic}
                name="Dev-Doctor"
                description="Free, opensource, serverless learning platform"
                source="https://github.com/LinwoodCloud/dev_doctor"
                website="https://docs.dev-doctor.linwood.dev"
                blog="dev-doctor"
              />
              <ProjectCard
                banner={launcherPic}
                name="Launch"
                description="Opensource start page"
                source="https://github.com/LinwoodCloud/Launcher"
                website="https://docs.launch.linwood.dev"
                blog="launch"
              />
            </Group>
            <Space h="xl" />
            <Title order={3}>Bot</Title>
            <Space h="md" />
            <Group noWrap={false} align="stretch" position="left">
              <ProjectCard
                banner={botPic}
                name="Linwood Bot"
                description="Modular, free, opensource, customizable discord bot"
                source="https://github.com/LinwoodCloud/Bot"
              />
            </Group>
          </Box>
        </Container>
        <Container size={"lg"} id="contact">
          <Box sx={{ marginTop: "10em" }}>
            <Title align="center" order={2} mb={10}>
              Contact
            </Title>
            <Group spacing={3} position="center">
              <Button
                component={NextLink}
                href="https://github.com/LinwoodCloud"
                color="green"
                size="lg"
                leftIcon={<GithubLogo size={24} />}
              >
                GitHub
              </Button>
              <Button
                component={NextLink}
                href="https://twitter.com/LinwoodCloud"
                styles={(theme) => ({
                  root: {
                    backgroundColor: "#00acee",
                    border: 0,
                    paddingLeft: 20,
                    paddingRight: 20,

                    "&:hover": {
                      backgroundColor: theme.fn.darken("#00acee", 0.1),
                    },
                  },

                  leftIcon: {
                    marginRight: 15,
                  },
                })}
                size="lg"
                leftIcon={<TwitterLogo size={24} />}
              >
                Twitter
              </Button>
            </Group>
          </Box>
        </Container>
      </main>
    </>
  );
};


export default Home;
