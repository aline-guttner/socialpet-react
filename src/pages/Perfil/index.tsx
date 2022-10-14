import Principal from './Principal';
import Excluir from './Excluir'
import { useContext, useEffect } from 'react';
import Dados from './Dados';
import { useParams } from 'react-router-dom';
import Pets from './Pets';
import { UserContext } from 'contexts/UserContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';
import UserPosts from './UserPosts';


export default function Perfil() {
    let params = useParams();

    const { data } = useApi(`user/${params.id}`)

    const { user, setUserData } = useContext(UserContext)

    // resolver isso daqui
    useEffect(() => {
        setUserData(data, params.id);
    }, [data])

    if (!user) return (
        <main>
            <h1 className={sectionStyle.carregando}>Carregando...</h1>
        </main>)

    return (
        <main className='container'>
            <Principal />
            <Dados />
            <Pets />
            <Excluir />
            <UserPosts />
        </main>
    )


}