import { Anchor as MantineAnchor, AnchorProps } from "@mantine/core";
import NextLink from "next/link";
import React, { PropsWithChildren } from "react";

export default function Link(
  props: PropsWithChildren<
    React.ComponentProps<typeof MantineAnchor> & { href?: string }
  >
) {
  return (
    <NextLink href={props.href ?? ""} passHref>
      <MantineAnchor {...props} component="a" />
    </NextLink>
  );
}
