import React from "react";
import {
  createStyles,
  Switch,
  Group,
  useMantineColorScheme,
} from "@mantine/core";
import { MoonStars, Sun } from "phosphor-react";

export function ColorSchemeSwitcher() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" my={30}>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="md"
        onLabel={
          <Sun size={18} />}
        offLabel={
          <MoonStars size={18} />}
      />
    </Group>
  );
}
