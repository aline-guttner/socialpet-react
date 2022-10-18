import lapis from 'assets/imagens/pencil-16.png';
import { UserContext } from 'contexts/UserContext';
import { Protected } from 'hooks/Auth';
import { useContext } from 'react';
import { useParams } from 'react-router';
import style from './BotaoEditar.module.scss';

interface Props {

    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void
}

export default function BotaoEditar({ onClick, type }: Props) {
    const params = useParams();
    const { idLogado } = useContext(UserContext);
    return (
        <Protected userId={idLogado} paramsId={params.id}>
            <button type={type} onClick={onClick}><img alt='Lápis' src={lapis} className={style.editar}></img></button>
        </Protected>
    )
}