import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import PostType from "../../../../../types/post";
import { getAllPosts, getPostBySlug } from "../../../../../lib/blog";
import React from "react";
import AuthorDisplay from "../../../../../components/AuthorDisplay";
import {
  Affix,
  Badge,
  Button,
  Container,
  Group,
  Image,
  Space,
  Title,
  Transition,
  TypographyStylesProvider,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import Link from "../../../../../components/Link";
import { GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ArrowUp as ArrowUpIcon } from "phosphor-react";
import { useWindowScroll } from "@mantine/hooks";

type Props = {
  post: PostType;
  mdxSource: MDXRemoteSerializeResult;
};

const PostPage = ({ post, mdxSource }: Props) => {
  const router = useRouter();
  const [scroll, scrollTo] = useWindowScroll();
  const year = post.date.year;
  const month = ("0" + post.date.month).slice(-2);
  const day = ("0" + post.date.day).slice(-2);
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div>
      {router.isFallback ? (
        <Title>Loading…</Title>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>{`${post.title} | Linwood Blog`}</title>
              <meta property="og:image" content={post.ogImage?.url} />
            </Head>
            <Container size="md" style={{ minHeight: "100vh" }}>
              {post.coverImage && (
                <Image src={post.coverImage} alt="Post logo" />
              )}
              <Title order={1}>{post.title}</Title>
              <Group noWrap={false} mt={8} mb={16}>
                {post.tags.map((tag) => (
                  <Badge
                    legacyBehavior
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
                <MDXRemote {...mdxSource} />
              </TypographyStylesProvider>
            </Container>
          </article>
          <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
              {(transitionStyles) => (
                <Button
                  leftIcon={<ArrowUpIcon />}
                  style={transitionStyles}
                  onClick={() => scrollTo({ y: 0 })}
                >
                  Scroll to top
                </Button>
              )}
            </Transition>
          </Affix>
        </>
      )}
    </div>
  );
};

export default PostPage;

type Params = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
};
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { year, month, day, slug } = params!;
  const post = getPostBySlug(
    `${year}-${("0" + month).slice(-2)}-${("0" + day).slice(-2)}-${slug}`
  );
  const mdxSource = await serialize(post.content);
  return {
    props: {
      post,
      mdxSource,
    },
  };
};

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
