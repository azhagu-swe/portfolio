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
          <meta name="description" content="Software Engineer with 3+ years of hands-on experience in building scalable microservices and full-stack solutions using Java and Spring Boot. Passionate about leveraging modern technologies to solve complex problems and optimize system performance." />
          <meta name="keywords" content="Software Engineer, Java, Spring Boot, Full Stack Developer, Microservices, Web Development" />
          <meta name="author" content="Azhagu" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://azhagu-swe.github.io/portfolio" />
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
