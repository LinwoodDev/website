import type { NextPage } from 'next'
import Head from 'next/head'
import React, { ReactElement } from 'react'
import LinwoodHeader from '../components/LinwoodHeader'
import { GithubLogo, TwitterLogo } from 'phosphor-react';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { Box, Button, Card, Container, Grid, Group, Image, Text, Title } from '@mantine/core';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Linwood Dev</title>
        <meta name="description" content="Official Linwood Development Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LinwoodHeader />

      <main>

        <Container size={'lg'} sx={{ minHeight: "100vh" }}>
          <Box>
            <Title align="center" order={1}>
              Linwood{' '}
              <Text color={'green'}>
                Development
              </Text>
            </Title>
            <Group spacing={3} position="center">
              <Button
                onClick={() => router.push('#projects')} color="green" size="lg">Projects</Button>
              <Button
                onClick={() => router.push('#contact')} size="lg">Contact</Button>
            </Group>
          </Box>
        </Container>
        <Container size={'lg'} id="projects">
          <Box>
            <Title order={2}>
              Projects
            </Title>
            <Title order={3}>
              Apps
            </Title>
            <ProjectCard banner="https://github.com/LinwoodCloud/butterfly/blob/develop/docs/static/img/banner.png?raw=true" name="Butterfly" description="Change the world" source="https://github.com/LinwoodCloud/butterfly" website="https://docs.butterfly.linwood.dev" big={true} />
            <Grid gutter={3}>
              <Grid.Col>
                <ProjectCard name="Dev-Doctor" description="Free, opensource, serverless learning platform" source="https://github.com/LinwoodCloud/dev_doctor" website="https://docs.dev-doctor.linwood.dev" />
              </Grid.Col>

              <Grid.Col>
                <ProjectCard name="Launch" description="Opensource start page" source="https://github.com/LinwoodCloud/Launcher" website="https://docs.launch.linwood.dev" />
              </Grid.Col>
            </Grid>
            <Title order={3}>
              Bot
            </Title>
            <Grid gutter={3}>
              <Grid.Col>
                <ProjectCard name="Linwood Bot" description="Modular, free, opensource, customizable discord bot" source="https://github.com/LinwoodCloud/Bot" />
              </Grid.Col>
            </Grid>
          </Box>
        </Container>
        <Container size={'lg'} id="contact">
          <Box>
            <Title order={2}>
              Contact
            </Title>
            <Group spacing={3} position="center">
              <Button onClick={() => router.push("https://github.com/LinwoodCloud")} color="green" size="lg" leftIcon={<GithubLogo size={24} />}>GitHub</Button>
              <Button onClick={() => router.push("https://twitter.com/LinwoodCloud")} color="teal" size="lg" leftIcon={<TwitterLogo size={24} />}>Twitter</Button>
            </Group>
          </Box>
        </Container>
      </main>
      <Footer />
    </div>
  )
}


interface ProjectCardProps {
  name: string;
  description: string;
  website?: string;
  source?: string;
  big?: boolean;
  banner?: string;
}

export function ProjectCard({ name, description, website, source, big, banner }: ProjectCardProps): ReactElement {
  const router = useRouter();
  return (
    <div style={{ minWidth: 340, margin: 'auto' }}>
      <Card shadow="sm">
        {banner &&
          <Card.Section>
            <Image src={banner} width="100%" height="100%" alt="Banner" />
          </Card.Section>
        }
        <Text size="lg">
          {name}
        </Text>
        <Text>
          {description}
        </Text>
        {(website || source) &&
          <Group>
            {website &&
              <Button color="green" onClick={() => router.push(website)}>View website</Button>
            }
            {source &&
              <Button onClick={() => router.push(source)}>View source</Button>
            }
          </Group>
        }
      </Card>
    </div>
  )
}


export default Home
