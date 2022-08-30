import react, { useState } from 'react';
import arranhador from "assets/imagens/arranhador.png";
import style from './Feed.module.scss';
import classNames from 'classnames';


const Feed = () => {
    const [inativo, setInativo] = useState(false);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

    }
    return (
        <main className='container'>
             <button onClick={() => setInativo(!inativo)} className={classNames({
                    [style.largeButton] : true,
                    [style.inativo] : inativo ? true : false
                })}>
                    Poste sobre seu pet
                </button>
            <section className={inativo ? '' : style.inativo}>
                <form onSubmit={aoSubmeterForm} className={style.formPostagem}>
                    <div>
                        <label htmlFor='titulo'>Título</label>
                        <input type="text" id='titulo' placeholder='Escreva o título da postagem'/>
                    </div>
                    <br />
                    <div>
                        <label htmlFor='conteudo'>Conteúdo</label>
                        <textarea name='conteudo' id='conteudo' className={style.inputConteudo} rows={10} placeholder="Escreva o conteúdo da postagem"></textarea>
                    </div>
                    <br />
                    <button type='button'>Inserir imagem</button>
                    <br />
                    <button type='submit' className={style.largeButton} onClick={() => setInativo(!inativo)}>Publicar</button>
                </form>
            </section>
            <section></section>
        </main>


    )
}


export default Feed