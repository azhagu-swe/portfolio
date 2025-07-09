import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";

interface MyDocumentProps extends DocumentInitialProps {
  theme: string;
}

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Extract theme from cookies
    const theme =
      ctx.req?.headers?.cookie
        ?.split("; ")
        ?.find((cookie) => cookie.startsWith("theme="))
        ?.split("=")[1] || "light";

    return {
      ...initialProps,
      theme,
    };
  }

  render() {
    const { theme } = this.props;

    return (
      <Html lang="en" data-theme={theme}>
        <Head>
          {/* Add favicon */}
          <link
            rel="icon"
            href={`https://azhagu-swe.github.io/portfolio/image/favicon.ico`}
          />
          <meta name="description" content="Azhagu-Swe Portfolio" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
