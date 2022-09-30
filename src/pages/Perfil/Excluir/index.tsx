import { useState } from 'react';
import style from './Excluir.module.scss';

export default function Excluir() {
    const [excluindo, setExcluindo] = useState(false)
    const excluir = () => {
        setExcluindo(true)
    }
    return (
        <>
            <button className={style.excluir} onClick={excluir}>Deletar conta</button>
            {excluindo && <div className={style.popup}>
                <p>Tem certeza que deseja deletar sua conta? Você não poderá recuperá-lá depois.</p>
                <span><button>Deletar</button><button>Cancelar</button></span>
            </div>}
        </>
    )
}