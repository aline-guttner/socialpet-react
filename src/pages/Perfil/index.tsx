import Principal from './Principal';
import { useEffect, useContext } from 'react';
import Dados from './Dados';
import { useParams } from 'react-router-dom';
import Pets from './Pets';
import { UserContext } from 'contexts/UserContext';
import { useApi } from 'hooks/useApi';
import style from './Perfil.module.scss';


export default function Perfil() {
    let params = useParams();

    const { data } = useApi(`user/${params.id}`)

    const { setUser, user, setId, setUserData } = useContext(UserContext)


    setUser(data);
    setId(params.id);
    setUserData();


    if (!user) return (
        <main>
            <h1 className={style.carregando}>Carregando...</h1>
        </main>)

    return (
        <main className='container'>
            <Principal />
            <Dados />
            <Pets />
        </main>
    )


}