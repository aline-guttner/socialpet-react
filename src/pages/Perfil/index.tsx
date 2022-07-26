import Header from 'components/Header'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import { Navbar, NavbarBrand } from 'react-bootstrap'
import Amigos from './Amigos'
import Fotos from './Fotos'
import style from './Perfil.module.scss'
import Pets from './Pets'
import Principal from './Principal'
import Row from 'react-bootstrap/Row';
import { useState } from 'react'


export default function Perfil() {
    const [menu, setMenu] = useState(true)
    return (
        <>
            <Row>
                <Header menu={menu} setMenu={setMenu} />
            </Row>
            <Row>
                <Menu menu={menu} />
            </Row>
        </>

    )
}