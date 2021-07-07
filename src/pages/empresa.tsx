import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo';

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'

import styles from '../styles/pages/Company.module.css'

import api from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'


type Categoria = {
  nome: String,
  slug: String,
  produtos: []
}

interface CompanyProps {
  categorias: Categoria[];
  configGeral: {
    emailmovel: String,
    phone_movel: String,
    instagramuser: String,
    animation_menu: String
  };
}

const Empresa: React.FC<CompanyProps> = (props) => {

  const SEO = {
    title: "Movels Part's - Empresa",
    canonical: "https://movelparts.com.br/empresa",
    openGraph: {
      url: 'https://movelparts.com.br/empresa',
      title: "Movels Part's - Empresa",
    }
  }

  return (
    <>
      <NextSeo {...SEO}/>

      <Header categorias={props.categorias} configGeral={props.configGeral} />

      <main>
        <section className={styles.company_container}>
          <div className={styles.company_content}>
            <Container>
              <Breadcrumb>
                <Link href="/"><li className="breadcrumb-item">Home</li></Link>
                <Breadcrumb.Item active>Empresa</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className={styles.title}>A empresa</h1>
              <Row>
                <Col lg={6}>
                  <p className={styles.subtitle_company}>Sobre a empresa</p>
                  <h2 className={styles.subtitle}>Nossa história</h2>
                  <hr className={styles.divisor_company} />
                  <p className={styles.text_company}>Surpreender quando se trata de custo, qualidade e inovação, desenvolvendo alternativas que fazem a diferença na área de injeção de termoplásticos e no mercado de acessórios para móveis são os princípios que orientam a Movel Part’s.</p>
                  <p className={styles.text_company}>A indústria localizada em São Caetano do Sul - São Paulo conta com 4 galpões e uma área fabril com mais de 3 mil metros quadrados, reconhecida por oferecer soluções inovadoras e criativas na área de injeção de termoplásticos e acessórios para industrias moveleiras. A altíssima qualidade dos puxadores de armário e pés para móveis de cozinha é atingida com a utilização de matérias –primas selecionadas, equipamentos de última geração e profissionais capacitados.</p>
                  <p className={styles.text_company}>Desde sua fundação em 1986, continua em constante modernização, para garantir a qualidade a Movel Part's utiliza as melhores matérias primas; possui injetoras de alto desempenho, máquinas de metalização e linhas de pintura com cura térmica e U.V que confeccionam puxadores para móveis e pés cromados para móveis, conseguindo desta maneira acessórios para móveis de cozinha com qualidade garantida.</p>
                  <p className={styles.text_company}>Com a tecnologia e inovação, nossos produtos, pés para armários de cozinha, pés reguláveis de móveis e pés de plástico para móveis em geral, puxadores, com design arrojados fazem toda a diferença nestas montagens específicas, garantindo assim o embelezamento e a finalização trazendo a satisfação ao cliente, além da garantia e durabilidade dos produtos.</p>
                </Col>
                <Col className={styles.company_img_container} lg={6}>
                  <figure>
                    <img src="/nossa-historia.png" alt="Foto sobre a empresa" />
                  </figure>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <section className={styles.company_catalog_container}>
          <div className={styles.company_catalog_content}>
            <Container>
              <h2 className={styles.title_catalog}>Galeria</h2>
              <p className={styles.text_catalog}>Conheça um pouco de como é nossa empresa.</p>
              <hr className={styles.divisor_catalog} />

            <div className={styles.onimage}>
              <Row>
                <Col md={6} className="text-center">
                  <figure>
                    <img src="/injetora.png" alt="Máquina injetora" width="100%" />
                  </figure>
                  <p className={`${styles.subtitle_gallery} ${styles.first_subtitle}`}>Máquina Injetora</p>
                </Col>
                <Col md={6} className="text-center">
                  <figure>
                    <img src="/metalizadora.png" alt="Máquina metalizadora" width="100%" />
                  </figure>
                  <p className={styles.subtitle_gallery}>Máquina Metalizadora</p>
                </Col>
              </Row>
            </div>
            
            <div className={styles.underimage}>
              <Row>
                <Col md={12} className="text-center">
                  <figure>
                    <img src="/estoque.png" alt="Galpão de estoque" width="100%" />
                  </figure>
                  <p className={styles.subtitle_gallery}>Galpão de estoque</p>
                </Col>
              </Row>
            </div>

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


export default Empresa;