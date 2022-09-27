import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from './Feed.module.scss';
import classNames from 'classnames';
import moment from 'moment';
import xis from 'assets/imagens/x-mark-16.png';
import http from 'api'
import { useParams } from 'react-router-dom';
import IPost from 'interfaces/IPost';
import { Carousel } from 'react-bootstrap';
// import DropdownEdit from 'components/Dropdown';
// import style from './DropdownEdit.module.scss';
import { useNavigate } from 'react-router-dom';
import { deletePostRequest } from 'api';
import { useContext } from 'react';
import { PostContext } from 'contexts/PostContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';

const Feed = () => {
    const params = useParams();

    const { data } = useApi('posts/')

    const { inativo, setInativo, prevImg, titulo, setTitulo, conteudo, setConteudo, feed, setFeed, getPosts, handlePostChange, publicarPost, setPreviewList } = useContext(PostContext)

    useEffect(() => {
        getPosts()
    }, [])

    const inputFile = useRef<HTMLInputElement | null>(null);

    const pegarImagem = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    const navigate = useNavigate();

    const handleDelete = (_id: string) => {
        try {
            const response = deletePostRequest(_id);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    if (data == undefined) return <main><h1 className={sectionStyle.carregando}>Carregando...</h1></main>

    return (
        <main className='container'>
            <button onClick={() => setInativo(!inativo)} className={classNames({
                [style.largeButton]: true,
                [style.inativo]: inativo ? true : false
            })}>
                Poste sobre seu pet
            </button>
            <section className={inativo ? '' : style.inativo}>
                <form className={style.formPostagem}>
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
                    <button type='submit' className={style.largeButton} onClick={() => publicarPost(params.id)}>Publicar</button>
                </form>
            </section>
            <section className={style.postagens}>
                {data.slice(0, 30).reverse().map((post: IPost, index: number) => (
                    <div key={index} className={style.postagens__postagem}>
                        {/* BOTÃO EDITAR E EXCLUIR  */}
                        <div className='dropdown'>
                            <button onClick={() => navigate(`/editarpost/${post._id}`)}>Editar</button>
                            <button onClick={() => handleDelete(post._id)}>Excluir</button>
                        </div>
                        <p>{moment(post.date).format('lll')}</p>
                        {post.title && <h2>{post.title}</h2>}
                        {post.image.length > 1 ?
                            <Carousel variant="dark" indicators={false} interval={3000000}>
                                {post.image.map((imagem, index) => (
                                    <Carousel.Item key={index}>
                                        <div><img src={imagem} alt="" className='img-fluid' /></div>
                                    </Carousel.Item>
                                ))}
                            </Carousel> :
                            <div className={style.singleImg}><img src={post.image[0]} alt="" className='img-fluid' /></div>
                        }
                        {post.content && <p>{post.content}</p>}
                    </div>
                ))}
            </section>
        </main>


    )
}


export default Feed