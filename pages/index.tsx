import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { Container, Stack, Box, Heading, Text, Button, Flex, Wrap, WrapItem, Image } from '@chakra-ui/react';
import { GithubLogo, TwitterLogo } from 'phosphor-react';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Linwood Dev</title>
        <meta name="description" content="Official Linwood Development Home Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>

        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              fontSize={{ base: "5xl", md: "6xl" }}
              lineHeight={'110%'}>
              Linwood{' '}
              <Text as={'span'} color={'green.400'}>
                Development
              </Text>
            </Heading>
            <Stack direction="row" justifyContent="center" spacing={3} alignItems="center">
              <Button
                onClick={() => router.push('#projects')} colorScheme="green" size="lg">Projects</Button>
              <Button
                onClick={() => router.push('#contact')} size="lg">Contact</Button>
            </Stack>
          </Stack>
        </Container>
        <Container maxW={'4xl'} id="contact">
          <Stack
            alignItems="stretch"
            as={Box}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              as="h2"
              fontSize="5xl"
              id="projects"
              lineHeight={'110%'}>
              Projects
            </Heading>
            <Heading
              fontWeight={600}
              as="h3"
              fontSize="3xl"
              id="apps"
              lineHeight={'110%'}>
              Apps
            </Heading>
            <ProjectCard banner="https://github.com/LinwoodCloud/butterfly/blob/develop/docs/static/img/banner.png?raw=true" name="Butterfly" description="Change the world" source="https://github.com/LinwoodCloud/butterfly" website="https://docs.butterfly.linwood.dev" big={true} />
            <Wrap justifyContent="center" spacing={3} alignContent="stretch">
              <WrapItem>
                <ProjectCard name="Dev-Doctor" description="Free, opensource, serverless learning platform" source="https://github.com/LinwoodCloud/dev_doctor" website="https://docs.dev-doctor.linwood.dev" />
              </WrapItem>

              <WrapItem>
                <ProjectCard name="Launch" description="Opensource start page" source="https://github.com/LinwoodCloud/Launcher" website="https://docs.launch.linwood.dev" />
              </WrapItem>
            </Wrap>
            <Heading
              fontWeight={600}
              as="h3"
              fontSize="3xl"
              id="bot"
              lineHeight={'110%'}>
              Bot
            </Heading>
            <Wrap justifyContent="center" spacing={3} alignContent="stretch">
              <WrapItem>
                <ProjectCard name="Linwood Bot" description="Modular, free, opensource, customizable discord bot" source="https://github.com/LinwoodCloud/Bot" />
              </WrapItem>
            </Wrap>
          </Stack>
        </Container>
        <Container maxW={'3xl'} id="contact">
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14 }}
            py={{ base: 20, md: 36 }}>
            <Heading
              fontWeight={600}
              as="h2"
              fontSize="5xl"
              lineHeight={'110%'}>
              Contact
            </Heading>
            <Stack direction="row" justifyContent="center" spacing={3} alignItems="center">
              <Button onClick={() => router.push("https://github.com/LinwoodCloud")} colorScheme="green" size="lg" leftIcon={<GithubLogo size={24} />}>GitHub</Button>
              <Button onClick={() => router.push("https://twitter.com/LinwoodCloud")} colorScheme="teal" size="lg" leftIcon={<TwitterLogo size={24} />}>Twitter</Button>
            </Stack>
          </Stack>
        </Container>
      </main>
      <Footer />
    </div>
  )
}

import React, { ReactElement } from 'react'

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
    <Flex flexDir="column" p={8} w={big ? "inherit" : "sm"} maxW={big ? "inherit" : "sm"} borderWidth="1px" borderRadius="lg" overflow="hidden" minH="100%">
      {banner &&
        <Image src={banner} layout="fixed" width="100%" height="100%" p={8} />
      }
      <Heading fontSize="lg">
        {name}
      </Heading>
      <Text flex={1} pt={4} pb={8}>
        {description}
      </Text>
      {(website || source) &&
        <Flex flexDir="row">
          {website &&
            <Button m={1} flex="1" colorScheme="green" onClick={() => router.push(website)}>View website</Button>
          }
          {source &&
            <Button m={1} flex="1" onClick={() => router.push(source)}>View source</Button>
          }
        </Flex>
      }
    </Flex>
  )
}


export default Home
