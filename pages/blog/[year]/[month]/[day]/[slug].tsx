import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import PostType from "../../../../../types/post";
import { getAllPosts, getPostBySlug } from "../../../../../lib/blog";
import React from "react";
import Navbar from "../../../../../components/LinwoodHeader";
import Footer from "../../../../../components/Footer";
import AuthorDisplay from "../../../../../components/AuthorDisplay";
import {
  Badge,
  Blockquote,
  Box,
  Container,
  Group,
  Image,
  List,
  Space,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import ReactMarkdown from "react-markdown";
import { NextLink } from "@mantine/next";
import Link from "../../../../../components/Link";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  const year = post.date.year;
  const month = ("0" + post.date.month).slice(-2);
  const day = ("0" + post.date.day).slice(-2);
  return (
    <div>
      <Navbar />
      <Space h={"xl"} />
      {router.isFallback ? (
        <Title>Loading…</Title>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{post.title} | Linwood Blog</title>
              <meta property="og:image" content={post.ogImage?.url} />
            </Head>
            <Container size="sm" style={{ minHeight: "100vh" }}>
              {post.coverImage && (
                <Image src={post.coverImage} alt="Post logo" />
              )}
              <Title order={1}>{post.title}</Title>
              <Group noWrap={false} mt={8} mb={16}>
                {post.tags.map((tag) => (
                  <Badge
                    component={NextLink}
                    href={`/blog/tag/${tag}`}
                    variant="outline"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </Group>
              <AuthorDisplay author={post.author} />
              <Space h={"md"} />
              <Group spacing={1}>
                <Link href={`/blog/${year}`}>{year}</Link>-
                <Link href={`/blog/${year}/${month}`}>{month}</Link>-
                <Link href={`/blog/${year}/${month}/${day}`}>{day}</Link>
              </Group>
              <Space h={"md"} />
              <TypographyStylesProvider>
                <ReactMarkdown components={{}}>{post.content}</ReactMarkdown>
              </TypographyStylesProvider>
            </Container>
          </article>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Post;

type Params = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { year, month, day, slug } = params;
  const post = getPostBySlug(
    `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}-${slug}`
  );

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
          year: post.date.year.toString(),
          month: ("0" + post.date.month.toString()).slice(-2),
          day: ("0" + post.date.day.toString()).slice(-2),
        },
      };
    }),
    fallback: false,
  };
}
