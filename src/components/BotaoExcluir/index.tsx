import xis from 'assets/imagens/x-mark-16.png';
import style from './BotaoExcluir.module.scss';

interface Props {

    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void
}

export default function BotaoExcluir({ onClick, type }: Props) {
    return (
        <button type={type} onClick={onClick}><img alt='Xis' className={style.xis} src={xis}></img></button>
    )
}