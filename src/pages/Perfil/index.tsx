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
import { isAuthenticated, Protected } from 'hooks/Auth';


export default function Perfil() {
    let params = useParams();
    const auth = isAuthenticated();
    const navigate = useNavigate();
    const { info, idLogado, setIdLogado, setUserData } = useContext(UserContext)
    useEffect(() => {
        setUserData(params.id)
    }, [navigate])

    if (!auth) {
        navigate("../")
    } else {
        let userId = localStorage.getItem('user')
        userId && setIdLogado(userId)
    }

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