import type { NextPage } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";
import LinwoodHeader from "../components/LinwoodHeader";
import { GithubLogo, TwitterLogo } from "phosphor-react";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Linwood Dev</title>
        <meta
          name="description"
          content="Official Linwood Development Home Page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LinwoodHeader />

      <main>
        <Container size={"lg"} style={{ minHeight: "100vh" }}>
          <Box sx={{ marginTop: "10em" }}>
            <Title align="center" order={1}>
              Linwood <Text color={"green"}>Development</Text>
            </Title>
            <Group spacing={3} position="center">
              <Button
                onClick={() => router.push("#projects")}
                color="green"
                size="lg"
              >
                Projects
              </Button>
              <Button onClick={() => router.push("#contact")} size="lg">
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
              banner="https://github.com/LinwoodCloud/Butterfly/blob/develop/docs/static/img/banner.png?raw=true"
              name="Butterfly"
              description="Change the world"
              source="https://github.com/LinwoodCloud/butterfly"
              website="https://docs.butterfly.linwood.dev"
              big={true}
            />
            <Space h="md" />
            <Group noWrap={false} align="stretch" position="left">
              <ProjectCard
                banner="/Dev-Doctor.png"
                name="Dev-Doctor"
                description="Free, opensource, serverless learning platform"
                source="https://github.com/LinwoodCloud/dev_doctor"
                website="https://docs.dev-doctor.linwood.dev"
              />
              <ProjectCard
                banner="/Launcher.png"
                name="Launch"
                description="Opensource start page"
                source="https://github.com/LinwoodCloud/Launcher"
                website="https://docs.launch.linwood.dev"
              />
            </Group>
            <Space h="xl" />
            <Title order={3}>Bot</Title>
            <Space h="md" />
            <Group noWrap={false} align="stretch" position="left">
              <ProjectCard
                banner="/Bot.png"
                name="Linwood Bot"
                description="Modular, free, opensource, customizable discord bot"
                source="https://github.com/LinwoodCloud/Bot"
              />
            </Group>
          </Box>
        </Container>
        <Container size={"lg"} id="contact">
          <Box sx={{ marginTop: "10em" }}>
            <Title align="center" order={2}>
              Contact
            </Title>
            <Group spacing={3} position="center">
              <Button
                onClick={() => router.push("https://github.com/LinwoodCloud")}
                color="green"
                size="lg"
                leftIcon={<GithubLogo size={24} />}
              >
                GitHub
              </Button>
              <Button
                onClick={() => router.push("https://twitter.com/LinwoodCloud")}
                color="teal"
                size="lg"
                leftIcon={<TwitterLogo size={24} />}
              >
                Twitter
              </Button>
            </Group>
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

interface ProjectCardProps {
  name: string;
  description: string;
  website?: string;
  source?: string;
  big?: boolean;
  banner?: string;
}

export function ProjectCard({
  name,
  description,
  website,
  source,
  big,
  banner,
}: ProjectCardProps): ReactElement {
  return (
    <Card
      radius={18}
      shadow="sm"
      style={{
        maxWidth: big ? "" : "20em",
        minHeight: "20em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {banner && (
        <>
          <Card.Section>
            <Image src={banner} width="100%" height="100%" alt="Banner" />
          </Card.Section>
          <Space h="sm" />
        </>
      )}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Text weight={700} mt={"xs"} size="lg">
          {name}
        </Text>
        <Text>{description}</Text>
      </Box>
      <Space h="md" />
      {(website || source) && (
        <Group>
          {website && (
            <Button
              sx={{ flex: 1 }}
              fullWidth
              color="green"
              component={NextLink}
              href={website}
            >
              View website
            </Button>
          )}
          {source && (
            <Button
              sx={{ flex: 1 }}
              fullWidth
              component={NextLink}
              href={source}
            >
              View source
            </Button>
          )}
        </Group>
      )}
    </Card>
  );
}

export default Home;
