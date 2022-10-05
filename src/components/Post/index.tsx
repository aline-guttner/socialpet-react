import IPost from "interfaces/IPost";
import classNames from 'classnames';
import style from 'pages/Feed/Feed.module.scss';
import { useNavigate, useParams } from "react-router";
import moment from 'moment';
import { useContext, useEffect, useState } from "react";
import { PostContext } from "contexts/PostContext";
import { Carousel } from "react-bootstrap";
import lapis from 'assets/imagens/pencil-16.png';
import xis from 'assets/imagens/x-mark-16.png';
import curtido from 'assets/imagens/Liked.png';
import naoCurtido from 'assets/imagens/notLiked.png';

interface Props {
    post: IPost
}

export default function Post({ post }: Props) {
    const navigate = useNavigate();
    const params = useParams();
    const [liked, setLiked] = useState<boolean>(false)

    useEffect(() => { verificarCurtida() }, [])

    const { deletePostRequest, curtir, descurtir } = useContext(PostContext)

    const handleDelete = (_id: string) => {
        try {
            deletePostRequest(_id);
            //eu mudei o lugar da deletePostRequest pra PostContext, porque eu não tava conseguindo usar o mutate(), que faz o feed atualizar automaticamente, no arquivo da api. Tá lá no fim do arquivo.
        } catch (error) {
            console.log(error);
        }
    }

    const alterarCurtida = () => {
        if (!liked) {
            curtir(post._id, post.usersLiked)
            setLiked(true)
        } else {
            descurtir(post._id, post.usersLiked)
            setLiked(false)
        }

    }

    const verificarCurtida = () => {
        let verificacao = post.usersLiked.find(curtida => curtida === params.id)
        if (verificacao !== undefined) {
            setLiked(true)
        }
    }

    return (
        <div className={style.postagens__postagem}>
            {/* BOTÃO EDITAR E EXCLUIR  */}
            <div className={style.cabecalho}>
                <div className={classNames({
                    [style.editarDeletar]: true,
                    'dropdown': true
                })}>
                    <button onClick={() => navigate(`/editarpost/${post._id}`)}><img alt='Lápis' src={lapis}></img></button>
                    <button onClick={() => { handleDelete(post._id) }}><img alt="Xis" src={xis}></img></button>
                </div>
                <p>{moment(post.date).format('lll')}</p>
            </div>
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
            <span className={style.likedContainer}><button onClick={alterarCurtida} className='normalButton' id='like' aria-label="curtir" type="button"><img src={liked ? curtido : naoCurtido} alt="Imagem de coração" /></button><p>{post.usersLiked.length ? post.usersLiked.length : 0}</p></span>
        </div>
    )
}