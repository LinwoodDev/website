import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import markdownToHtml from '../../lib/markdownToHtml'
import PostType from '../../types/post'
import { getAllPosts, getPostBySlug } from '../../lib/blog'
import React from 'react'
import Navbar from '../../components/LinwoodShell'
import Footer from '../../components/Footer'
import AuthorDisplay from '../../components/AuthorDisplay'

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
                {post.title} | Linwood Blog
              </title>
              <meta property="og:image" content={post.ogImage?.url} />
            </Head>
            <Container maxW="3xl" p={4} pt={12} pb={24} minH="100vh">
              {post.coverImage &&
                <Image src={post.coverImage} alt="Post logo" />
              }
              <Heading p={8} as="h1">{post.title}</Heading>
              <Box p={4}>
              <AuthorDisplay author={post.author} />
              </Box>
              <Text p={4}>{post.date}</Text>
              <Text p={4}>
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
