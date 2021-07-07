import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import SEO from '../../next-seo.config';
import { DefaultSeo } from 'next-seo';

import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/burger.css'
import '../styles/menu.css'

import NProgress from 'nprogress'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.svg" />
        <meta name="theme-color" content="#293650" />
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      </Head>
      <DefaultSeo
        noindex={false}
        nofollow={false}
        robotsProps={{
          nosnippet: true,
          notranslate: true,
          noimageindex: true,
          noarchive: true,
          maxSnippet: -1,
          maxImagePreview: 'none',
          maxVideoPreview: -1,
        }}
        {...SEO}
        />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp