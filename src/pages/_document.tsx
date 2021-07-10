import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com'></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap'
            rel='stylesheet'
          ></link>
          <link rel='shortcut icon' href='/favicon.png' type='image/png' />
        </Head>
        <body>
          <Main /> {/* Equivalente ao <div id="root"></div> */}
          <NextScript /> {/* Equivalente as importações de arquivos .JS */}
        </body>
      </Html>
    );
  }
}