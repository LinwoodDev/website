import React, { ReactElement } from 'react'
import NextLink from 'next/link';
import NextImage from 'next/image';
import Author from '../types/author';
import { useRouter } from 'next/router';
import { Avatar, Group, Text } from '@mantine/core';
import Link from './Link';

interface Props {
    author: Author;
}

export default function AuthorDisplay({ author }: Props): ReactElement {
    const router = useRouter();
    const content = (
        <Group align="center">
            {author.image &&
                <Avatar src={author.image} size="md" />
            }
            <Text>
                {author.name}
            </Text>
        </Group>
    );
    if (!author.url)
        return content;
    return (
        <Link href={author.url}>
            {content}
        </Link>
    )
}
