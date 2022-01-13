import * as React from "react"
import '../styles/globals.css'

import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/dist/shared/lib/router/router";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
