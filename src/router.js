import Feed from './pages/Feed';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom'
import Perfil from './pages/Perfil';
import PaginaPadrao from 'components/PaginaPadrao';
import Login from 'pages/Login';
import Cadastro from 'pages/Cadastro';
import { UserContextProvider } from 'contexts/UserContext';
import EditarPost from 'pages/AtualizaFeed';

export default function AppRouter() {
    return (
        <HashRouter>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/user" element={<PaginaPadrao />} >
                    <Route path="feed/:id" index element={<Feed />} />
                    <Route path="perfil/:id" element={<Perfil />} />
                </Route>
                <Route path="/cadastro" element={<Cadastro />} />
                <Route exact path="/editarpost/:id" element={<EditarPost />} />

            </Routes>
        </HashRouter>
    )
}

