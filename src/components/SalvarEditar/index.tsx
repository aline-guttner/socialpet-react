import style from './SalvarEditar.module.scss';
import classNames from 'classnames';

interface Props{
    ocultarBotao: () => void
    salvarDados: (evento: any) => void,
    oculto: boolean,
    setOculto: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SalvarEditar({ocultarBotao, salvarDados, oculto, setOculto}: Props){
    return(
        <>
        <button type='button' className={classNames({
            [style.oculto]: oculto ? false : true,
            [style.salvarEditar]: true
        })} onClick={ocultarBotao}>Editar</button>
        <button type='submit' className={classNames({
            [style.oculto]: oculto ? true : false,
            [style.salvarEditar]: true
        })} onClick={evento => {ocultarBotao(); salvarDados(evento);}}>Salvar</button>
        </>
    )
}