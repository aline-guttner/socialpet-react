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
    const [confSenha, setConfSenha] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (senha === confSenha) {
            http.get('user/')
                .then(res => {
                    res.data.users.find((user: { email: string; }) => user.email === email)
                    alert('Usuário já cadastrado.')
                })
                .catch(() => {
                    http.post('auth/register', {
                        name: nome,
                        username: usuario,
                        email: email,
                        password: senha
                    })
                        .then(() => {
                            setNome('')
                            setUsuario('')
                            setEmail('')
                            setSenha('')
                            setConfSenha('')
                            alert('Conta criada com sucesso!')
                        })
                        .catch(err => console.log(err))
                    }
            )
        } else {
            alert('Senhas não conferem!')
        }




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
                <input type='text' id='nome' required name='nome' placeholder='Fulano de Tal' value={nome}
                    onChange={evento => setNome(evento.target.value)}
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' required name='email' placeholder='fulanodetal@gmail.com' value={email}
                    onChange={evento => setEmail(evento.target.value)}
                />
            </div>
            <div>
                <label htmlFor='usuario'>Usuário</label>
                <input type='text' id='usuario' required name='usuario' placeholder='fulano_detal' value={usuario}
                    onChange={evento => setUsuario(evento.target.value)}
                />
            </div>

            <div className={style.senhas}>
                <div className={style.divPassword1}>
                    <label htmlFor="password1" >Senha</label>
                    <input type="password" id="password1" name="up" required placeholder="Exe1mp7l0o" value={senha}
                        onChange={evento => setSenha(evento.target.value)}
                    />
                </div>
                <div className={style.divPassword2}>
                    <label htmlFor="password2">Confirmar senha</label>
                    <input type="password" id="password2" name="up" required placeholder="Exe1mp7l0o" value={confSenha}
                        onChange={evento => setConfSenha(evento.target.value)}
                    />
                </div>

            </div>
            <Button type="submit">
                Criar conta
            </Button>
            <hr />
            <p className={style.plogin}>Já tem uma conta?<Link className={style.login} to={'/'}> Faça login</Link></p>
        </form >
    )
}

export default Cadastro