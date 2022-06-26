import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Space,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import "../styles/globals.css";
import { AnimatePresence, motion } from "framer-motion";
import LinwoodHeader from "../components/LinwoodHeader";
import Footer from "../components/Footer";

export default function App({ Component, pageProps, router }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
    when: "afterChildren",
  };
  return (
    <>
      <Head>
        <title>Linwood Dev</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme,
          }}
        >
          <LinwoodHeader />
          <Space h={"xl"} />

          <AnimatePresence>
            <div
              className="page-transition-wrapper"
              style={{ overflow: "hidden" }}
            >
              <motion.div
                transition={spring}
                key={router.pathname}
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                id="page-transition-container"
              >
                <Component {...pageProps} />
              </motion.div>
            </div>
          </AnimatePresence>
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
