import style from './Principal.module.scss';
import tamara from 'assets/imagens/tamara-andreeva-priroda-peizazh-gory-altai-zhivotnoe-kot.jpg'

export default function Principal() {
    return (

        <section className={style.principal}>
            <h2>Dados</h2>
            <img src={tamara} className="img-fluid" alt="foto de gato olhando para paisagem montanhosa" />
        </section>

    )
}