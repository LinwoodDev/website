import { Card, Container, Group, Space, Text, Title } from "@mantine/core";
import React from "react";
import Head from "next/head";
import NextLink from "next/link";
import { getPostTags } from "../../../lib/blog";

type Props = {
  tags: string[];
};

export default function TagsPage({ tags }: Props) {
  return (
    <>
      <Head>
        <title>Linwood Blog</title>
      </Head>

      <main>
        <Container size="sm">
          <Title order={1}>Tags</Title>
          <Space h={"xl"} />
          <Group direction="column" spacing={16} align="stretch">
            {tags.map((tag) => (
              <NextLink key={tag} href={`/blog/tag/${tag}`} passHref>
                <Card withBorder style={{ cursor: "pointer" }}>
                  <Text size="md">{tag}</Text>
                </Card>
              </NextLink>
            ))}
          </Group>
        </Container>
      </main>
    </>
  );
}
export const getStaticProps = async () => {
  const tags = getPostTags();

  return {
    props: { tags },
  };
};
