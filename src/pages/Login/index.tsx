import style from './Login.module.scss';
import { useState, useContext, useEffect } from 'react';
import SPimg from 'assets/imagens/SocialPet.png';
import { Link, useNavigate } from 'react-router-dom';
import http from 'api';
import { UserContext } from 'contexts/UserContext';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { setUserData, setIdLogado, isAuthenticated, authenticated, setAuthenticated } = useContext(UserContext)
    let navigate = useNavigate();

    useEffect(() => {
        isAuthenticated();

        if (!authenticated) {
            navigate("../../")
        } else {
            let userId = localStorage.getItem('user')
            navigate(`../user/perfil/${userId}`)
            userId && setIdLogado(userId)
        }
    }, [])

    const aoSubmeterForm = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        try {
            let res = await http.post('auth/', {
                email: email,
                password: senha
            })
            if (res.data.token) {
                localStorage.setItem('token', res.data.token)
                navigate(`../user/perfil/${res.data.user._id}`)
                setIdLogado(res.data.user._id)
                setUserData(res.data.user._id)
                setAuthenticated(true)
                localStorage.setItem('user', res.data.user._id);
            }

        } catch (err) {
            console.log(err)
            alert('Credenciais incorretas!')
        }
    }
    return (
        <div className={style.orange}>
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
        </div>
    )
}



export default Login;

