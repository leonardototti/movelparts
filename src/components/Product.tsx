import React from 'react'
import Link from 'next/link'

import { Col } from 'react-bootstrap'

import styles from '../styles/components/Product.module.css'

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
    produto: Produto;
}

const Product: React.FC<ProductCardProps> = ({ produto }) => {
    return(
        <Col md={6} lg={3}>
            <div className={styles.product_container}>
                <div className={styles.image_container}>
                    <Link href={`/produtos/${produto.slug}`}>
                        <div className={styles.image}
                            style={{ backgroundImage: `url('https://res.cloudinary.com/movelparts/image/upload/c_fill,g_center,h_700,w_700/${produto.imagem.provider_metadata.public_id}.webp')` }}>
                        </div>
                    </Link>
                </div>
                <div className={styles.product_title}>
                    <h3>{produto.nome}</h3>
                </div>
            </div>
        </Col>
    )
}

export default Product;