import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo';

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import { FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { FiPhone } from 'react-icons/fi'

import styles from '../styles/pages/ContactPage.module.css'

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
    emaildesign: String,
    phone_movel: String,
    phone_design: String,
    instagramuser: String,
    animation_menu: String
  };
}

const Contato: React.FC<CompanyProps> = (props) => {

  const SEO = {
    title: "Movels Part's - Contato",
    canonical: "https://movelparts.com.br/contato",
    openGraph: {
      url: 'https://movelparts.com.br/contato',
      title: "Movels Part's - Contato",
    }
  }

  return (
    <>
      <NextSeo {...SEO} />

      <Header categorias={props.categorias} configGeral={props.configGeral} />
      <main>
        <section className={styles.contact_container}>
          <div className={styles.contact_content}>
            <Container fluid className={styles.container}>
              <Breadcrumb>
                <Link href="/"><li className="breadcrumb-item">Home</li></Link>
                <Breadcrumb.Item active>Contato</Breadcrumb.Item>
              </Breadcrumb>
              <Row>
                <Col md={12} className={styles.text_container}>
                  <h1 className={styles.title_contact}>Contato</h1>
                  <p className={styles.subtitle_contact}>Entre em contato conosco para solicitar um orçamento.</p>
                  <hr className={styles.divisor_contact} />
                  <p className={styles.text_contact}>
                  Caso tenha interesse de realizar um orçamento ou possui dúvidas sobre nosso trabalho, nos contate através do e-mail, telefone ou redes sociais listadas abaixo.
                  </p>

                  <section className={styles.container_representantes}>
                    <div className={styles.representantes_content}>
                      <h2 className={styles.title_repre}>Conhece nossos representantes?</h2>
                      <p className={styles.subtitle_contact}>Conheça um pouco sobre nossos representantes</p>

                      <hr className={styles.divisor_representante} />

                      <p className={styles.text_contact}>A Movel Part’s possui centenas de clientes e parceiros espalhados por todo Brasil, fornecemos nossos produtos para grandes e inovadoras empresas do mercado moveleiro, com isso, temos diversos representantes de nossa empresa espalhados por diferentes lugares no mapa, te levando a qualidade e garantia Movel Part’s para perto de você.</p>
                      <Link href="/representantes">
                        <button className={styles.button_repre}>Conheça mais</button>
                      </Link>
                    </div>
                  </section>

                </Col>
              </Row>
            </Container>
          </div>
        </section>
        <section className={styles.section_cards}>
          <Container>
            <div className={styles.card_container}>
              <Row>
                <Col lg={4} className={styles.card_col}>
                  <div className={styles.card_content}>
                    <FaInstagram className={styles.icon} />
                    <h2 className={styles.title_icon}>Instagram</h2>
                    <p className={styles.text_icon}>{props.configGeral.instagramuser}</p>
                  </div>
                </Col>

                <Col lg={4} className={styles.card_col}>
                  <div className={styles.card_content}>
                    <HiOutlineMail className={styles.icon} />
                    <h2 className={styles.title_icon}>Email</h2>
                    <p className={styles.text_icon}>{props.configGeral.emailmovel}</p>
                    <p className={styles.text_icon}>{props.configGeral.emaildesign}</p>
                  </div>
                </Col>

                <Col lg={4} className={styles.card_col}>
                  <div className={styles.card_content}>
                    <FiPhone className={styles.icon} />
                    <h2 className={styles.title_icon}>Telefone</h2>
                    <p className={styles.text_icon}>{props.configGeral.phone_movel}</p>
                    <p className={styles.text_icon}>{props.configGeral.phone_design}</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
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

export default Contato;