import http from "api";
import { useEffect, useState } from "react";
import style from './Pet.module.scss';
import classNames from 'classnames';

interface Props {
    pet: string,
    oculto: boolean,
    setOculto: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Pet({ pet, oculto, setOculto }: Props) {
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('--')

    useEffect(()=>{
        http.get(`pets/${pet}`)
        .then(res => {
            setNome(res.data.petName)
            setTipo(res.data.petType)
        }
        )
    },[])

    return (
        <tr>
            <td><input className={classNames({
                [style.inputName]: true,
                [style.edicao]: oculto ? false : true
            })}type="text" value={nome} onChange={evento => setNome(evento.target.value)} /></td>
            <td>
                <p className={oculto ? '' : style.oculto}>{tipo}</p>
                <select className={classNames({
                    [style.edicao] : true,
                    [style.oculto]: oculto ? true: false
                })} name="tipo" id="tipo" onChange={evento => setTipo(evento.target.value)}>
                <option value="--">--</option>
                <option value="Gato">Gato</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Ave">Ave</option>
                <option value="Cavalo">Cavalo</option>
                <option value="Outro">Outro</option>
                </select>
            </td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}