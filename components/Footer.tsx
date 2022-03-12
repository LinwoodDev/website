import { Box, Center, Container, Group, Image, SimpleGrid, Text } from '@mantine/core';

import { ReactNode } from 'react';
import Link from './Link';

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
    <Box sx={{paddingTop: "10em"}}>
      <Container size="lg">
        <SimpleGrid cols={1} breakpoints={[{ minWidth: "md", cols: 2 }]} spacing={8}>
          <Group direction='column' align="center">
            <Text align="center">Support</Text>
            <Link href={'https://status.linwood.dev'}>Status</Link>
            <Link href={'https://codedoctor.tk/impress.html'}>Imprint</Link>
            <Link href={'https://codedoctor.tk/privacy.html'}>Privacy Policy</Link>
          </Group>
          <Group direction='column' align="center">
            <Text align="center">Follow Us</Text>
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
