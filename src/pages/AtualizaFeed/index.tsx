import { ChangeEvent, useEffect, useState } from 'react';
import style from '../Feed/Feed.module.scss';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useParams, useNavigate} from 'react-router-dom';
import { appendFile } from 'fs';
import  { baseURL } from 'api';
import { Form } from 'react-bootstrap';

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
    const { _id } = useParams()
    const [ post, setPost] = useState<IPost>({
        title:"",
        content: ""
    })

    useEffect(() => {
        if(_id !== undefined){
            findPost(_id)
        }
    },[_id] )

    function updatePost (e: ChangeEvent<HTMLInputElement>) {

        setPost({
            ...post,
            [e.target.name]: e.target.value
        })

    }
    

    async function OnSubmit (e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        const response = await axios.patch(`${baseURL}posts/${_id}`,post)
        .then(() => {
            console.log("foi")
            navigate("/")
        })
        .catch(() => {
            console.log("deu erro")
        })
    }

    async function findPost (_id: string) {
        const response = await axios.get(`${baseURL}posts/${_id}`)
        setPost({
            title: response.data.title,
            content: response.data.content
        })
        console.log(response)
    }

    return (
        <>
            <main className='container'>
                <section>
                    <form  onSubmit={OnSubmit} className={style.formPostagem}>
                        <div>
                            <label htmlFor='titulo'>Título</label>
                            <input 
                            type="text" 
                            id="titulo"  
                            name="title"
                            value={post.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePost(e)}
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
                            value={post.content}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updatePost(e)}
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


