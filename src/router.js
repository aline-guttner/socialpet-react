import Feed from './pages/Feed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from 'components/Header';
import Menu from 'components/Menu';
import Perfil from './pages/Perfil';
import PaginaPadrao from 'components/PaginaPadrao';
import Login from 'pages/Login/Login';
import Cadastro from 'pages/Cadastro/Cadastro';

export default function AppRouter() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<PaginaPadrao />} >
                    <Route index element={<Feed />} />
                    <Route path="perfil" element={<Perfil />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </Router>
    )
}

