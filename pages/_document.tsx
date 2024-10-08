import createEmotionServer from "@emotion/server/create-instance";
import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

import createEmotionCache from "../utility/createEmotionCache";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Signika:wght@700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="shortcut icon" href="./static/32x32.ico" />
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          ></meta>
          <meta
            name="google-site-verification"
            content="GrqXOIR7p_CR7X-WvwJ3rzvui2HDqtoS6BJ5hx0BtUc"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=GTM-T6BB6MV`}
          />
          <link rel="canonical" href="https://www.tempest.vn" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GTM-T6BB6MV', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <link rel="alternate" hrefLang="vi" href="https://www.tempest.vn/" />
          <meta
            name="description"
            content="Tempest Shop -  Nạp thẻ tháng Honkai - Mộng ước -  Mua bán tài khoản Honkai Star Rail, Shop acc Zenless Zone Zero, Reroll uy tín, HRS, ZZZ"
          />
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
