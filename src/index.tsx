
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
<<<<<<< HEAD
import Cadastro from 'pages/Cadastro/Cadastro';
import Login from 'pages/Login/Login';
import Perfil from 'pages/Perfil';
import reportWebVitals from './reportWebVitals';
=======
import reportWebVitals from './reportWebVitals';
import AppRouter from 'router';
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Perfil />
=======
    <AppRouter />
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
