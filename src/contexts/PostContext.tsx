import http from "api";
import { useApi } from "hooks/useApi";
import IPost from "interfaces/IPost";
import { ChangeEvent, createContext, ReactNode, useState } from "react";
import camera from 'assets/imagens/cameraCinza.jpg';
import IUser from "interfaces/IUser";

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
    getPosts: () => Promise<void>,
    handlePostChange: (file: ChangeEvent<HTMLInputElement>) => void,
    publicar: (userId: string) => Promise<void>,
    setPreviewList: (index: any) => void
}

export const PostContext = createContext<PostContextType>({} as PostContextType);

export const PostContextProvider = ({ children }: PostContextProps) => {
    const [inativo, setInativo] = useState(false);
    const [prevImg, setPrevImg] = useState<string[]>([]);
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [feed, setFeed] = useState<IPost[]>([]);

    const { mutate } = useApi('posts/')

    const getPosts = async () => {
        try {
            let result = await http.get('posts/')
            setFeed(result.data)
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

    const publicar = async (userId: string) => {
        if (conteudo !== '' || prevImg.length) {
            try {
                await http.post('posts/', {
                    date: new Date(),
                    userId: userId,
                    title: titulo,
                    image: prevImg,
                    content: conteudo
                });
                mutate();
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

    return (
        <PostContext.Provider value={{ inativo, setInativo, prevImg, setPrevImg, titulo, setTitulo, conteudo, setConteudo, feed, setFeed, getPosts, handlePostChange, publicar, setPreviewList }}>
            {children}
        </PostContext.Provider>
    )
}