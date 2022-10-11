import { useEffect, useRef } from 'react';
import style from './Feed.module.scss';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import IPost from 'interfaces/IPost';
// import DropdownEdit from 'components/Dropdown';
// import style from './DropdownEdit.module.scss';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { PostContext } from 'contexts/PostContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';
import Post from 'components/Post';
import { UserContext } from 'contexts/UserContext';
import BotaoExcluir from 'components/BotaoExcluir';

const Feed = () => {
    const params = useParams();
    const { data, mutate } = useApi('posts/')
    const { inativo, setInativo, prevImg, titulo, setTitulo, conteudo, setConteudo, feed, getPosts, handlePostChange, publicarPost, setPreviewList, deletePostRequest, postChange } = useContext(PostContext)

    const { user } = useContext(UserContext)

    useEffect(() => {
        getPosts(params.id)
    }, [postChange])

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
            //eu mudei o lugar da deletePostRequest pra PostContext, porque eu não tava conseguindo usar o mutate(), que faz o feed atualizar automaticamente, no arquivo da api. Tá lá no fim do arquivo.
        } catch (error) {
            console.log(error);
        }
    }

    const publicar = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        publicarPost(params.id)
    }

    if (data === undefined) return <main><h1 className={sectionStyle.carregando}>Carregando...</h1></main>

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
                                <BotaoExcluir onClick={() => setPreviewList(index)} />

                            </div>
                        ))}
                    </div>
                    <br />
                    <button type='submit' className={style.largeButton}>Publicar</button>
                </form>
            </section>
            <section className={style.postagens}>
                {data.slice(0, 30).reverse().map((post: IPost) => (
                    <Post post={post} key={post._id} />
                ))}
            </section>
        </main>


    )
}


export default Feed