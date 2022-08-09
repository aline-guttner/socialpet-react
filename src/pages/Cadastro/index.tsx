import style from './Cadastro.module.scss';
import Button from 'components/Button/Button';
import SPimg from 'assets/imagens/SocialPet.png';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import http from 'api';
import { useState } from 'react';


function Cadastro() {
    const [nome, setNome] = useState('')
    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        http.post('auth/register', {
            name: nome,
            username: usuario,
            email: email,
            password: senha 
        })
        .then(() => {
            alert('Conta criada com sucesso!')
        })
        .catch(error => console.log(error))
    }

    return (
        <form onSubmit={aoSubmeterForm} className={classNames({
            [style.cadastroForm]: true,
            "container": true
        })}>
            <img src={SPimg}
                alt="Logo de gato branco caminhado em um fundo laranja e título 'Social Pet' ao lado"></img>
            <div>
                <label htmlFor='nome'>Nome</label>
                <input type='text' id='nome' required name='nome' placeholder='Fulano de Tal'
                onChange={evento => setNome(evento.target.value)}
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' required name='email' placeholder='fulanodetal@gmail.com' 
                onChange={evento => setEmail(evento.target.value)}
                />
            </div>
            <div>
                <label htmlFor='usuario'>Usuário</label>
                <input type='text' id='usuario' required name='usuario' placeholder='fulano_detal'
                onChange={evento => setUsuario(evento.target.value)}
                />
            </div>
           
            <div className={style.senhas}>
                <div className={style.divPassword1}>
                    <label htmlFor="password1" >Senha</label>
                    <input type="password" id="password1" name="up" required placeholder="Exe1mp7l0o"
                    onChange={evento => setSenha(evento.target.value)}
                    />
                </div>
                <div className={style.divPassword2}>
                    <label htmlFor="password2">Confirmar senha</label>
                    <input type="password" id="password2" name="up" required placeholder="Exe1mp7l0o" />
                </div>

            </div>
            <Button type="submit">
                Criar conta
            </Button>
            <hr />
            <p className={style.plogin}>Já tem uma conta?<Link className={style.login} to={'/login'}> Faça login</Link></p>
        </form >
    )
}

export default Cadastro