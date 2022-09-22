import Principal from './Principal';
import { useEffect, useContext } from 'react';
import Dados from './Dados';
import { useParams } from 'react-router-dom';
import Pets from './Pets';
import { UserContext } from 'contexts/UserContext';
import { useApi } from 'hooks/useApi';
import http from 'api';


export default function Perfil() {
    let params = useParams();

    const { data } = useApi(`user/${params.id}`)

    const { setUser, user, setBackImg, setPets, setImage, setId } = useContext(UserContext)

    setUser(data)

    setId(params.id)

    if (user) {
        setBackImg(user.backImg)
        setPets(user.pets)
        if (data.profileImg !== '') {
            setImage(user.profileImg)
        }
    }

    if (user) return (
        <main className='container'>
            <Principal />
            <Dados />
            <Pets />
        </main>
    )

    return <h1>Carregando...</h1>
}