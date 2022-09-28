import Principal from './Principal';
import { useContext, useEffect } from 'react';
import Dados from './Dados';
import { useParams } from 'react-router-dom';
import Pets from './Pets';
import { UserContext } from 'contexts/UserContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';


export default function Perfil() {
    let params = useParams();

    const { data } = useApi(`user/${params.id}`)

    const { user, setUserData } = useContext(UserContext)

    // resolver isso daqui
    useEffect(() => {
        console.log(user)
        setUserData(data);
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
        </main>
    )


}