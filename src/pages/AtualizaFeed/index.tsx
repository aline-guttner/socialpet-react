import { ChangeEvent, useContext, useEffect, useState } from 'react';
import style from '../Feed/Feed.module.scss';
import * as yup from "yup";
import { useParams, useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { PostContext } from 'contexts/PostContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';

interface IPost {
    title: string,
    content: string
}

const validationPost = yup.object().shape({
    title: yup.string().required("O título é obrigatório").max(40,),
    content: yup.string().required("O conteúdo é obrigatório").max(500,)

})

export default function EditarPost() {
    const navigate = useNavigate()
    const params = useParams()
    const { idLogado, updatePost } = useContext(PostContext)
    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const { data } = useApi(`posts/${params.id}`)

    useEffect(() => {
        data && setData(data)
    }, [data])

    async function OnSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        updatePost(e, params.id, titulo, conteudo)
        idLogado ? navigate(`../user/feed/${idLogado}`) : console.log(idLogado)
    }

    const setData = (dados: IPost) => {
        setTitulo(dados.title)
        setConteudo(dados.content)
    }

    if (!data) return <main><h1 className={sectionStyle.carregando}>Carregando...</h1></main>

    return (
        <>
            <main className='container'>
                <section>
                    <form onSubmit={OnSubmit} className={style.formPostagem}>
                        <div>
                            <label htmlFor='titulo'>Título</label>
                            <input
                                type="text"
                                id="titulo"
                                name="title"
                                value={titulo}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
                            />
                        </div>
                        <br />

                        <Form.Group>
                            <label htmlFor='content'>Conteúdo</label>
                            <Form.Control
                                as="textarea"
                                id='conteudo'
                                className={style.inputConteudo}
                                name="content"
                                rows={10}
                                value={conteudo}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setConteudo(e.target.value)}
                            />
                        </Form.Group>


                        <br />
                        <button type='submit' className={style.largeButton} >Atualizar</button>
                    </form>
                </section>
            </main>
        </>


    )

}


// export default EditarPost


