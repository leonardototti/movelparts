import React, { useState } from "react";
import { Container } from 'react-bootstrap'
import Link from 'next/link'
import Search from '../components/Search'
import api from '../services/api'

import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiArrowDropDownLine } from 'react-icons/ri'

import styled from 'styled-components'
import { FHeaderContainer, NavbarContainer, Logo, NavigationLi, NavigationUl, SHeaderContainer, SHeaderFlexCont, SubMenuUl, SubMenuLi, InfoContainer, InfoLi } from '../styles/components/Header'

import { slide as Menu } from 'react-burger-menu'

type Categoria = {
    nome: String,
    slug: String
}

interface HeaderProps {
    categorias: Categoria[];
    configGeral: {
        emailmovel: String,
        phone_movel: String,
        instagramuser: String,
        animation_menu: String
    };
}

const Header: React.FC<HeaderProps> = ({ categorias, configGeral }) => {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
      setActive(!isActive);
    };    

    return (
        <header>
            <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} onStateChange={ handleToggle } customCrossIcon={ false } customBurgerIcon={ 
                <div className="burger-container">
                    <button aria-label="Menu" className={`hamburger hamburger--${convertMenuAnimation(configGeral.animation_menu)} ${isActive ? "" : "is-active"}`} type="button">
                    <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                    </button>
                </div>
            }>

            <div className="burguer-menu-container">
                <Link href="/">Home</Link>
                <Link href="/produtos">Produtos</Link>
                <Link href="/empresa">Empresa</Link>
                <Link href="/contato">Contato</Link>
            </div>
            </Menu>
            <FHeaderContainer>
                <Container>
                    <NavbarContainer>
                        <Link href="/">
                            <div>
                                <Logo src="/logo-text.svg" className="logo_desktop" alt="Logo Movel Part's" />
                                <Logo src="/logo.svg" className="logo_mobile" alt="Logo Movel Part's" />
                            </div>
                        </Link>
                        <Search />
                        <nav>
                            <NavigationUl> 
                                <Link href="/"><NavigationLi>Home</NavigationLi></Link>
                                <Link href="/produtos"><NavigationLi>Produtos</NavigationLi></Link>
                                <Link href="/empresa"><NavigationLi>Empresa</NavigationLi></Link>
                                <Link href="/contato"><NavigationLi>Contato</NavigationLi></Link>
                            </NavigationUl>
                        </nav>
                    </NavbarContainer>
                </Container>
            </FHeaderContainer>
            <SHeaderContainer>
                <Container>
                    <SHeaderFlexCont>
                        <div>
                            <ul className="d-flex align-items-center">
                                {
                                    categorias.length === 0 ? null :
                                    categorias.map((categoria: any, index) => {
                                        if (categoria.slug.includes('pe') || categoria.slug.includes('puxador')) {   
                                            return (
                                                <SubMenuLi key={index}>
                                                    <span>{categoria.nome}</span> <RiArrowDropDownLine />
                                                    <SubMenuUl>
                                                        {
                                                            categoria.produtos.map((produto: any, index) => {
                                                                return (
                                                                    <Link key={Math.floor(Math.random() * 100000)} href={`/produtos/${produto.slug}`}>
                                                                        <li >{produto.nome}</li>
                                                                    </Link>
                                                                )
                                                            })
                                                        }
                                                    </SubMenuUl>
                                                </SubMenuLi>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                        <InfoContainer>
                            <ul className="d-flex align-items-center">
                                <InfoLi>
                                    <FaPhoneAlt className="phone" /> <span>{configGeral.phone_movel}</span>
                                </InfoLi>
                                <InfoLi>
                                    <MdEmail className="mail" /> <span>{configGeral.emailmovel}</span>
                                </InfoLi>
                            </ul>
                        </InfoContainer>
                    </SHeaderFlexCont>
                </Container>
            </SHeaderContainer>
        </header>
    )
}

function convertMenuAnimation(apiresult) {
    let convertList = {
        'tresdx': '3dx',
        'tresdxr': '3dx-r',
        'tresdy': '3dy',
        'tresdyr': '3dy-r',
        'tresdxy': '3dxy',
        'tresdxyr': '3dxy-r',
        'arrow': 'arrow',
        'arrowr': 'arrow-r',
        'arrowalt': 'arrowalt',
        'arrowaltr': 'arrowalt-r',
        'arrowturn': 'arrowturn',
        'arrowturnr': 'arrowturn-r',
        'boring': 'boring',
        'collapse': 'collapse',
        'collapser': 'collapse-r',
        'elastic': 'elastic',
        'elasticr': 'elastic-r',
        'emphatic': 'emphatic',
        'emphaticr': 'emphatic-r',
        'minus': 'minus',
        'slider': 'slide-r',
        'sliderr': 'slider-r',
        'spring': 'spring',
        'springr': 'spring-r',
        'stand': 'stand',
        'standr': 'stand-r',
        'spin': 'spin',
        'spinr': 'spin-r',
        'squeeze': 'squeeze',
        'vortex': 'vortex',
        'vortexr': 'vortex-r'
    }
    return convertList[apiresult];
}

export default Header;