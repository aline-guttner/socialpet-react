import http from 'api'
import SalvarEditar from 'components/SalvarEditar'
import IPet from 'interfaces/IPet'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pet from '../../Dados/Pet'
import style from './Pets.module.scss'




export default function Pets() {
    const params = useParams()
    const [pets, setPets] = useState([])
    const [oculto, setOculto] = useState(true)

    useEffect(()=>{
        http.get(`user/${params.id}`)
        .then(res =>{
            setPets(res.data.pets)
        })
    },[])

    const ocultarBotao = () => {
        setOculto(!oculto)
    }

    const salvarDados = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        // DEFINIR FUNÇÃO

    }

    return (
        <section>
            <form onSubmit={salvarDados}>
            <SalvarEditar salvarDados={salvarDados} ocultarBotao={ocultarBotao} oculto={oculto} setOculto={setOculto}/>
            <table>
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Tipo</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, index) => (
                        <Pet oculto={oculto} setOculto={setOculto} pet={pet} key={index}/>
                    ))}
                </tbody>
            </table>
            </form>
        </section>
    )
}