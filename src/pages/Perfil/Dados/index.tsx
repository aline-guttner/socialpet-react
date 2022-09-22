import style from './Dados.module.scss';
import styleSection from 'styles/Section.module.scss';
import { useContext, useRef, useState, useEffect } from 'react';
import SalvarEditar from 'components/SalvarEditar';
import { UserContext } from 'contexts/UserContext';
import moment from 'moment';

export default function Dados() {
    const [oculto, setOculto] = useState(true)
    const { salvarUserDados } = useContext(UserContext)
    const [nome, setNome] = useState('')
    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('')
    const [data, setData] = useState<any>()
    const [telefone, setTelefone] = useState('')

    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            setNome(user.name)
            setUsuario(user.username)
            setEmail(user.email)
            setData(moment(user.birthDate).utc().format('YYYY-MM-DD'))
            setTelefone(user.phone)
        }

    }, [])

    const inputFile = useRef<HTMLInputElement | null>(null);

    const ocultarBotao = () => {
        setOculto(!oculto)
    }

    const salvarDadosUser = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        salvarUserDados(nome ? nome : undefined, usuario ? usuario : undefined, data ? data : undefined, telefone ? telefone : undefined)
    }

    return (
        <>
            <section className={styleSection.section}>
                <h2>Dados</h2>
                <form className={style.userForm} onSubmit={salvarDadosUser}>
                    <SalvarEditar salvarDados={salvarDadosUser} ocultarBotao={ocultarBotao} oculto={oculto} setOculto={setOculto} />
                    <br />
                    <br />
                    <label htmlFor="nome" >Nome</label>
                    <br />
                    <input type="text" name="nome" id="nome" value={nome} onChange={evento => setNome(evento.target.value)} ref={inputFile} readOnly={oculto ? true : false} />
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
                        name="dataNascimento" onChange={evento => setData(evento.target.value)} readOnly={oculto ? true : false} value={data} />
                    <hr />
                    <br />
                    <label htmlFor="phone" >Telefone</label>
                    <br />
                    <input type="phone" id="phone" onChange={evento => setTelefone(evento.target.value)}
                        name="phone" value={telefone} readOnly={oculto ? true : false} />
                    <hr />
                </form>
            </section>
        </>
    )
}