import React from 'react'
import Link from 'next/link'

import { Container, Row, Col } from 'react-bootstrap'

import styles from '../styles/components/ProductCard.module.css'

type Produto = {
    nome: string,
    slug: string,
    desc: string,
    categoria: {
        nome: string,
        slug: string
    },
    imagem: {
        ext: string,
        provider_metadata: {
            public_id: string
        }
    }
}

interface ProductCardProps {
    size: string;
    produto: Produto;
}

const ProductCard: React.FC<ProductCardProps> = ({ size, produto }) => {
    if (size == "large") {
        return (
            <Col md={6} lg={12}>
                <Row className={styles.image_row_large}>
                    <Col className={styles.image_container} md={12} lg={8}>
                        <Link href={`/produtos/${produto.slug}`}>
                            <div className={styles.image_large}
                                style={{ backgroundImage: `url('https://res.cloudinary.com/movelparts/image/upload/c_fill,g_center,h_700,w_700/${produto.imagem.provider_metadata.public_id}.webp')` }}>
                            </div>
                        </Link>
                    </Col>
                    <Col className={styles.productinfo_container} md={12} lg={4}>
                        <div className={styles.productinfo}>
                            <Link href={`/produtos/${produto.slug}`}>
                                <h2 className={styles.product_name}>{produto.nome}</h2>
                            </Link>
                            <p className={styles.product_category}>{produto.categoria.nome}</p>
                            <hr className={styles.product_divisor} />
                            <p className={styles.product_description}>Clique para mais informações sobre o produto.</p>
                        </div>
                    </Col>
                </Row>
            </Col>
        )
    } else if (size == "small") {
        return (
            <Col md={6}>
                <Row className={styles.image_row_small}>
                    <div className={styles.image_container}>
                        <Link href={`/produtos/${produto.slug}`}>
                            <div className={styles.image_small} 
                                style={{ backgroundImage: `url('https://res.cloudinary.com/movelparts/image/upload/c_fill,g_center,h_700,w_700/${produto.imagem.provider_metadata.public_id}.webp')` }}>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.productinfo_container}>
                        <div className={styles.productinfo}>
                            <Link href={`/produtos/${produto.slug}`}>
                                <h2 className={styles.product_name}>{produto.nome}</h2>
                            </Link>
                            <p className={styles.product_category}>{produto.categoria.nome}</p>
                            <hr className={styles.product_divisor} />
                            <p className={styles.product_description}>Clique para mais informações sobre o produto.</p>
                        </div>
                    </div>
                </Row>
            </Col>
        )
    }
}

export default ProductCard;