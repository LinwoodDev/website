import { Anchor as MantineAnchor, AnchorProps } from "@mantine/core";
import NextLink from "next/link";

export default function Link(props: AnchorProps<"a">) {
  return (
    <NextLink href={props.href ?? ""} passHref>
      <MantineAnchor {...props} />
    </NextLink>
  );
}
