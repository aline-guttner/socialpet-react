import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from '../Feed/Feed.module.scss';
import classNames from 'classnames';
import posts from 'data/posts';
import moment from 'moment';
import xis from 'assets/imagens/x-mark-16.png';
import http from 'api';
import { useParams } from 'react-router-dom';
import IPost from 'interfaces/IPost';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import axios from "axios";
import React from "react";
import { baseURL } from 'api';
import { getPositionOfLineAndCharacter } from 'typescript';



export default function EditarPost() {
    const [post, setPost] = useState();


    useEffect(() => {
        async function getPost(){
            const response = await axios.get(`${baseURL}posts/`);
            
            setPost(response.data)
            
            
            // .then((response) => {
            // setPost(response.data.title)
            // console.log(response.data)
            // }
        } 

        getPost()
    }, []);





        return(
                {post.map((data: { title: string | number | readonly string[] | undefined; content: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => (
                <main className='container'>
                <section>
                    <form  className={style.formPostagem}>
                        <div>
                            <label htmlFor='titulo'>Título</label>
                            <input type="text" name="titulo" id="titulo" value={data.title}/>
                        </div>
                        <br />
                        <div>
                            <label htmlFor='content'>Conteúdo</label>
                            <textarea name='content' id='content' className={style.inputConteudo} rows={10}>
                                {data.content}
                            </textarea>

                        </div>
                        <br />
                        <button type='submit'  className={style.largeButton} >Atualizar</button>
                    </form>
                </section>
                </main>

                ))}
        ) 
           
}
    

// export default EditarPost


