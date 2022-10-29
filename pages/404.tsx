import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import Head from "next/head";
import React from "react";

const useStyles = createStyles((theme) => ({
  label: {
    fontSize: "300px",
    fontWeight: "bold",
    color: theme.colors.primary,
    [theme.fn.smallerThan("md")]: {
      fontSize: "100px",
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: "50px",
    },
  },
}));

type Props = {};

export default function NotFoundPage({}: Props) {
  const { classes } = useStyles();
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
            <Title className={classes.label} align="center" order={1}>
              404
            </Title>
            <Text color="dimmed" size="lg" align="center">
              The link you clicked does not exist.
            </Text>
            <Group spacing={3} position="center" mt={16}>
              <Button component={NextLink} href="/" color="green" legacyBehavior>
                Back to home
              </Button>
            </Group>
          </Box>
        </Container>
      </main>
    </>
  );
}
