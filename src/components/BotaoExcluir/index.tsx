import xis from 'assets/imagens/x-mark-16.png';
import { UserContext } from 'contexts/UserContext';
import { useContext } from 'react';
import { useParams } from 'react-router';
import style from './BotaoExcluir.module.scss';

interface Props {

    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void
}

export default function BotaoExcluir({ onClick, type }: Props) {
    const { idLogado, Protected } = useContext(UserContext)
    const params = useParams();
    return (
        <Protected userId={idLogado} paramsId={params.id}>
            <button type={type} onClick={onClick} className={style.excluir}><img alt='Xis' className={style.xis} src={xis}></img></button>
        </Protected>
    )
}