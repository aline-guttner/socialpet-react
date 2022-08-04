import Header from 'components/Header'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import { Navbar, NavbarBrand } from 'react-bootstrap'
import Amigos from './Amigos'
import Fotos from './Fotos'
import style from './Perfil.module.scss'
import Principal from './Principal'
import Row from 'react-bootstrap/Row';
import { useState } from 'react'
import Dados from './Dados'


export default function Perfil() {
    return (
        <main className='container'>
            <Principal />
            <Dados/>
        </main>
    )
}