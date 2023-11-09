import React from "react";
import classesN from "./Navbar.module.css";
import { MantineLogo } from "@mantine/ds";
import { Container, Group, Burger, Drawer, Stack } from "@mantine/core";
import useLinks from "./useLinks";
import { DrawerContext } from "../../Contexts/drawerContext";
// import { Switch, useMantineColorScheme } from '@mantine/core';
import cx from 'clsx';
import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Switch } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ActionToggle.module.css';


const Navbar = () => {
  // const colorScheme = 
  const { opened, toggle } = React.useContext(DrawerContext);
  const [items] = useLinks();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  
  return (
    <header className={classesN.header}>
      <Container size="md" className={classesN.inner}>
        <MantineLogo size={28} />
        <Group gap={5} visibleFrom="xs">
          {items}
          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
        </Group>
        {/* <Switch
          defaultChecked
          label="Dark Mode"
        /> */}

        <Burger hiddenFrom="xs" opened={opened} onClick={toggle} />
        <Drawer
          withCloseButton={true}
          opened={opened}
          size="100%"
          onClose={toggle}
        >
          <Stack>{items}</Stack>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;
