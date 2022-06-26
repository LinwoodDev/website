import { Container, Group, Space, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { BlogEntryCard } from "../..";
import { useRouter } from "next/router";
import { generateRssFeed, getAllPosts } from "../../../../lib/blog";
import PostType from "../../../../types/post";

export default function BlogMonthPage({ allPosts }: { allPosts: PostType[] }) {
  const router = useRouter();
  const { year, month } = router.query;
  return (
    <>
      <Head>
        <title>Linwood Blog</title>
      </Head>

      <main>
        <Container size="sm">
          <Title order={1}>
            Blog {year}-{("0" + month).slice(-2)}
          </Title>
          <Space h={"xl"} />
          <Group direction="column" spacing={16} align="stretch">
            {allPosts.map((post) => (
              <BlogEntryCard key={post.fileName} post={post} />
            ))}
          </Group>
        </Container>
      </main>
    </>
  );
}
type Params = {
  params: {
    year: string;
    month: string;
  };
};
export const getStaticProps = async ({ params }: Params) => {
  await generateRssFeed();
  const { year, month } = params;
  const allPosts = getAllPosts().filter(
    (post) =>
      post.date.year === parseInt(year) && post.date.month === parseInt(month)
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
          month: ("0" + post.date.month.toString()).slice(-2),
        },
      };
    }),
    fallback: false,
  };
}
