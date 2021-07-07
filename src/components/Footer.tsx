import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { AiFillInstagram } from 'react-icons/ai'

import styles from '../styles/components/Footer.module.css'

interface FooterProps {
    configGeral: {
        emailmovel: String,
        phone_movel: String,
        instagramuser: String,
        animation_menu: String
    };
}

const Footer: React.FC<FooterProps> = ({ configGeral }) => {
    return (
        <footer>
            <div className={styles.ff_container}>
                <Container>
                    <Row>
                        <p>{}</p>
                        <Col md={12} lg={6} className={styles.ff_first_column}>
                            <figure>
                                <img src="/logo-text.svg" alt="Logo Movel Part's" width="100%" height="auto" style={{ maxWidth: '350px' }} />
                            </figure>
                        </Col>
                        <Col lg={6} className={styles.ff_second_column}>
                            <Row>
                                <Col md={6}>
                                    <h3 className={styles.title_footer}>Navegação</h3>
                                    <ul className={styles.list_navigation}>
                                        <li>
                                            <Link href="/">
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/produtos">
                                                Produtos
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/empresa">
                                                Empresa
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/contato">
                                                Contato
                                            </Link>
                                        </li>
                                    </ul>
                                </Col>
                                <Col md={6}>
                                    <h3 className={styles.title_footer}>Contate-nos</h3>
                                    <ul className={styles.list_contact}>
                                        <li>
                                            <div className={styles.list_contact_icon}><FaPhoneAlt /></div>
                                            <a style={{ display: 'grid', placeItems: 'center' }}
                                                href={`tel:${parsePhoneNumber(configGeral.phone_movel)}`}>
                                                <span>{configGeral.phone_movel}</span>
                                            </a>
                                        </li>
                                        <li className={styles.li_email}>
                                            <div className={styles.list_contact_icon}><MdEmail /></div>
                                            <a style={{ display: 'grid', placeItems: 'center' }}
                                                href={`mailto:${configGeral.emailmovel}`}>
                                                <span>{configGeral.emailmovel}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <div className={styles.list_contact_icon}><AiFillInstagram /></div>
                                            <a style={{ display: 'grid', placeItems: 'center' }}
                                                href={`https://instagram.com${configGeral.instagramuser.startsWith('/') ? configGeral.instagramuser : '/' + configGeral.instagramuser}`}
                                                target="_blank"
                                                rel="noopener noreferrer">
                                                <span>{configGeral.instagramuser.startsWith('/') ? configGeral.instagramuser : '/' + configGeral.instagramuser}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className={styles.fs_container}>
                <Container>
                    <div className={styles.fs_info_container}>
                        <p>Todos os direitos reservados - {new Date().getFullYear()} © Movel Part’s</p>
                        <p>Desenvolvido por <span className={styles.link}><a href="https://asapdesigns.com.br" target="_blank" rel="noopener noreferrer">Asap Designs</a></span></p>
                    </div>
                </Container>
            </div>
        </footer>
    )
}

function parsePhoneNumber(number) {
    return `0${number.replace(/[\s()-]/g, '')}`;
}

export default Footer;