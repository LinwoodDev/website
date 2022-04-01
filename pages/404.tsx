import { Box, Button, Container, Group, Text, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import LinwoodHeader from "../components/LinwoodHeader";

type Props = {};

export default function NotFoundPage({}: Props) {
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

      <LinwoodHeader />

      <main>
        <Container size={"lg"} style={{ minHeight: "100vh" }}>
          <Box sx={{ marginTop: "10em" }}>
            <Title align="center" order={1}>
              404
            </Title>
            <Text align="center">The link you clicked does not exist.</Text>
            <Group spacing={3} position="center" mt={16}>
              <Button component={NextLink} href="/" color="green">
                Back to home
              </Button>
            </Group>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
}
