import Principal from './Principal';
import { useContext } from 'react';
import Dados from './Dados';
import { useParams } from 'react-router-dom';
import Pets from './Pets';
import { UserContext } from 'contexts/UserContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';


export default function Perfil() {
    let params = useParams();

    const { data } = useApi(`user/${params.id}`)

    const { setUser, user, setId, setUserData } = useContext(UserContext)

    // resolver isso daqui
    setUser(data);
    setId(params.id);
    setUserData();


    if (!user) return (
        <main>
            <h1 className={sectionStyle.carregando}>Carregando...</h1>
        </main>)

    return (
        <main className='container'>
            <Principal />
            <Dados />
            <Pets />
        </main>
    )


}