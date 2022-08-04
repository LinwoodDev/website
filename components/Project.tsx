import { Box, Button, Card, Group, Space, Text } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import { NextLink } from "@mantine/next";
import { ReactElement } from "react";

export interface ProjectCardProps {
  name: string;
  description: string;
  website?: string;
  source?: string;
  big?: boolean;
  blog?: string;
  banner?: StaticImageData;
}

export default function ProjectCard({
  name,
  description,
  website,
  source,
  big,
  banner,
  blog,
}: ProjectCardProps): ReactElement {
  return (
    <Card
      radius={18}
      shadow="sm"
      style={{
        maxWidth: big ? "" : "20em",
        minHeight: "20em",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {banner && (
        <>
          <Card.Section>
            <Image
              objectPosition={"50% 50%"}
              layout="responsive"
              src={banner}
              alt="Banner"
            />
          </Card.Section>
          <Space h="sm" />
        </>
      )}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Text weight={700} mt={"xs"} size="lg">
          {name}
        </Text>
        <Text>{description}</Text>
      </Box>
      <Space h="md" />
      {(website || source) && (
        <Group>
          {website && (
            <Button
              sx={{ flex: 1 }}
              fullWidth
              color="green"
              component={NextLink}
              href={website}
            >
              Website
            </Button>
          )}
          {source && (
            <Button
              sx={{ flex: 1 }}
              fullWidth
              component={NextLink}
              href={source}
            >
              Source
            </Button>
          )}
          {blog && (
            <Button
              sx={{ flex: 1 }}
              fullWidth
              component={NextLink}
              href={`/blog/tag/${blog}`}
              color="orange"
            >
              Blog
            </Button>
          )}
        </Group>
      )}
    </Card>
  );
}
