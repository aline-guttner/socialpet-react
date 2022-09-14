import http from 'api';
import { useEffect, useState } from 'react';
import style from './Pet.module.scss';
import classNames from 'classnames';
import SalvarEditar from 'components/SalvarEditar';
import plus from 'assets/imagens/plus-16.png';
import x from 'assets/imagens/x-mark-16.png';
import { useParams } from 'react-router-dom';

interface Props {
    pet?: string,
    petChange: boolean,
    setPetChange: React.Dispatch<React.SetStateAction<boolean>>,
    ocultoHerdado?: boolean,
    pets?: string[],
    setPets?: React.Dispatch<React.SetStateAction<string[]>>,
    setAdicionando?: React.Dispatch<React.SetStateAction<boolean>>,
    adicionando?: boolean
}

export default function Pet({ pet, petChange, ocultoHerdado, setPetChange, setAdicionando }: Props) {
    const params = useParams()
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('--')
    const [oculto, setOculto] = useState(true)

    useEffect(() => {
        if (pet) {
            http.get(`pets/${pet}`)
                .then(res => {
                    setNome(res.data.petName)
                    setTipo(res.data.petType)
                }
                )
        }
        if (ocultoHerdado) {
            setOculto(false)
        }
    }, [])


    const ocultarBotao = () => {
        setOculto(!oculto)
    }

    const salvarDados = (evento: any) => {
        evento.preventDefault()
        if (pet) {
            http.patch(`pets/${pet}`, {
                petName: nome,
                petType: tipo
            })
                .then(() => {
                    setPetChange(!petChange)
                    alert('Dados alterados com sucesso!')
                })
                .catch(err => {
                    console.log(err)
                    alert('Não foi possível alterar os dados, tente novamente mais tarde.')
                })
        } else {
            http.post('pets/', {
                petName: nome,
                petType: tipo,
                petImg: "",
                userId: params.id
            })
                .then(res => {
                    let novoPet = res.data.pet._id
                    alert('Pet criado com sucesso!')
                    if (setAdicionando){
                        setAdicionando(false)
                    }
                    setPetChange(!petChange)
                    
                })
                .catch(err => {
                    alert('Não foi possível adicionar o pet, tente novamente mais tarde')
                    console.log(err)
                })
        }

    }

    const excluirPet = () => {
        if (pet) {
            http.delete(`pets/${pet}`)
                .then(() => {
                    alert('Pet removido com sucesso!')
                    setPetChange(!petChange)
                })
                .catch(err => {
                    console.log(err)
                    alert('Não foi possível remover o pet, tente novamente mais tarde.')
                })
        } else {
            if (setAdicionando) {
                setAdicionando(false)
            }
        }
    }

    const animais = ['--', 'Gato', 'Cachorro', 'Ave', 'Cavalo', 'Capivara', 'Cobra', 'Hamster', 'Aranha', 'Outro']
    return (
        <tr>
            <td><input className={classNames({
                [style.inputName]: true,
                [style.edicao]: oculto ? false : true
            })} type='text' value={nome} onChange={evento => setNome(evento.target.value)} /></td>
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
            <td><button onClick={excluirPet}><img src={x} alt='Xis' /></button></td>
            <td><SalvarEditar salvarDados={salvarDados} ocultarBotao={ocultarBotao} oculto={oculto} setOculto={setOculto} /></td>
        </tr>
    )
}