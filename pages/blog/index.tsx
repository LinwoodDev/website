import { Box, Container, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { getAllPosts } from '../../lib/blog'
import PostType from '../../types/post'


type Props = {
    allPosts: PostType[]
}
const Index = ({ allPosts }: Props) => {
    return (
        <div>
            <Head>
                <title>Linwood Blog</title>
            </Head>

            <Navbar />

            <main>
                <Container maxW="3xl" p={4} pt={12}>
                    <Heading as="h1">Blog</Heading>
                    <Stack
                        as={Box}
                        py={{ base: 20, md: 36 }}>
                        {allPosts?.toString()}
                        {allPosts.map((post) => (
                            <BlogEntryCard
                                key={post.slug}
                                post={post}
                            />
                        ))}
                    </Stack>
                </Container>
            </main>
            <Footer />
        </div>
    )
}
export default Index;
export const getStaticProps = async () => {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ])

    return {
        props: { allPosts },
    }
}

interface CardProps {
    post: PostType;
}

function BlogEntryCard({ post }: CardProps) {
    return (
        <LinkBox borderWidth="1px" borderRadius="lg" overflow="hidden" p={8}>
            <LinkOverlay href={"/blog/" + post.slug}>
                <Heading fontSize="xl">
                    {post.title}
                </Heading>
            </LinkOverlay>
            <Text>
                {post.excerpt}
            </Text>
        </LinkBox>
    )
}
