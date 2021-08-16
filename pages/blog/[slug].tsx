import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { getAllPosts, getPostBySlug } from '../../lib/blog'
import React from 'react'
import { Container, Heading, Image, Text } from '@chakra-ui/react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

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
      {router.isFallback ? (
        <Heading>Loading…</Heading>
      ) : (
        <>
          <article className="mb-32">
            <Head>
              <title>
                {post.title} | Next.js Blog Example
              </title>
              <meta property="og:image" content={post.ogImage?.url} />
            </Head>
            <Container maxW="3xl" p={4} pt={12} pb={24} minH="100vh">
              <Image src={post.coverImage} />
              <Heading p={8} as="h1">{post.title}</Heading>
              <Text p={4}>{post.date} - {post.author}</Text>
              <Text>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
  const content = await markdownToHtml(post.content || '')
  post['content'] = content;

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
