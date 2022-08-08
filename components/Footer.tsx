import {
  Box,
  Center,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { ReactNode } from "react";
import Link from "./Link";
import NextLink from "next/link";

const Logo = (props: any) => {
  return <Image alt="Logo" src="/logo.svg" style={{ maxWidth: "10em" }} />;
};

const ListHeader = ({ children }: { children: ReactNode }) => {
  return <Text size={"lg"}>{children}</Text>;
};

export default function Footer() {
  const date = new Date();
  return (
    <Box sx={{ paddingTop: "10em" }}>
      <Container size="lg">
        <SimpleGrid
          cols={1}
          breakpoints={[{ minWidth: "md", cols: 2 }]}
          spacing={8}
        >
          <Stack align="center">
            <Text align="center">Support</Text>
            <Link href={"https://status.linwood.dev"}>Status</Link>
            <Link href={"/imprint"}>Imprint/Impressum</Link>
            <Link href={"/privacypolicy"}>
              Privacy Policy/Datenschutzerklärung
            </Link>
          </Stack>
          <Stack align="center">
            <Text align="center">Follow Us</Text>
            <Link href={"https://github.com/LinwoodCloud"}>GitHub</Link>
            <Link href={"https://twitter.com/LinwoodCloud"}>Twitter</Link>
            <Link href={"https://discord.linwood.dev"}>Discord</Link>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box>
        <Center>
          <Link href="/">
            <Logo />
          </Link>
        </Center>
        <Text size={"sm"} align={"center"}>
          © {date.getFullYear()} Linwood Development
        </Text>
      </Box>
    </Box>
  );
}
