import style from './Principal.module.scss';
<<<<<<< HEAD

export default function Principal() {
    return (
        <section className={style.principal}>
            <h2>Dados</h2>
        </section>
=======
import tamara from 'assets/imagens/tamara-andreeva-priroda-peizazh-gory-altai-zhivotnoe-kot.jpg'
import classNames from 'classnames';
import pets from 'dados/pets'
import userPic from 'assets/imagens/User.png'

export default function Principal() {
    return (

        <section className={classNames({
            [style.principal]: true,
            "container": true
        })}>
            <img src={tamara} className="img-fluid" alt="foto de gato olhando para paisagem montanhosa" />
            <div className={style.fotosNomes}>
                <span className={style.fotosNomes__user}>
                    <img src={userPic} alt="Foto do usuário" />
                    <p>Fulano de Tal</p>
                </span>
                {pets.map(pet => (
                    <span className={style.fotosNomes__pets}>
                        <img src={pet.src} className={style.fotosNomes__pets__fotosPets} alt="Foto de animal" />
                        <p className={style.fotosNomes__pets__nomesPets}>{pet.nome}</p>
                    </span>
                ))}
            </div>
        </section>

>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
    )
}