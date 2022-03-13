import React from 'react';
import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  Title,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { CaretDown } from 'phosphor-react';
import { ColorSchemeSwitcher } from './ColorSchemeSwitch';
import Link from './Link';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  headerItem: {
    
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      width: "10em"
    }
  }
}));

export default function LinwoodHeader() {
  return <HeaderAction links={[
    { link: "/", label: "Home" },
    { link: "/blog", label: "Blog" },
  ]} />;
}

interface HeaderActionProps {
  links: { link: string; label: string; links?: { link: string; label: string }[] }[];
}

export function HeaderAction({ links }: HeaderActionProps) {
  const { classes } = useStyles();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <Link
              href={link.link}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <CaretDown size={12} />
              </Center>
            </Link>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} style={{ borderBottom: 0 }}>
      <Container className={classes.inner} fluid>
        <Group className={classes.headerItem}>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Title>Linwood</Title>
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Group className={classes.headerItem} position="right">
        <ColorSchemeSwitcher />
      </Group>
    </Container>
    </Header >
  );
}