import Feed from './pages/Feed';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Perfil from './pages/Perfil';
import PaginaPadrao from 'components/PaginaPadrao';
import Login from 'pages/Login';
import Cadastro from 'pages/Cadastro';

export default function AppRouter() {
    return (

        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PaginaPadrao />} >
                    <Route path="feed/" index element={<Feed />} />
                    <Route path="perfil/:id" element={<Perfil />} />
                </Route>
                <Route path="/cadastro" element={<Cadastro />} />
            </Routes>
        </Router>
    )
}

