import Head from "next/head";
import Footer from "../../components/Footer";
import Navbar from "../../components/LinwoodHeader";
import { getAllPosts, generateRssFeed } from "../../lib/blog";
import PostType from "../../types/post";
import { Box, Card, Container, Group, Space, Text, Title } from "@mantine/core";
import { NextLink } from "@mantine/next";

type Props = {
  allPosts: PostType[];
};
const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Head>
        <title>Linwood Blog</title>
      </Head>

      <Navbar />
      <Space h={"xl"} />

      <main>
        <Container size="sm">
          <Title order={1}>Blog</Title>
          <Space h={"xl"} />
          <Group direction="column" spacing={16} align="stretch">
            {allPosts.map((post) => (
              <BlogEntryCard key={post.fileName} post={post} />
            ))}
          </Group>
        </Container>
      </main>
      <Footer />
    </>
  );
};
export default Index;
export const getStaticProps = async () => {
  await generateRssFeed();
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};

export interface CardProps {
  post: PostType;
}

export function BlogEntryCard({ post }: CardProps) {
  return (
    <Card
      href={`/blog/${post.date.year}/${("0" + post.date.month).slice(-2)}/${(
        "0" + post.date.day
      ).slice(-2)}/${post.slug}`}
      component={NextLink}
      withBorder
      style={{ cursor: "pointer" }}
    >
      <Text size="md">{post.title}</Text>
      <Text color="gray">
        {post.date.year}-{("0" + post.date.month).slice(-2)}-
        {("0" + post.date.day).slice(-2)} - {post.author.name}
      </Text>
      <Text>{post.excerpt}</Text>
    </Card>
  );
}
