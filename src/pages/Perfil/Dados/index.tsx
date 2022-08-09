import style from './Dados.module.scss';
import styleSection from 'styles/Section.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import user from 'data/user';
import http from 'http';



export default function Dados(){
    const [oculto, setOculto] = useState(true)
    const [nome, setNome] = useState(user.name)

    const inputFile = useRef<HTMLInputElement | null>(null);

const ocultarBotao = () => {
    setOculto(!oculto)
}

const salvarDados = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
console.log('oi')
}

useEffect(() => {
    
}, [])

    return(
        <section className={styleSection.section}>
            <h2>Dados</h2>
            <form className={style.userForm} action="">
                <button type='button' className={classNames({
                    [style.oculto]: oculto ? false : true
                })} onClick={ocultarBotao}>Editar</button>
                <button type='button' className={classNames({
                    [style.oculto]: oculto ? true : false
                })} onClick={ocultarBotao}>Salvar</button>
                <br/>
                <br/>
                <label htmlFor="nome" >Nome</label>
                <br/>
                <input type="text" name="nome" id="nome" value={nome} ref={inputFile}  readOnly={ oculto ? true: false}/>
                <hr />
                <br/>
                <label htmlFor="usuario">Usuário</label>
                <br/>
                <input type="text" name="usuario" id="usuario" value={user.username} readOnly={ oculto ? true: false} />
                <hr />
                <br/>
                <label htmlFor="email">Email</label>
                <br/>
                <input type="email" name="email" id="email" value={user.email} readOnly={ oculto ? true: false}/>
                <hr />
                <br/>
                <label htmlFor="dataNascimento">Data de Nascimento</label>
                <br/>
                <input type="date" id="dataNacimento"
                name="dataNascimento" readOnly={ oculto ? true: false} />
                <hr />
                  <br/>
                <label htmlFor="phone">Telefone</label>
                <br/>
                <input type="phone" id="phone"
                name="phone" value={user.phone} readOnly={ oculto ? true: false}/>
                <hr />
            </form>
        </section>
    )
}