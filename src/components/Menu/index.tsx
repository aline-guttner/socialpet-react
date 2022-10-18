import style from './Menu.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import logout from 'assets/imagens/logout-16.png';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

interface Props {
    menu: boolean
}

export default function Menu({ menu }: Props) {
    const { idLogado } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token')
        window.location.reload()
    }

    return (
        <aside className={style.menu}>

            <h2>Perfil</h2>
            <ul>
                <li><Link className={style.link} to={`/user/perfil/${idLogado}`}> Página inicial</Link></li>
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
            })} to={`/user/feed/${idLogado}`}>Feed de notícias</Link></h2>
            <hr />
            <button onClick={handleSignOut} >
                <Link className={classNames({
                    [style.link]: true,
                    [style.sair]: true
                })} to={'/'}><img src={logout} alt="" /> Sair</Link>
            </button>

        </aside >
    )
}