import { useEffect, useState } from 'react';
import style from '../Feed/Feed.module.scss'; import axios from "axios";
import React from "react";
import { baseURL } from 'api';



export default function EditarPost() {
    const [post, setPost] = useState<[]>([]);

    useEffect(() => {
        async function getPost() {
            const response = await axios.get(`${baseURL}posts/`);

            setPost(response.data)


            // .then((response) => {
            // setPost(response.data.title)
            // console.log(response.data)
            // }
        }

        getPost()
    }, []);

    return (
        <>
            {
                post && post.map((data: { title: string | number | readonly string[] | undefined; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => (
                    <main className='container'>
                        <section>
                            <form className={style.formPostagem}>
                                <div>
                                    <label htmlFor='titulo'>Título</label>
                                    <input type="text" name="titulo" id="titulo" value={data.title} />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor='content'>Conteúdo</label>
                                    <textarea name='content' id='content' className={style.inputConteudo} rows={10}>
                                        {data.content}
                                    </textarea>

                                </div>
                                <br />
                                <button type='submit' className={style.largeButton} >Atualizar</button>
                            </form>
                        </section>
                    </main>

                ))
            }
        </>
    )

}


// export default EditarPost


