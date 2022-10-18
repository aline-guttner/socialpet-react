import Principal from './Principal';
import Excluir from './Excluir'
import { useContext, useEffect } from 'react';
import Dados from './Dados';
import { useNavigate, useParams } from 'react-router-dom';
import Pets from './Pets';
import { UserContext } from 'contexts/UserContext';
import { useApi } from 'hooks/useApi';
import sectionStyle from 'styles/Section.module.scss';
import UserPosts from './UserPosts';


export default function Perfil() {
    let params = useParams();
    const navigate = useNavigate();
    const { info, idLogado, setIdLogado, setUserData, authenticated, setAuthenticated, Protected, isAuthenticated } = useContext(UserContext)
    useEffect(() => {
        setUserData(params.id)
    }, [navigate])

    return (
        <main className='container'>
            <Principal />
            <Dados />
            <Pets />
            <Protected userId={idLogado} paramsId={params.id}>
                <Excluir />
            </Protected>
            <UserPosts />
        </main>
    )


}