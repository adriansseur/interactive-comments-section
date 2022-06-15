// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="L8vVyvBwYScCo7cR-ZNfeiOCeek097r6yyvWBp5pRb0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}