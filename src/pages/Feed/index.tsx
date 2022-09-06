import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from './Feed.module.scss';
import classNames from 'classnames';
import posts from 'data/posts';
import moment from 'moment';
import xis from 'assets/imagens/x-mark-16.png';

const Feed = () => {
    const [inativo, setInativo] = useState(false);
    const [prevImg, setPrevImg] = useState<string[]>([]);

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

    }
    
    useEffect(() =>{
        console.log(prevImg)
    }, [prevImg])

    const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
        const input = file.currentTarget;
        if (input.files) {
            let inputFiles = input.files;
            let newArr = Array.from(inputFiles);

            newArr.forEach(img => {
                var reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = function () {
                    const dataURL = reader.result;
                    const stringURL = String(dataURL);
                    setPrevImg(prevState => [...prevState, stringURL]);
                };
            })
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
                    <div><button type='button' onClick={pegarImagem}>Inserir imagem</button>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        ref={inputFile}
                        multiple
                    />
                    </div>
                    <div className={style.previewList}>
                        {prevImg.length !== 0 && prevImg.map((img, index) => (
                            <div className={style.previewList__preview} key={index}>
                                <img src={img} className={style.previewList__preview__prevImg} alt="" />
                                <img src={xis} className={style.previewList__preview__xis} alt="" />
                            </div>
                        ))}
                    </div>
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