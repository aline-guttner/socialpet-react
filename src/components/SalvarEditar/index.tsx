import style from './SalvarEditar.module.scss';
import classNames from 'classnames';
import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';
import { useParams } from 'react-router';

interface Props {
    ocultarBotao: () => void
    salvarDados: (evento: any) => void,
    oculto: boolean,
    setOculto: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SalvarEditar({ ocultarBotao, salvarDados, oculto, setOculto }: Props) {
    const { idLogado, Protected } = useContext(UserContext)
    const params = useParams();
    return (
        <Protected userId={idLogado} paramsId={params.id}>
            <button type='button' className={classNames({
                [style.oculto]: oculto ? false : true,
                [style.salvarEditar]: true
            })} onClick={ocultarBotao}>Editar</button>
            <button type='submit' className={classNames({
                [style.oculto]: oculto ? true : false,
                [style.salvarEditar]: true
            })} onClick={evento => { ocultarBotao(); salvarDados(evento); }}>Salvar</button>
        </Protected>
    )
}