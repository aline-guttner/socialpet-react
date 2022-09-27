import style from './Login.module.scss';
import { useState, useContext } from 'react';
import SPimg from 'assets/imagens/SocialPet.png';
import { Link, useNavigate } from 'react-router-dom';
import http from 'api';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    let navigate = useNavigate();

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        http.post('auth/', {
            email: email,
            password: senha
        })
            .then(user => {
                if (user.data.token) {
                    navigate(`../user/perfil/${user.data.user._id}`)
                }

            })
            .catch(() => alert('Usuário não encontrado'))
    }

    return (
        <form className={style.loginForm} onSubmit={aoSubmeterForm}>
            <img src={SPimg}
                alt="Logo de gato branco caminhado em um fundo laranja e título 'Social Pet' ao lado" />
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onChange={evento => setEmail(evento.target.value)} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Senha</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" placeholder="Senha" onChange={evento => setSenha(evento.target.value)} />
                </div>
            </div>
            <button type="submit" aria-label="Botão para fazer login" className={style.loginButton}
            >Log in</button>
            <hr />
            <span>
                <p className={style.pinscricao}>Não tem uma conta? <Link className={style.inscricao} to={"/cadastro"}>Cadastre-se</Link></p>
            </span>
        </form>
    )
}



export default Login;

