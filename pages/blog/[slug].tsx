import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { getAllPosts, getPostBySlug } from '../../lib/blog'
import React from 'react'
import Navbar from '../../components/LinwoodHeader'
import Footer from '../../components/Footer'
import AuthorDisplay from '../../components/AuthorDisplay'
import { Blockquote, Box, Container, Image, List, Space, Text, Title } from '@mantine/core'
import ReactMarkdown from 'react-markdown'
import Link from '../../components/Link'

type Props = {
  post: PostType
}

const Post = ({ post }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div>
      <Navbar />
      <Space h={'xl'} />
      {router.isFallback ? (
        <Title>Loading…</Title>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>
                {post.title} | Linwood Blog
              </title>
              <meta property="og:image" content={post.ogImage?.url} />
            </Head>
            <Container size="sm" style={{ minHeight: "100vh" }}>
              {post.coverImage &&
                <Image src={post.coverImage} alt="Post logo" />
              }
              <Title order={1}>{post.title}</Title>
              <Box>
                <AuthorDisplay author={post.author} />
              </Box>
              <Text>{post.date}</Text>
              <Text>
                <ReactMarkdown components={{
                  a: (props) => <Link {...props} />,
                  h1: (props) => <Title order={1} {...props} />,
                  h2: (props) => <Title order={2} {...props} />,
                  h3: (props) => <Title order={3} {...props} />,
                  h4: (props) => <Title order={4} {...props} />,
                  h5: (props) => <Title order={5} {...props} />,
                  h6: (props) => <Title order={6} {...props} />,
                  p: (props) => <Text {...props} />,
                  li: (props) => <List.Item {...props} />,
                  ul: (props) => <List {...props} />,
                  ol: (props) => <List {...props} type={"ordered"} />,
                  blockquote: (props) => <Blockquote {...props} />,
                  // eslint-disable-next-line jsx-a11y/alt-text
                  img: (props) => <Image {...props} />,
                }}>{post.content}</ReactMarkdown>
              </Text>
            </Container>
          </article>
        </>
      )}
      <Footer />
    </div>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])

  return {
    props: {
      post
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
