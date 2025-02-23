// pages/_document.tsx
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Extract theme from cookies
    const theme =
      ctx.req?.headers?.cookie
        ?.split("; ")
        ?.find((cookie) => cookie.startsWith("theme="))
        ?.split("=")[1] || "dark";

    return {
      ...initialProps,
      theme,
    };
  }

  render() {
    const { theme } = this.props as any;

    return (
      <Html lang="en" data-theme={theme}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
