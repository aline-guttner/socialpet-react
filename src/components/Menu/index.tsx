<<<<<<< HEAD
import style from './Menu.module.scss'
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
=======
import style from './Menu.module.scss';
import { Link } from 'react-router-dom';
import logout from 'assets/imagens/logout-16.png';
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
import classNames from 'classnames';

interface Props {
    menu: boolean
}

export default function Menu({ menu }: Props) {
    return (

<<<<<<< HEAD
        < Col md={3} lg={3} className={menu === true ? style.menu : style.menu__inativo
        }>

            <h2>Perfil</h2>
            <ul>
                <li>Página inicial</li>
=======
        /*  */
        <aside className={classNames({
            [style.menu]: menu === true,
            [style.menu__inativo]: menu === false
        })}>

            <h2>Perfil</h2>
            <ul>
                <li><Link className={style.link} to={'/perfil'}> Página inicial</Link></li>
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
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
<<<<<<< HEAD
            <h2>Feed de notícias</h2>
            <hr />
            <button>Sair</button>
        </Col >
=======
            <h2><Link className={style.link} to={'/'}>Feed de notícias</Link></h2>
            <hr />
            <Link className={style.link} to={'/login'}><img src={logout} alt="" /> Sair</Link>
        </aside >
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
    )
}