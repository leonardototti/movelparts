import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo';

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'

import styles from '../styles/pages/NotFound.module.css'

import api from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

type Categoria = {
  nome: String,
  slug: String,
  produtos: []
}

interface NotFoundProps {
  categorias: Categoria[];
  configGeral: {
    emailmovel: String,
    emaildesign: String,
    phone_movel: String,
    phone_design: String,
    instagramuser: String,
    animation_menu: String
  };
}

const NotFound: React.FC<NotFoundProps> = (props) => {

  const SEO = {
    title: "Movels Part's - Não encontrado",
    canonical: "https://movelparts.com.br/404",
    openGraph: {
      url: 'https://movelparts.com.br/404',
      title: "Movels Part's - Não encontrado",
    }
  }

  return (
    <>
      <NextSeo noindex={true} nofollow={true} {...SEO} />

      <Header categorias={props.categorias} configGeral={props.configGeral} />
      <main>
        <section className={styles.error_container}>
          <div className={styles.error_content}>
            <Container>
              <h1 className={styles.title}>Erro 404 :(</h1>
              <p className={styles.text_error}>Oops, parece que aconteceu um problema.</p>
              <Link href="/">
                <button className={styles.btn_error}>
                  Volte para o site
                </button>
              </Link>
            </Container>
          </div>
        </section>
      </main>
      <Footer configGeral={props.configGeral} />
    </>
  )
}

export async function getStaticProps(context) {
  let requestCategorias = await api.get('categorias')
  let categorias = requestCategorias.data;

  let requestGeral = await api.get('geral')
  let configGeral = requestGeral.data;

  return {
    props: {
      categorias,
      configGeral
    },
    revalidate: 60
  }
}


export default NotFound;