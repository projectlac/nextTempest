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
import "../styles/globals.css";
import "../styles/globals.scss";
import "../styles/customCarousel.scss";

import lightThemeOptions from "../styles/theme/lightThemeOption";
import createEmotionCache from "../utility/createEmotionCache";
import TagManager from "react-gtm-module";
import Script from "next/script";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
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
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=G-8SZQ8DYEBH`}
        />

        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8SZQ8DYEBH', {
              page_path: window.location.pathname,
            });
                `}
        </Script>
        <CssBaseline />
        <NextNProgress />

        <AppWrapper>
          <Component {...pageProps} />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'G-8SZQ8DYEBH', 'auto');
          ga('send', 'pageview');
        `}
          </Script>

          <Script
            src="https://www.googletagmanager.com/gtag/js?id=GTM-T6BB6MV"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'GTM-T6BB6MV');
        `}
          </Script>
        </AppWrapper>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
