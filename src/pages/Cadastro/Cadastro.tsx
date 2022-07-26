import React from 'react';
import Form from './Form/Form';

import style from './Cadastro.module.css';

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
    <Form dados={dados} />
  )
}

export default Cadastro;
