import { useContext, useState } from 'react';
import style from './Excluir.module.scss';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';

export default function Excluir() {
    const [excluindo, setExcluindo] = useState(false)
    const [overflow, setOverflow] = useState('visible')

    const { excluirUser } = useContext(UserContext)

    const navigate = useNavigate();

    document.body.style.overflow = overflow

    const excluir = () => {
        setExcluindo(true)
        setOverflow('hidden')
    }

    const deletarUsuario = () => {
        excluirUser();
        navigate('../../');
    }

    return (
        <>
            <button className={style.excluir} onClick={excluir}>Deletar conta</button>
            {excluindo && <div className={style.popup}>
                <p>Tem certeza que deseja deletar sua conta? Você não poderá recuperá-lá depois.</p>
                <span><button onClick={deletarUsuario}>Deletar</button><button onClick={() => { setExcluindo(false); setOverflow('visible') }}>Cancelar</button></span>
            </div>}
        </>
    )
}