import style from './Login.module.scss'
import react from 'react';
import SPimg from 'assets/imagens/SocialPet.png'


const Login = () => {
    return (
        <form className={style.loginForm}>
            <img src={SPimg}
                alt="Logo de gato branco caminhado em um fundo laranja e título 'Social Pet' ao lado" />
            <div className="form-group row">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Senha</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" placeholder="Senha" />
                </div>
            </div>
            <button type="submit" aria-label="Botão para fazer login" className={style.loginButton}
                /*</form>*onClick={}*/>Log in</button>
            <hr />
            <span>
                <p className={style.pinscricao}>Não tem uma conta? <a className={style.inscricao} href="cadastro/cadastro.html">Cadastre-se</a></p>
            </span>
        </form>
    )
}



export default Login;