import react, { ChangeEvent, useRef, useState } from 'react';
import arranhador from "assets/imagens/arranhador.png";
import style from './Feed.module.scss';
import classNames from 'classnames';
import posts from 'data/posts';
import moment from 'moment';

const Feed = () => {
    const [inativo, setInativo] = useState(false);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

    }

    const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
        const input = file.currentTarget;

        var reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            const stringURL = String(dataURL);
        };

        if (input.files) {
            reader.readAsDataURL(input.files[0]);
        }

        //Resolover esse negócio
    };

    const inputFile = useRef<HTMLInputElement | null>(null);

    const pegarImagem = () => {
        // `current` points to the mounted file input element
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    return (
        <main className='container'>
            <button onClick={() => setInativo(!inativo)} className={classNames({
                [style.largeButton]: true,
                [style.inativo]: inativo ? true : false
            })}>
                Poste sobre seu pet
            </button>
            <section className={inativo ? '' : style.inativo}>
                <form onSubmit={aoSubmeterForm} className={style.formPostagem}>
                    <div>
                        <label htmlFor='titulo'>Título</label>
                        <input type="text" id='titulo' placeholder='Escreva o título da postagem' />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='conteudo'>Conteúdo</label>
                        <textarea name='conteudo' id='conteudo' className={style.inputConteudo} rows={10} placeholder="Escreva o conteúdo da postagem"></textarea>
                    </div>
                    <br />
                    <button type='button' onClick={pegarImagem}>Inserir imagem</button>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        ref={inputFile}
                    />
                    <br />
                    <button type='submit' className={style.largeButton} onClick={() => setInativo(!inativo)}>Publicar</button>
                </form>
            </section>
            <section className={style.postagens}>
                {posts.map((post, index) => (
                    <div key={index} className={style.postagem}>
                        <p>{moment(post.date).format('lll')}</p>
                        {post.title && <h2>{post.title}</h2>}
                        {post.image && <img src={post.image} alt="" className='img-fluid' />}
                        <p>{post.content}</p>
                    </div>
                ))}
            </section>
        </main>


    )
}


export default Feed