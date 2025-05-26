import React, { ComponentType } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import DOMPurify from "isomorphic-dompurify";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      /* Critical Path Generator */
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: ComponentType) => (props: any) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          ...React.Children.toArray(initialProps.styles),
          sheet.getStyleElement()
        ] /* (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ) */
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const fontScript = `
      document.fonts.ready.then(function () {
        document.documentElement.classList.add('fonts-loaded');
      });
    `;
    const sanitizedScript = DOMPurify.sanitize(fontScript);

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/faviconNew.ico"></link>
          <link rel="preconnect" href="https://fonts.cdnfonts.com" />
          <link
            href="https://fonts.cdnfonts.com/css/euclid-circular-b"
            rel="stylesheet"
          />
          <link href="https://fonts.cdnfonts.com/css/inter" rel="stylesheet" />
          <meta name="format-detection" content="email=no" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: sanitizedScript
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
