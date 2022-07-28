import style from './Header.module.scss'
<<<<<<< HEAD
import myprojectpng from "assets/imagens/My project.png"
import Col from 'react-bootstrap/Col';
=======
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
import logo from 'assets/imagens/Myproject.png'
import mymenu from 'assets/imagens/menu-4-32.png'

interface Props {
    menu: boolean,
    setMenu: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({ menu, setMenu }: Props) {
    return (
<<<<<<< HEAD
        <Col className={style.mynavbar}>
            <button onClick={() => (setMenu(!menu))} className={style.botaoMenu}><img id="menu"
                src={mymenu} alt="Menu branco" /></button><img src={logo} alt="silhueta de gato branco" />
        </Col>
=======
        <header className={style.mynavbar}>
            <button onClick={() => (setMenu(!menu))} className={style.botaoMenu}><img id="menu"
                src={mymenu} alt="Menu branco" /></button><img src={logo} alt="silhueta de gato branco" />
        </header>
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
    )
}

