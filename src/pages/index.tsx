import Link from 'next/link'
import React from 'react'
import { NextSeo } from 'next-seo';

import { Container, Row, Col } from 'react-bootstrap'

import styles from '../styles/pages/Home.module.css'

import Header from '../components/Header'
import Banner from '../components/Banner'
import Product from '../components/Product'
import Footer from '../components/Footer'

import api from '../services/api'

type Categoria = {
  nome: String,
  slug: String,
  produtos: []
}

type Produto = {
  nome: String,
  slug: String,
  desc: String,
  image: []
}

interface HomeProps {
  categorias: Categoria[];
  produtos: Produto[];
  configGeral: {
    emailmovel: String,
    phone_movel: String,
    instagramuser: String,
    animation_menu: String
  };
}

const Home: React.FC<HomeProps> = (props) => {

  const SEO = {
    title: "Movels Part's - Acessórios para móveis",
    canonical: "https://movelparts.com.br/",
    openGraph: {
      url: 'https://movelparts.com.br/',
      title: "Movels Part's - Acessórios para móveis",
    }
  }

  return (
    <>
      <NextSeo {...SEO}/>

      <Header categorias={props.categorias} configGeral={props.configGeral} />

      <Banner />
      <main>
        <section className={styles.company_section}>
          <Container>
            <Row>
              <Col md={6}>
                <p className={styles.subtitle}> Sobre a nossa empresa </p>
                <h1 className={styles.title}>A empresa</h1>
                <hr className={styles.divisor}></hr>
                <div className={styles.company_p_container}>
                  <p className={styles.text}>A Movel Part´s oferece para as indústrias moveleiras soluções inovadoras e criativas na área de injeção de termoplásticos. </p>
                  <p>A empresa visa oferecer ao mercado produtos de qualidade com custo reduzido.</p>
                  <p>Sua equipe de profissionais, experiente e comprometida, está preparada para a fabricação de peças especiais desenvolvidas de acordo com os desenhos e especificações técnicas de cada cliente com agilidade e eficiência, assegurando soluções com qualidade e segurança a preços competitivos.</p>
                  <p>Para garantir a qualidade de seus produtos a Movel Part´s utiliza as melhores matérias primas; investe em máquinas e equipamentos e utiliza moldes termoplásticos avançados, acompanhando as tendências.</p>
                </div>
                <Link href="/empresa">
                  <button className={styles.button_company}>Saiba mais</button>
                </Link>
              </Col>
              <Col md={6} className={`${styles.company_image_container} d-flex align-items-center justify-content-center`}>
                <figure>
                  <img className={styles.company_image} src="/imagem-empresa.png" alt="Empresa" />
                </figure>
              </Col>
            </Row>
          </Container>
        </section>
        <section className={styles.section_produtos}>

          <div className={styles.produtos_content}>
            <Container fluid className={styles.products_container}>
              <p className={styles.subtitle_produtos}>Conheça nossos produtos</p>
              <h2 className={styles.title}>Produtos</h2>
              <hr className={styles.divisor_produtos}></hr> 
              <Row className={styles.products_row}>
                {
                  props.produtos.map((produto: any, index) => {
                    if(index > 3) {
                      return;
                    }

                    return (
                      <Product key={index} produto={produto} />
                    )
                  })
                }
              </Row>
              <Link href="/produtos">
                <button className={styles.btn_produtos}>Conheça mais</button> 
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

  let requestProdutos = await api.get('produtos')
  let produtos = requestProdutos.data;

  let requestGeral = await api.get('geral')
  let configGeral = requestGeral.data;

  return {
    props: {
      categorias,
      produtos,
      configGeral
    },
    revalidate: 60
  }
}

export default Home;