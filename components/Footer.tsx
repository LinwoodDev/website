import { Box, Center, Container, Group, Image, SimpleGrid, Text } from '@mantine/core';
import Link from 'next/link';

import { ReactNode } from 'react';

const Logo = (props: any) => {
  return (
    <Image alt="Logo" src="/logo.svg" />
  );
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text size={'lg'}>
      {children}
    </Text>
  );
};

export default function Footer() {
  const date = new Date();
  return (
    <Box>
      <Container size="lg">
        <SimpleGrid cols={2} breakpoints={[{minWidth: "md", cols: 3}]} spacing={8}>
          <Group align={'flex-start'}>
            <ListHeader>Support</ListHeader>
            <Link href={'https://status.linwood.dev'}>Status</Link>
            <Link href={'https://codedoctor.tk/impress.html'}>Imprint</Link>
            <Link href={'https://codedoctor.tk/privacy.html'}>Privacy Policy</Link>
          </Group>
          <Group align={'flex-start'}>
            <ListHeader>Follow Us</ListHeader>
            <Link href={'https://github.com/LinwoodCloud'}>GitHub</Link>
            <Link href={'https://twitter.com/LinwoodCloud'}>Twitter</Link>
            <Link href={'https://discord.linwood.dev'}>Discord</Link>
          </Group>
        </SimpleGrid>
      </Container>
      <Box>
        <Center>
          <Logo />
        </Center>
        <Text size={'sm'} align={'center'}>
          © {date.getFullYear()} Linwood Development
        </Text>
      </Box>
    </Box>
  );
}
