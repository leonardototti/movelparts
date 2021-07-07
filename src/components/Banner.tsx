import React from 'react'
import Link from 'next/link'
import { Container } from 'react-bootstrap'

import styles from '../styles/components/Banner.module.css'

export default function Banner() {
    return ( 
      <>
        <section className={styles.banner_container}>
            <div className={styles.banner_overlay}></div>
            <Container>
                <div className={styles.banner_content}>
                  <span className={styles.title_banner}>Movel Parts</span>
                  <p>Indústria termoplástica tradição desde <span style={{color: '#adc9ff'}}>1986</span>, especializada em <span style={{color: '#adc9ff'}}>acessórios para móveis</span>.</p>
                  <Link href="/contato"><button>Solicite um orçamento</button></Link>
                </div>
            </Container>
        </section>
      </> 
    )
}
