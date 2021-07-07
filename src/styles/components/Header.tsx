import styled from 'styled-components'

export const FHeaderContainer = styled.div`
    background: linear-gradient(90deg, #16222A 0%, #293650 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`

export const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media(max-width: 428px) {
        flex-direction: column;
    }

    @media(max-width: 992px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`

export const Logo = styled.img`
    max-height: 60px;
    cursor: pointer;
    user-select: none;

    &:active {
        opacity: .7;
    }

    @media(min-width: 577px) {
        &.logo_mobile {
            display: none; 
        }
    }

    @media(max-width: 576px) {
        &.logo_desktop{
            display: none;
        }

        &.logo_mobile {
            margin: 10px 0px;
            cursor: pointer;
        }
    }

    @media(max-width: 992px) {
        &.logo_desktop {
            margin: 10px 0px;
        }
    }
`

export const NavigationUl = styled.ul`
    display: flex;
    height: 100%;
    list-style: none;
    margin-bottom: 0!important;
    padding-left: 0!important;

    @media(max-width: 576px) {
        display: none;
        pointer-events: none;
    }
`

export const NavigationLi = styled.li`
    padding: 35px 15px;
    height: 100%;
    color: #E5E5E5;
    transition: .2s;
    font-family: Roboto;
    user-select: none;

    &:hover {
        cursor: pointer;
        color: #afafaf;
    }
    
    &.active {
        border-bottom: 3px solid #FFFFFF;
    }
`

export const SHeaderContainer = styled.div`
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const SHeaderFlexCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media(max-width: 576px) {
        justify-content: center;
    }

    & div ul.d-flex {
        padding-left: 0!important;
        margin-bottom: 0!important;
    }
`

export const SubMenuLi = styled.li`
    font-size: 15px;
    font-weight: 600!important;
    position: relative;

    list-style: none;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 7px 0px;
    font-family: Roboto;
    font-weight: 500;
    text-align: center;
    color: #293650;
    cursor: pointer;

    @media(max-width: 576px) {
        display: none;
    }

    @media(max-width: 992px) {
        &:nth-child(2) {
            margin: 0px 0px 0px 10px!important; 
        }
    }

    &:nth-child(2) {
        margin: 0px 40px;
    }

    & svg {
        font-size: 30px;
    } 

    &:hover ul {
        pointer-events: all;
        opacity: 1;
    }
    
`

export const SubMenuUl = styled.ul`
    list-style: none;
    position: absolute;
    top: 100%;
    display: flex;
    flex-direction: column;
    z-index: 999;
    left: -5%;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s;
    max-height: 350px;
    overflow-y: auto;
    padding-left: 0!important;
    margin-bottom: 0!important;

    & li {
        background-color: white;
        padding: 15px 10px;
        min-width: 200px;
        text-transform: uppercase;
        font-family: PT Sans;
        color: #306A8B;
        font-size: 14px;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.25);

        &:last-child {
            border-radius: 0px 0px 5px 5px;
            box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        }
    }
`

export const InfoContainer = styled.div`
    & ul {
        padding-left: 0!important;
        margin-bottom: 0!important;
    }

    @media(max-width: 576px) {
        & ul{
            flex-wrap: wrap;
            justify-content: center;
        }
    }
`

export const InfoLi = styled.li`
    list-style: none;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 7px 0;
    font-family: Roboto;
    font-weight: 500;
    text-align: center;
    color: #293650;
    cursor: pointer;

    @media(max-width: 992px) {
        &:nth-child(1) {
            margin: 0px 10px 0px 0px!important;
            
        }
    }   

    @media(max-width: 576px) { 
        & span {
            word-break: break-all;
        }
    }

    &:nth-child(1){
        margin: 0px 40px;
    }

    & span{
        margin-left: 5px;
    }

    & .phone {
        font-size: 20px;
    }

    & .mail {
        font-size: 25px;
    }
        
`