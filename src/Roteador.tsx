import React from 'react';
import ReactDOM from 'react-dom/client';
import Feed from './pages/Feed';
import PaginaInicial from './pages/Perfil'
import { Routes, Route } from 'react-router-dom'


export default function Roteador() {
    return (
        <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/PaginaInicial" element={<PaginaInicial />} />
        </Routes>
    )
}

