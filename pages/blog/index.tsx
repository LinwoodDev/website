import Head from "next/head";
import { getAllPosts, generateRssFeed } from "../../lib/blog";
import PostType from "../../types/post";
import {
  ActionIcon,
  Card,
  Container,
  Group,
  Menu,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useRouter } from "next/router";
import { List as ListIcon } from "phosphor-react";

type Props = {
  allPosts: PostType[];
};
const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Head>
        <title>Linwood Blog</title>
      </Head>

      <main>
        <Container size="sm">
          <Group position="apart">
            <Title order={1}>Blog</Title>
            <BlogMenu />
          </Group>
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
  var link = `/blog/${post.date.year}/${("0" + post.date.month).slice(-2)}/${(
    "0" + post.date.day
  ).slice(-2)}/${post.slug}`;
  if (post.id) link = `/${post.id}`;
  return (
    <Card
      href={link}
      component={NextLink}
      withBorder
      radius="lg"
      p="md"
      sx={(theme) => ({
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.gray[8] : theme.colors.gray[2],
        },
      })}
    >
      <Text size="md">{post.title}</Text>
      <Text color="dimmed">
        {post.date.year}-{("0" + post.date.month).slice(-2)}-
        {("0" + post.date.day).slice(-2)} - {post.author.name}
      </Text>
      <Text>{post.excerpt}</Text>
    </Card>
  );
}

export function BlogMenu() {
  const router = useRouter();
  const openDiscord = () => router.push("https://go.linwood.dev/discord");
  const openMatrix = () => router.push("https://go.linwood.dev/matrix");
  const openGitHub = () => router.push("https://github.com/LinwoodCloud");
  const openRSS = () => router.push("https://www.linwood.dev/blog/atom.xml");
  return (
    <Menu position="top-end" withArrow>
      <Menu.Target>
        <ActionIcon>
          <ListIcon />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={openRSS}>RSS-Blog</Menu.Item>
        <Menu.Item onClick={openMatrix}>Matrix</Menu.Item>
        <Menu.Item onClick={openDiscord}>Discord</Menu.Item>
        <Menu.Item onClick={openGitHub}>GitHub</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
