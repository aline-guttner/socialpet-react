import React from 'react';
import Form from './Form/Form';

<<<<<<< HEAD
import style from './Cadastro.module.css';
=======
import style from './Cadastro.module.scss';
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86

function Cadastro() {
  const dados = [
    {
      id: "name",
      placeholder: "Fulano de tal",
      type: "text",
      label: "Nome"
    },
    {
      id: "email",
      placeholder: "fulano@detal.com",
      type: "email",
      label: "Email"
    },
    {
      id: "username",
      placeholder: "fulano.detal",
      type: "text",
      label: "Usuário"
    }
  ]

  return (
<<<<<<< HEAD
    <Form dados={dados} />
=======
    <div className={style.cadastro}>
      <Form dados={dados} />
    </div>
>>>>>>> 674c0da9313364ee5ecad75559a824518932ab86
  )
}

export default Cadastro;
