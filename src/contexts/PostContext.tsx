import http, { baseURL } from "api";
import { useApi } from "hooks/useApi";
import IPost from "interfaces/IPost";
import { ChangeEvent, createContext, ReactNode, useState } from "react";
import axios from "axios";

type PostContextProps = {
    children: ReactNode;
};

type PostContextType = {
    inativo: boolean,
    setInativo: (smth: boolean) => void,
    prevImg: string[],
    setPrevImg: (images: string[]) => void,
    titulo: string,
    setTitulo: (titulo: string) => void,
    conteudo: string,
    setConteudo: (conteudo: string) => void,
    feed: IPost[],
    setFeed: (posts: IPost[]) => void,
    getPosts: (idUser: string | undefined) => Promise<void>,
    handlePostChange: (file: ChangeEvent<HTMLInputElement>) => void,
    publicarPost: () => Promise<void>,
    setPreviewList: (index: any) => void,
    deletePostRequest: (_id: string) => void
    userPosts: IPost[],
    setUserPosts: (posts: IPost[]) => void
    curtir: (postId: string, usuariosCurtiram: string[]) => Promise<void>,
    descurtir: (postId: string, usuariosCurtiram: string[]) => Promise<void>,
    idLogado: string | undefined,
    postChange: boolean
    setPostChange: (smth: boolean) => void,
    updatePost: (e: ChangeEvent<HTMLFormElement>, postId: string | undefined, title: string, content: string) => Promise<void>
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

export const PostContextProvider = ({ children }: PostContextProps) => {
    const [inativo, setInativo] = useState(false);
    const [prevImg, setPrevImg] = useState<string[]>([]);
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [feed, setFeed] = useState<IPost[]>([]);
    const [userPosts, setUserPosts] = useState<IPost[]>([])
    const [idLogado, setIdLogado] = useState<string | undefined>('')
    const [postChange, setPostChange] = useState(false)


    const { mutate } = useApi('posts/')

    const getPosts = async (idUser: string | undefined) => {
        try {
            let res = await http.get('posts/')
            setIdLogado(idUser)
            setFeed(res.data)
            setUserPosts(res.data.filter((post: { userId: string | undefined; }) => post.userId === idUser))
        } catch (err) {
            console.log(err)
        }
    }

    const handlePostChange = (file: ChangeEvent<HTMLInputElement>) => {
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
                    setPrevImg((prevState: string[]) => [...prevState, stringURL]);
                };
            })
        }
    };

    const publicarPost = async () => {
        if (conteudo !== '' || prevImg.length) {
            try {
                await http.post('posts/', {
                    date: new Date(),
                    userId: idLogado,
                    title: titulo,
                    image: prevImg,
                    content: conteudo
                });
                getPosts(idLogado);
                alert('Conteúdo publicado com sucesso!');
                setInativo(!inativo);
                mutate();
                setTitulo('')
                setConteudo('')
                setPrevImg([])

            } catch (err) {
                console.log(err)
            }
        } else {
            alert('A publicação precisa ter um texto ou uma imagem.')
        }
    }

    const setPreviewList = (index: any) => {
        setPrevImg(prevList => [...prevList.slice(0, index), ...prevList.slice(index + 1)])
    }

    const updatePost = async (e: ChangeEvent<HTMLFormElement>, postId: string | undefined, title: string, content: string) => {
        try {
            await http.patch(`posts/${postId}`, {
                title, content
            })
            getPosts(idLogado);
            alert("Post alterado com sucesso!");
        } catch (err) {
            console.log(err)
        }
    }

    const deletePostRequest = async (_id: string) => {
        try {
            await http.delete(`posts/${_id}`);
            alert("Publicação deletada com sucesso");
            getPosts(idLogado);
        } catch (err) {
            console.log(err)
        }
    }

    const curtir = async (postId: string, usuariosCurtiram: string[]) => {
        try {
            await http.patch(`posts/${postId}`, {
                usersLiked: [...usuariosCurtiram, idLogado]
            });
            getPosts(idLogado);
        } catch (err) {
            console.log(err);
        };

    };

    const descurtir = async (postId: string, usuariosCurtiram: string[]) => {
        try {
            let curtidaRemovida = usuariosCurtiram.indexOf(idLogado!)
            let novoArray = usuariosCurtiram
            novoArray.splice(curtidaRemovida, 1)
            await http.patch(`posts/${postId}`, {
                usersLiked: novoArray
            });
            getPosts(idLogado);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <PostContext.Provider value={{ inativo, setInativo, prevImg, setPrevImg, titulo, setTitulo, conteudo, setConteudo, feed, setFeed, getPosts, handlePostChange, publicarPost, setPreviewList, deletePostRequest, userPosts, setUserPosts, curtir, descurtir, idLogado, setPostChange, postChange, updatePost }}>
            {children}
        </PostContext.Provider>
    )
}