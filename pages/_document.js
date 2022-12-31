import Document, { Head, Html, Main, NextScript } from "next/document";

// class Document extends NextDocument {
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Acme&family=Caveat&family=Kalam:wght@300&family=Open+Sans:wght@300;500&family=Roboto:ital,wght@1,100&family=Shadows+Into+Light&family=Unbounded:wght@200&display=swap"
            rel="stylesheet"
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
export default MyDocument;
