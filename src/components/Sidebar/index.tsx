import style from './Sidebar.module.scss';
import add from 'assets/imagens/Frame 1.png';

export default function Sidebar() {
    return (
        <aside className={style.subscription}>
            <img src={add} className="img-fluid" alt="Propaganda de contribuição mensal para ajudar a tirar animais da rua" />
        </aside>
    )
}