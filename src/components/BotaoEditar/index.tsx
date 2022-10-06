import lapis from 'assets/imagens/pencil-16.png';
import style from './BotaoEditar.module.scss';

interface Props {

    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void
}

export default function BotaoEditar({ onClick, type }: Props) {
    return (
        <button type={type} onClick={onClick}><img alt='Lápis' src={lapis} className={style.editar}></img></button>
    )
}