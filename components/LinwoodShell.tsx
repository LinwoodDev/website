import React, { PropsWithChildren } from 'react'
import { AppShell, Navbar, Header } from '@mantine/core';


export default function LinwoodShell({ children }: PropsWithChildren<{}>) {
  return (
    <AppShell
      navbar={<Navbar width={{ base: 300 }} height={500} padding="xs">
        
      
      </Navbar>}
      header={<Header height={60} padding="xs">{/* Header content */}</Header>}

    >
      {children}
    </AppShell>
  )
}