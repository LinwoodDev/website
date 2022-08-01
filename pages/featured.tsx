import { Box, Button, Container, Group, Space, Text, Title } from '@mantine/core'
import { NextLink } from '@mantine/next';
import Head from 'next/head'
import React from 'react'
import ProjectCard, { ProjectCardProps } from '../components/Project';

const Featured: ProjectCardProps[] = [
];

export default function FeaturedPage() {
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
                    <Box sx={{ marginTop: "10em" }}>
                        <Title align="center" order={1}>
                            Featured
                        </Title>
                        <Space h="md" />
                        <Group noWrap={false} align="stretch" position="center">
                            {Featured.map((feature) => (
                                <ProjectCard {...feature} key={feature.name} />
                            ))}
                        </Group>
                    </Box>
                </Container>
            </main>
        </>
    )
}