import React from 'react';
import Form from './Form/Form';

import style from './Cadastro.module.scss';

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
    <div className={style.cadastro}>
      <Form dados={dados} />
    </div>
  )
}

export default Cadastro;
