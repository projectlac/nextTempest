import { CacheProvider, EmotionCache } from "@emotion/react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import * as React from "react";
import { AppWrapper } from "../context/state";
import "../styles/customCarousel.scss";
import "../styles/globals.css";
import "../styles/globals.scss";

import { useRouter } from "next/router";
import Script from "next/script";
import TagManager from "react-gtm-module";
import Maintenance from "../components/Layout/Maintenace";
import * as ga from "../lib/ga";
import lightThemeOptions from "../styles/theme/lightThemeOption";
import createEmotionCache from "../utility/createEmotionCache";
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      TagManager.initialize({ gtmId: "GTM-T6BB6MV" });
    } else {
      console.log("GTM server side - ignorning");
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <NextNProgress />

        <AppWrapper>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=G-FDDJ7YRCM3`}
          />

          <Script strategy="lazyOnload" id="">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FDDJ7YRCM3');
        `}
          </Script>
          {process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "false" ? (
            <Component {...pageProps} />
          ) : (
            <Maintenance />
          )}
        </AppWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
