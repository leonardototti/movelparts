import React from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo';

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'
import { FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { FiPhone } from 'react-icons/fi'

import styles from '../styles/pages/Represen.module.css'

import api from '../services/api'
import Header from '../components/Header'
import Footer from '../components/Footer'

type Representante = {
    id: Number,
    nome: String,
    email: String,
    phone: String,
    estado: String
}

type Categoria = {
    nome: String,
    slug: String,
    produtos: []
}

interface RepresenProps {
    categorias: Categoria[];
    represen: Representante[];
    configGeral: {
        emailmovel: String,
        emaildesign: String,
        phone_movel: String,
        phone_design: String,
        instagramuser: String,
        animation_menu: String
    };
}

const RepresenPage: React.FC<RepresenProps> = (props) => {

    const SEO = {
        title: "Movels Part's - Representantes",
        canonical: "https://movelparts.com.br/produtos",
        openGraph: {
            url: 'https://movelparts.com.br/produtos',
            title: "Movels Part's - Representantes",
        }
    }

    return (
        <>
            <NextSeo {...SEO} />

            <Header categorias={props.categorias} configGeral={props.configGeral} />
            <main>
                <section className={styles.repre_container}>
                    <div className={styles.repre_content}>
                        <Container>
                            <Breadcrumb>
                                <Link href="/"><li className="breadcrumb-item">Home</li></Link>
                                <Link href="/contato"><li className="breadcrumb-item">Contato</li></Link>
                                <Breadcrumb.Item active>Representantes</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className={styles.title_repre}>Representantes</h1>
                            <p className={styles.subtitle_repre}>Conheça e entre em contato com nossos representantes.</p>
                            <hr className={styles.divisor_repre} />
                            <div className={styles.card_repre}>
                                <Row>
                                    {
                                        props.represen.map((representante: any) => {
                                            return (
                                                <>
                                                    <Col lg={4} key={representante.id}>
                                                        <div className={styles.card_container}>
                                                            <div className={styles.estado}><span>{representante.estado}</span></div>

                                                            <h2 className={styles.title_card}>Nome</h2>
                                                            <p className={styles.subtitle_card}>{representante.nome}</p>

                                                            <h2 className={styles.title_card}>Email</h2>
                                                            <p style={{ wordBreak: 'break-all' }} className={styles.subtitle_card}>{representante.email}</p>

                                                            <h2 className={styles.title_card}>Telefone</h2>
                                                            <p className={styles.subtitle_card}>{representante.phone}</p>

                                                            <h2 className={styles.title_card}>Estado</h2>
                                                            <p className={styles.subtitle_card}>{parseState(representante.estado)}</p>
                                                        </div>
                                                    </Col>
                                                </>
                                            )
                                        })
                                    }
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

function parseState(state) {
    let convertList = {
        'AC': 'Acre',
        'AL': 'Alagoas',
        'AM': 'Amazonas',
        'AP': 'Amapá',
        'BA': 'Bahia',
        'CE': 'Ceará',
        'DF': 'Distrito Federal',
        'ES': 'Espírito Santo',
        'GO': 'Goiás',
        'MA': 'Maranhão',
        'MG': 'Minas Gerais',
        'MS': 'Mato Grosso do Sul',
        'MT': 'Mato Grosso',
        'PA': 'Pará',
        'PB': 'Paraíba',
        'PE': 'Pernambuco',
        'PI': 'Piauí',
        'PR': 'Paraná',
        'RJ': 'Rio de Janeiro',
        'RN': 'Rio Grande do Norte',
        'RO': 'Rondônia',
        'RR': 'Roraima',
        'RS': 'Rio Grande do Sul',
        'SC': 'Santa Catarina',
        'SE': 'Sergipe',
        'SP': 'São Paulo',
        'TO': 'Tocantins'
    }

    return convertList[state];
}

export async function getStaticProps(context) {
    let requestCategorias = await api.get('categorias')
    let categorias = requestCategorias.data;

    let requestRepresentatives = await api.get('representantes')
    let represen = requestRepresentatives.data;

    let requestGeral = await api.get('geral')
    let configGeral = requestGeral.data;

    return {
        props: {
            categorias,
            represen,
            configGeral
        },
        revalidate: 60
    }
}

export default RepresenPage;