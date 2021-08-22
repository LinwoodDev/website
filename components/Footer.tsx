import {
    Box,
    Container,
    Link,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    useColorModeValue,
    Image,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  
  const Logo = (props: any) => {
    return (
      <Image alt="Logo" src="/logo.svg" />
    );
  };
  
  const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  
  export default function Footer() {
    const date = new Date();
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container as={Stack} maxW={'6xl'} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={8}>
            <Stack align={'flex-start'}>
              <ListHeader>Support</ListHeader>
              <Link href={'https://status.linwood.dev'}>Status</Link>
              <Link href={'https://codedoctor.tk/impress.html'}>Imprint</Link>
              <Link href={'https://codedoctor.tk/privacy.html'}>Privacy Policy</Link>
            </Stack>
            <Stack align={'flex-start'}>
              <ListHeader>Follow Us</ListHeader>
              <Link href={'https://github.com/LinwoodCloud'}>GitHub</Link>
              <Link href={'https://twitter.com/LinwoodCloud'}>Twitter</Link>
              <Link href={'https://discord.linwood.dev'}>Discord</Link>
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={10}>
          <Flex
            align={'center'}
            _before={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              mr: 8,
            }}
            _after={{
              content: '""',
              borderBottom: '1px solid',
              borderColor: useColorModeValue('gray.200', 'gray.700'),
              flexGrow: 1,
              ml: 8,
            }}>
            <Logo />
          </Flex>
          <Text pt={6} fontSize={'sm'} textAlign={'center'}>
            © {date.getFullYear()} Linwood Development
          </Text>
        </Box>
      </Box>
    );
  }
  