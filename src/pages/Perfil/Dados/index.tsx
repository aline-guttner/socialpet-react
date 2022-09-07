import style from './Dados.module.scss';
import styleSection from 'styles/Section.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import http from 'api';
import { useParams } from 'react-router-dom';
import Pets from '../Principal/Pets'
import SalvarEditar from 'components/SalvarEditar';

interface Props{
    nome: string, 
    setNome: React.Dispatch<React.SetStateAction<string>>,
    usuario: string,
    setUsuario: React.Dispatch<React.SetStateAction<string>>,
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    data: string,
    setData: React.Dispatch<React.SetStateAction<string>>,
    telefone: string,
    setTelefone: React.Dispatch<React.SetStateAction<string>>
}

export default function Dados({nome, setNome, usuario, setUsuario, email, setEmail, data, setData, telefone, setTelefone}: Props) {
    const params = useParams();
    const [oculto, setOculto] = useState(true)

    const inputFile = useRef<HTMLInputElement | null>(null);

    const ocultarBotao = () => {
        setOculto(!oculto)
    }

    const salvarDados = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        http.patch(`user/${params.id}`, {
            name: nome,
            username: usuario,
            birthDate: data,
            phone: telefone
        })
        .then(() => alert('Dados alterados com sucesso!'))
        .catch(err => {
            console.log(err)
            alert('Não foi possível salvar seus dados, tente novamente mais tarde.')
        })

    }

    return (
        <>
        <section className={styleSection.section}>
            <h2>Dados</h2>
            <form className={style.userForm} onSubmit={salvarDados}>
               <SalvarEditar salvarDados={salvarDados} ocultarBotao={ocultarBotao} oculto={oculto} setOculto={setOculto}/>
                <br />
                <br />
                <label htmlFor="nome" >Nome</label>
                <br />
                <input type="text" name="nome" id="nome" onChange={evento => setNome(evento.target.value)} value={nome} ref={inputFile} readOnly={oculto ? true : false} />
                <hr />
                <br />
                <label htmlFor="usuario">Usuário</label>
                <br />
                <input type="text" name="usuario" id="usuario" onChange={evento => setUsuario(evento.target.value)} value={usuario} readOnly={oculto ? true : false} />
                <hr />
                <br />
                <label htmlFor="email">Email</label>
                <br />
                <input type="email" name="email" id="email" value={email} readOnly />
                <hr />
                <br />
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <br />
                <input type="date" id="dataNacimento"
                    name="dataNascimento" onChange={evento => setData(evento.target.value)} readOnly={oculto ? true : false} />
                <hr />
                <br />
                <label htmlFor="phone">Telefone</label>
                <br />
                <input type="phone" id="phone" onChange={evento => setTelefone(evento.target.value)}
                    name="phone" value={telefone} readOnly={oculto ? true : false} />
                <hr />
            </form>
        </section>
        </>
        
    )
}