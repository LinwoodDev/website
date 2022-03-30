import { Card, Container, Group, Space, Text, Title } from '@mantine/core';
import Footer from "../../../components/Footer";
import Navbar from "../../../components/LinwoodHeader";
import React from 'react'
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PostType from '../../../types/post';
import { BlogEntryCard } from '..';
import { GetStaticProps } from 'next';
import { getAllPosts, getPostTags } from '../../../lib/blog';

type Props = {
    posts: PostType[];
}

export default function TagPage({ posts }: Props) {
    const router = useRouter();
    const tag = router.query.tag as string;
    return (
        <>
            <Head>
                <title>Linwood Blog - Tag {tag}</title>
            </Head>

<Navbar />
<Space h={"xl"} />

<main>
    <Container size="sm">
        <Title order={1}>Tag {tag}</Title>
        <Space h={"xl"} />
        <Group direction="column" spacing={16} align="stretch">
            {posts.map((post) => (
                <BlogEntryCard post={post} key={post.fileName} />
            ))}
        </Group>
    </Container>
</main>
<Footer />
        </>
    )
}
export const getStaticProps : GetStaticProps = async ({params}) => {
  const posts = getAllPosts().filter((post) => post.tags.includes(params?.tag?.toString() ?? ''));

  return {
    props: { posts },
  };
}

export const getStaticPaths = async () => {
    const tags = getPostTags();

    return {
        paths: tags.map((tag) => ({ params: { tag } })),
        fallback: false,
    };
}