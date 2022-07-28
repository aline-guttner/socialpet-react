import style from './Form.module.scss'
import logo from "assets/imagens/SocialPet.png"
import Button from 'components/Button/Button'
import SPimg from 'assets/imagens/SocialPet.png'
<<<<<<< HEAD
=======
import { Link } from 'react-router-dom'
import { classicNameResolver } from 'typescript'
import classNames from 'classnames';
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86

interface Props {
    dados: {
        id: string,
        placeholder: string,
        type: string,
        label: string
    }[]

}

function Form({ dados }: Props) {
    return (
<<<<<<< HEAD
        <form className={style.cadastroForm}>
            <img src={SPimg}
                alt="Logo de gato branco caminhado em um fundo laranja e título 'Social Pet' ao lado"></img>
            {dados.map(dado => (
                <div key={dado.id}>
                    <label htmlFor={dado.id}>{dado.label}</label>
                    <input type={dado.type} id={dado.id} required name={dado.id} placeholder={dado.placeholder} />
                </div>
            ))}
=======
        <form className={classNames({
            [style.cadastroForm]: true,
            "container-fluid": true
        })}>
            <img src={SPimg}
                alt="Logo de gato branco caminhado em um fundo laranja e título 'Social Pet' ao lado"></img>
            {
                dados.map(dado => (
                    <div key={dado.id}>
                        <label htmlFor={dado.id}>{dado.label}</label>
                        <input type={dado.type} id={dado.id} required name={dado.id} placeholder={dado.placeholder} />
                    </div>
                ))
            }
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
            <div className={style.senhas}>
                <div className={style.divPassword1}>
                    <label htmlFor="password1" >Senha</label>
                    <input type="senha" id="password1" name="up" required placeholder="Exe1mp7l0o" />
                </div>
                <div className={style.divPassword2}>
                    <label htmlFor="password2">Confirmar senha</label>
                    <input type="senha" id="password2" name="up" required placeholder="Exe1mp7l0o" />
                </div>

            </div>
            <Button type="submit" onClick={() => { }}>
                Criar conta
            </Button>
<<<<<<< HEAD
        </form>
=======
            <hr />
            <p className={style.plogin}>Já tem uma conta?<Link className={style.login} to={'/login'}> Faça login</Link></p>
        </form >
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
    )
}

export default Form