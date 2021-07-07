import React, { useState } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo';

import Header from '../components/Header'
import Footer from '../components/Footer'

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'

import styles from '../styles/pages/Products.module.css'

import api from '../services/api'
import ProductCard from '../components/ProductCard'

type Categoria = {
  nome: String,
  slug: String,
  produtos: []
}

type Produto = {
  nome: String,
  slug: String,
  desc: String,
  imagem: []
}

interface ProductsProps {
  categorias: Categoria[],
  produtos: Produto[],
  configGeral: {
    emailmovel: String,
    phone_movel: String,
    instagramuser: String,
    animation_menu: String
  };
}

const Produtos: React.FC<ProductsProps> = (props) => {
  const [category, setCategory] = useState("todos");

  var pos = -1;
  var cardsArray = [ 'large', 'small', 'small'];
  
  function parseProductCardSize() {
    if (pos == 2) {
      pos = -1;
    }
  
    pos++;
    return cardsArray[pos];
  }

  const SEO = {
    title: "Movels Part's - Produtos",
    canonical: "https://movelparts.com.br/produtos",
    openGraph: {
      url: 'https://movelparts.com.br/produtos',
      title: "Movels Part's - Produtos",
    }
  }

  return (
    <>
      <NextSeo {...SEO}/>

      <Header categorias={props.categorias} configGeral={props.configGeral} />
      <main>
        <Container fluid className={styles.products_container}>

          <section className={styles.products_section}>
            <Breadcrumb>
              <Link href="/"><li className="breadcrumb-item">Home</li></Link>
              <Breadcrumb.Item active>Produtos</Breadcrumb.Item>
            </Breadcrumb>
            <div className="text-center">
              <h1 className={styles.title_product}>Produtos</h1>
              <hr className={styles.divisor_product} />
            </div>
            
            <Row className="content-start">
              <Col md={4}>
                <div className={styles.categories_container}>
                  <ul className={styles.categories_list}>
                  <p className={styles.categories_title}>Categorias</p>
                    {
                      props.categorias.length === 0 ? null :
                        <li onClick={() => setCategory("todos")} className={`${styles.category_item} ${category === "todos" ? styles.active : ''}`}>Todos os produtos</li>
                    }
                    {
                      props.categorias.length === 0 ?
                        <li style={{color: '#fff', fontFamily: 'Roboto'}}><span style={{backgroundColor: '#ff3333', color: '#fff', padding: '2px 12px', borderRadius: '8px'}}>Erro!</span> Nenhuma categoria foi encontrada.</li>
                      :
                      props.categorias.map((categoria: any, index) => {
                        return (
                          <li onClick={() => setCategory(categoria.slug)} className={`${styles.category_item} ${category === categoria.slug ? styles.active : ''}`} key={index}>{categoria.nome}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </Col>
              <Col md={8} className={styles.products_col}>
                <Row className={styles.products_row}>
                  {
                    props.produtos.length === 0 ?
                      <p style={{textAlign: 'center', fontSize: '20px', fontFamily: 'Roboto'}}><span style={{backgroundColor: '#ff3333', color: '#fff', padding: '2px 12px', borderRadius: '8px'}}>Erro!</span> Nenhum produto foi encontrado.</p>
                    :
                    category === "todos" ?
                    props.produtos.map((produto: any, index) => {
                      return (
                        <ProductCard key={index} size={parseProductCardSize()} produto={produto} />
                      )
                    })
                    :
                    props.produtos.map((produto: any, index) => {
                      return category === produto.categoria.slug ? (
                        <ProductCard key={index} size={parseProductCardSize()} produto={produto} />
                      ) : null
                    })
                  }
                </Row>
              </Col>
            </Row>
          </section>
        </Container>
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

export default Produtos;