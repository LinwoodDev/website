import { Container, Group, Space, Stack, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { BlogEntryCard } from "..";
import { useRouter } from "next/router";
import { generateRssFeed, getAllPosts } from "../../../lib/blog";
import PostType from "../../../types/post";

export default function BlogYearPage({ allPosts }: { allPosts: PostType[] }) {
  const router = useRouter();
  const { year } = router.query;
  return (
    <>
      <Head>
        <title>Linwood Blog</title>
      </Head>

      <main>
        <Container size="sm">
          <Title order={1}>Blog {year}</Title>
          <Space h={"xl"} />
          <Stack spacing={16} align="stretch">
            {allPosts.map((post) => (
              <BlogEntryCard key={post.fileName} post={post} />
            ))}
          </Stack>
        </Container>
      </main>
    </>
  );
}
type Params = {
  params: {
    year: string;
  };
};
export const getStaticProps = async ({ params }: Params) => {
  await generateRssFeed();
  const { year } = params;
  const allPosts = getAllPosts().filter(
    (post) => post.date.year === parseInt(year)
  );

  return {
    props: { allPosts },
  };
};

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          year: post.date.year.toString(),
        },
      };
    }),
    fallback: false,
  };
}
