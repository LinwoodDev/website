import { Container, Group, Space, Stack, Title } from "@mantine/core";
import Head from "next/head";
import React from "react";
import { BlogEntryCard } from "../../..";
import { useRouter } from "next/router";
import { generateRssFeed, getAllPosts } from "../../../../../lib/blog";
import PostType from "../../../../../types/post";
import { GetStaticProps } from "next";

export default function BlogDayPage({ allPosts }: { allPosts: PostType[] }) {
  const router = useRouter();
  const { year, month, day } = router.query;
  return (
    <>
      <Head>
        <title>{`Linwood Blog - ${year}-${month}-${day}`}</title>
      </Head>

      <main>
        <Container size="sm">
          <Title order={1}>
            Blog {year}-{("0" + month).slice(-2)}-{("0" + day).slice(-2)}
          </Title>
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
    month: string;
    day: string;
  };
};
export const getStaticProps = async ({ params }: Params) => {
  await generateRssFeed();
  const { year, month, day } = params;
  const allPosts = getAllPosts().filter(
    (post) =>
      post.date.year === parseInt(year) &&
      post.date.month === parseInt(month) &&
      post.date.day === parseInt(day)
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
          day: ("0" + post.date.day.toString()).slice(-2),
        },
      };
    }),
    fallback: false,
  };
}
