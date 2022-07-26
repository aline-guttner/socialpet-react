import style from './Menu.module.scss'
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import classNames from 'classnames';

interface Props {
    menu: boolean
}

export default function Menu({ menu }: Props) {
    return (

        < Col md={3} lg={3} className={menu === true ? style.menu : style.menu__inativo
        }>

            <h2>Perfil</h2>
            <ul>
                <li>Página inicial</li>
                <li>Amigos</li>
                <li>Fotos</li>
                <li>Eventos</li>
            </ul>
            <hr />

            <h2>Adoção de animais</h2>
            <ul>
                <li>Adote um animal</li>
                <li>Anuncie</li>
            </ul>
            <hr />
            <h2>Feed de notícias</h2>
            <hr />
            <button>Sair</button>
        </Col >
    )
}