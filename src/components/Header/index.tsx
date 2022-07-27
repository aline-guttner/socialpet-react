import style from './Header.module.scss'
import logo from 'assets/imagens/Myproject.png'
import mymenu from 'assets/imagens/menu-4-32.png'

interface Props {
    menu: boolean,
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ menu, setMenu }: Props) {
    return (
        <header className={style.mynavbar}>
            <button onClick={() => (setMenu(!menu))} className={style.botaoMenu}><img id="menu"
                src={mymenu} alt="Menu branco" /></button><img src={logo} alt="silhueta de gato branco" />
        </header>
    )
}

