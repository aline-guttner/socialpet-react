import { useContext, useState, useEffect } from 'react';
import style from './Pet.module.scss';
import classNames from 'classnames';
import SalvarEditar from 'components/SalvarEditar';
import plus from 'assets/imagens/plus-16.png';
import x from 'assets/imagens/x-mark-16.png';
import { useParams } from 'react-router-dom';
import { UserContext } from 'contexts/UserContext';
import IPet from 'interfaces/IPet';
import { useApi } from 'hooks/useApi';

interface Props {
    pet?: IPet,
    ocultoHerdado?: boolean,
}

export default function Pet({ pet, ocultoHerdado }: Props) {
    const params = useParams()
    const [petNome, setPetNome] = useState('')
    const [tipo, setTipo] = useState('--')
    const [oculto, setOculto] = useState(true)

    const { mutate } = useApi(`pets/${pet?._id}`)

    const { salvarPetsDados, excluirPet } = useContext(UserContext)

    useEffect(() => {
        if (pet) {
            setPetNome(pet.petName)
            setTipo(pet.petType)
        }
        if (ocultoHerdado) {
            setOculto(false)
        }
    }, [])

    const ocultarBotao = () => {
        setOculto(!oculto)
    }

    const salvarDadosPets = (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        evento.preventDefault()
        salvarPetsDados(evento, pet?._id, petNome, tipo)
        mutate();
    }

    const animais = ['--', 'Gato', 'Cachorro', 'Ave', 'Cavalo', 'Capivara', 'Cobra', 'Hamster', 'Aranha', 'Outro']
    return (
        <tr>
            <td><input className={classNames({
                [style.inputName]: true,
                [style.edicao]: oculto ? false : true
            })} type='text' value={petNome} onChange={evento => setPetNome(evento.target.value)} /></td>
            <td>
                <p className={oculto ? '' : style.oculto}>{tipo}</p>
                <select className={classNames({
                    [style.edicao]: true,
                    [style.oculto]: oculto ? true : false
                })} name='tipo' id='tipo' onChange={evento => setTipo(evento.target.value)}>
                    {animais.map((animal, index) => (
                        <option key={index} value={animal}>{animal}</option>
                    ))}
                </select>
            </td>
            <td><button className={style.oculto}><img src={plus} alt='Símbolo de adição' /></button></td>
            <td><button onClick={() => excluirPet(pet?._id)}><img src={x} alt='Xis' /></button></td>
            <td><SalvarEditar salvarDados={salvarDadosPets} ocultarBotao={ocultarBotao} oculto={oculto} setOculto={setOculto} /></td>
        </tr>
    )
}