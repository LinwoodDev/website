import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/LinwoodHeader'
import { getAllPosts, generateRssFeed } from '../../lib/blog'
import PostType from '../../types/post'
import NextLink from 'next/link';
import { Box, Card, Container, Text, Title } from '@mantine/core'


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
                <Container size="lg">
                    <Title order={1}>Blog</Title>
                    <Box>
                        {allPosts.map((post) => (
                            <BlogEntryCard
                                key={post.slug}
                                post={post}
                            />
                        ))}
                    </Box>
                </Container>
            </main>
            <Footer />
        </div>
    )
}
export default Index;
export const getStaticProps = async () => {
    await generateRssFeed();
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
        <NextLink href={"/blog/" + post.slug} passHref>
            <Card style={{ cursor: "pointer" }}>
                <Text size="md">
                    {post.title}
                </Text>
                <Text>
                    {post.excerpt}
                </Text>
            </Card>
        </NextLink>
    )
}

