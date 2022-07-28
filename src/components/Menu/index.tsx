import style from './Menu.module.scss';
import { Link } from 'react-router-dom';
import logout from 'assets/imagens/logout-16.png';
import classNames from 'classnames';

interface Props {
    menu: boolean
}

export default function Menu({ menu }: Props) {
    return (

        /*  */
        <aside className={classNames({
            [style.menu]: menu === true,
            [style.menu__inativo]: menu === false
        })}>

            <h2>Perfil</h2>
            <ul>
                <li><Link className={style.link} to={'/perfil'}> Página inicial</Link></li>
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
            <h2><Link className={style.link} to={'/'}>Feed de notícias</Link></h2>
            <hr />
            <Link className={style.link} to={'/login'}><img src={logout} alt="" /> Sair</Link>
        </aside >
    )
}