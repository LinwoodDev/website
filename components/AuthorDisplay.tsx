import { Avatar, Box, Flex, Image, Link, Stack, Text } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import NextLink from 'next/link';
import NextImage from 'next/image';
import Author from '../types/author';
import { useRouter } from 'next/router';

interface Props {
    author: Author;
}

export default function AuthorDisplay({ author }: Props): ReactElement {
    const router = useRouter();
    const content = (
        <Flex flexDir="row" alignItems="center">
            {author.image &&
                <Avatar src={author.image} m={4} size="md" />
            }
            <Text>
                {author.name}
            </Text>
        </Flex>
    );
    if (!author.url)
        return content;
    return (
            <Link onClick={() => router.push(author.url!)} _hover={{textDecoration: "none"}}>
                {content}
            </Link>
    )
}
