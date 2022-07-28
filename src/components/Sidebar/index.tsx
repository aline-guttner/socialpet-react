<<<<<<< HEAD
import style from 'Sidebar.module.scss'

export default function Sidebar() {
    return (
        <div></div>
=======
import style from './Sidebar.module.scss';
import add from 'assets/imagens/Frame 1.png';

export default function Sidebar() {
    return (
        <aside className={style.subscription}>
            <img src={add} className="img-fluid" alt="Propaganda de contribuição mensal para ajudar a tirar animais da rua" />
        </aside>
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
    )
}