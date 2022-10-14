import { useEffect, useRef, useState } from 'react';
import style from './Feed.module.scss';
import classNames from 'classnames';
import xis from 'assets/imagens/x-mark-16.png';
import { useParams } from 'react-router-dom';
import IPost from 'interfaces/IPost';
import { useContext } from 'react';
import { PostContext } from 'contexts/PostContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';
import Post from 'components/Post';

const Feed = () => {
    const params = useParams();
    const { data } = useApi('posts/')
    const [numberOfPosts, setNumberOfPosts] = useState(30)
    const [postsMostrados, setPostsMostrados] = useState<IPost[]>([])
    const { inativo, setInativo, prevImg, titulo, setTitulo, conteudo, setConteudo, feed, getPosts, handlePostChange, publicarPost, setPreviewList } = useContext(PostContext)


    useEffect(() => {
        getPosts(params.id, data)
    }, [data])

    useEffect(() => {
        setPostsMostrados(() => [...feed.slice(feed.length - numberOfPosts, feed.length).reverse()])
    }, [numberOfPosts, getPosts])

    const inputFile = useRef<HTMLInputElement | null>(null);

    const pegarImagem = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    const publicar = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        publicarPost(params.id)
    }

    const increase = () => {
        if (feed.length <= 30) {
            return
        } else if (
            feed.length < numberOfPosts + 30
        ) {
            setNumberOfPosts(feed.length)
        } else {
            setNumberOfPosts(numberOfPosts + 30)
        }
    }

    if (feed === undefined) return <main><h1 className={sectionStyle.carregando}>Carregando...</h1></main>

    return (
        <main className='container'>
            <button onClick={() => setInativo(!inativo)} className={classNames({
                [style.largeButton]: true,
                [style.inativo]: inativo ? true : false
            })}>
                Poste sobre seu pet
            </button>
            <section className={inativo ? '' : style.inativo}>
                <form className={style.formPostagem} onSubmit={evento => publicar(evento)}>
                    <div>
                        <label htmlFor='titulo'>Título</label>
                        <input type="text" id='titulo' placeholder='Escreva o título da postagem' value={titulo}
                            onChange={evento => setTitulo(evento.target.value)} />
                    </div>
                    <br />
                    <div>
                        <label htmlFor='conteudo'>Conteúdo</label>
                        <textarea name='conteudo' id='conteudo' className={style.inputConteudo} rows={10} placeholder="Escreva o conteúdo da postagem" value={conteudo}
                            onChange={evento => setConteudo(evento.target.value)}
                        ></textarea>
                    </div>
                    <br />
                    <div><button type='button' onClick={pegarImagem}>Inserir imagem</button>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={evento => handlePostChange(evento)}
                            ref={inputFile}
                            multiple
                        />
                    </div>
                    <div className={style.previewList}>
                        {prevImg.length !== 0 && prevImg.map((img, index) => (
                            <div className={style.previewList__preview} key={index}>
                                <img src={img} className={style.previewList__preview__prevImg} alt="" />
                                <button onClick={() => setPreviewList(index)}>
                                    <img src={xis} className={style.previewList__preview__xis} alt="" />
                                </button>
                            </div>
                        ))}
                    </div>
                    <br />
                    <button type='submit' className={style.largeButton}>Publicar</button>
                </form>
            </section>
            <section className={style.postagens}>
                {postsMostrados.length ? postsMostrados.map((post: IPost) => (
                    <Post post={post} key={post._id} />
                )) : feed.slice(feed.length - 30, feed.length).reverse().map((post: IPost) => (
                    <Post post={post} key={post._id} />))}
            </section>
            <button onClick={increase} className={classNames({
                [style.largeButton]: true,
                [style.verMais]: true
            })}>
                Ver mais
            </button>
        </main>


    )
}


export default Feed