import Link from 'next/link'
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import { Container, Row, Col, Breadcrumb } from 'react-bootstrap'

import styles from '../../styles/pages/ProductPage.module.css'

import api from '../../services/api'

type Categoria = {
  nome: String,
  slug: String,
  produtos: []
}

type Produto = {
  id: Number,
  nome: String,
  slug: String,
  desc: String,
  imagem: []
}

interface ProductsProps {
  categorias: Categoria[],
  produto: Produto,
  relatedProducts: Produto[],
  configGeral: {
    emailmovel: String,
    phone_movel: String,
    instagramuser: String,
    animation_menu: String
  };
}

const ProdutoPage: React.FC<ProductsProps> = (props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <></>
  }

  const SEO = {
    title: "Movels Part's - " + props.produto[0].nome,
    canonical: "https://movelparts.com.br/produtos/" + props.produto[0].slug,
    openGraph: {
      url: 'https://movelparts.com.br/produtos/' + props.produto[0].slug,
      title: "Movels Part's - " + props.produto[0].nome,
      images: [
        {
          url: `https://res.cloudinary.com/movelparts/image/upload/c_fill,g_center,h_450,w_450/${props.produto[0].imagem.provider_metadata.public_id}.webp`,
          width: 450,
          height: 450,
          alt: `${props.produto[0].nome}`,
        }
      ]
    }
  }

  return (
    <>
      <NextSeo {...SEO}/>

      <Header categorias={props.categorias} configGeral={props.configGeral} />
      <section className={styles.product_container}>
        <div className={styles.product_content}>
          <Container>
            <Breadcrumb>
              <Link href="/"><li className="breadcrumb-item">Home</li></Link>
              <Link href="/produtos"><li className="breadcrumb-item">Produtos</li></Link>
              <Breadcrumb.Item active>{props.produto[0].nome}</Breadcrumb.Item>
            </Breadcrumb>

            <h1 className={styles.product_title}>{props.produto[0].nome}</h1>
            <hr className={styles.product_divisor} />
            <Row className="content-start">
              <Col lg={8} className={styles.image_product}>
                <Row>
                  <Col sm={6}>
                    <img className={styles.image} src={props.produto[0].imagem.url} alt={props.produto[0].nome} />
                  </Col>

                  <Col lg={5} sm={6}>
                    <div className={styles.description_container}>
                      <h2 className={styles.additional_info}>Informações adicionais: </h2>
                      <p>A cor e o material dos produtos deverá ser consultada em vista da possibilidade de alteração mediante a customização do cliente.</p>
                      {
                        props.produto[0].medidas_produto ?
                        <p>
                          <strong>Medidas: </strong> {props.produto[0].medidas_produto}
                        </p>
                        : null
                      }
                      <Link href="/contato">
                        <button className={styles.btn_product}>Fale conosco</button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={4} className={styles.other_products}>
                <div className={styles.menu_product}>
                  <Row style={{marginLeft: '0', marginRight: '0'}}>
                    <h2>{props.produto[0].categoria.nome}</h2>
                    {
                      props.relatedProducts.map((produto: any) => {
                        return (
                          <>
                            <Col sm={6} style={{marginBottom: '24px'}} key={produto.id}>
                              <Link href={produto.slug}>
                              <div className={styles.image}
                                style={{ backgroundImage: `url('https://res.cloudinary.com/movelparts/image/upload/c_fill,g_center,h_350,w_350/${produto.imagem.provider_metadata.public_id}.webp')` }}>
                              </div>
                              </Link>
                              <h3 className={styles.relatedproduct_title}>{produto.nome}</h3>
                            </Col>
                          </>
                        )
                      })
                    }
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <Footer configGeral={props.configGeral} />
    </>
  )
}

export async function getStaticProps({ params }) {
  let produto = null;
  try {
    let requestProduto = await api.get(`produtos?slug=${params.slug}`)
    produto = requestProduto.data;
  } catch (err) {
    return {
      redirect: {
        destination: '/404',
        permanent: true,
      },
    }
  };

  if (!params.slug) {
    return {
      redirect: {
        destination: '/404',
        permanent: true,
      },
    }
  }

  if (produto == '[]' || produto.length === 0 || !produto) {
    return {
      redirect: {
        destination: '/404',
        permanent: true,
      },
    }
  } else {
    let requestGeral = await api.get('geral')
    let configGeral = requestGeral.data;

    let requestCategorias = await api.get('categorias')
    let categorias = requestCategorias.data;

    let requestRelatedProducts = await api.get(`produtos?_limit=8&categoria.slug=${produto[0].categoria.slug}`)
    let relatedProducts = requestRelatedProducts.data;

    return {
      props: {
        categorias,
        produto,
        relatedProducts,
        configGeral
      },
      revalidate: 60
    }
  }
}

export async function getStaticPaths() {
  let requestProduto = await api.get('produtos')
  let produtos = requestProduto.data;

  const paths = produtos.map((produto) => ({
    params: { slug: produto.slug },
  }))

  return {
    paths,
    fallback: true
  }
}

export default ProdutoPage;