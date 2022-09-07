import http from 'api';
import { useEffect, useState } from 'react';
import style from './Pet.module.scss';
import classNames from 'classnames';
import SalvarEditar from 'components/SalvarEditar';
import plus from 'assets/imagens/plus-16.png';
import x from 'assets/imagens/x-mark-16.png';
import { useParams } from 'react-router-dom';

interface Props {
    pet: string,
    petChange: boolean,
    setPetChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Pet({ pet, petChange, setPetChange }: Props) {
    const params = useParams()
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('--')
    const [oculto, setOculto] = useState(true)

    const ocultarBotao = () => {
        setOculto(!oculto)
    }

    const salvarDados = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
    }

    useEffect(() => {
        if (pet) {
            http.get(`pets/${pet}`)
            .then(res => {
                setNome(res.data.petName)
                setTipo(res.data.petType)
            }
            )
        }
        
    }, [])

    const excluirPet = () => {
        http.delete(`pets/${pet}`)
            .catch(err => console.log(err))


        http.get(`user/${params.id}`)
            .then(res => {
                let petArray = res.data.pets
                const petToBeRemoved = petArray.indexOf(pet)
                console.log(petToBeRemoved)
                if (petToBeRemoved > -1) { // only splice array when item is found
                    petArray.splice(petToBeRemoved, 1); // 2nd parameter means remove one item only
                }
                http.patch(`user/${params.id}`, 
                {
                    pets: petArray
                })
                .then(() => {
                    setPetChange(!petChange)
                    console.log('Pet alterado com sucesso')
            })
            .catch(err => {
                console.log(err)
                alert('Não foi possível salvar seus dados, tente novamente mais tarde.')
            })
            })      
    }

    const animais = ['--','Gato', 'Cachorro', 'Ave', 'Cavalo', 'Capivara', 'Cobra', 'Hamster', 'Aranha', 'Outro']
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
            <td><button className={classNames({
                [style.oculto]: true
            })}><img src={plus} alt='Símbolo de adição' /></button></td>
            <td><button onClick={excluirPet}><img src={x} alt='Xis' /></button></td>
            <td><SalvarEditar salvarDados={salvarDados} ocultarBotao={ocultarBotao} oculto={oculto} setOculto={setOculto} /></td>
        </tr>
    )
}