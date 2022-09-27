import style from './Menu.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import logout from 'assets/imagens/logout-16.png';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';

interface Props {
    menu: boolean
}

export default function Menu({ menu }: Props) {
    let params = useParams();

    return (
        <aside className={style.menu}>

            <h2>Perfil</h2>
            <ul>
                <li><Link className={style.link} to={`/user/perfil/${params.id}`}> Página inicial</Link></li>
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
            <h2><Link className={classNames({
                [style.link]: true,
                [style.feed]: true
            })} to={`/user/feed/${params.id}`}>Feed de notícias</Link></h2>
            <hr />
            <Link className={style.link} to={'/'}><img src={logout} alt="" /> Sair</Link>
        </aside >
    )
}