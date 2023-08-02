import Head from "next/head";
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="keywords" content="titla, meta, nextjs" />
      <meta name="author" content="Syamlal CM" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>News Feed</title>
    </Head>
    <Component {...pageProps} />
  </>
}
