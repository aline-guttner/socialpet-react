import http from 'api';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from '../Principal.module.scss';

interface Props{
  image: string,
  setImage: React.Dispatch<React.SetStateAction<string>>,
  nome: string
}

export default function FotoUser({image, setImage, nome}: Props) {
  const params = useParams();

  const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
    const input = file.currentTarget;

    var reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      const stringURL = String(dataURL);

      http.patch(`user/${params.id}`, {
        profileImg: stringURL
      })
      .then(() =>{
        setImage(stringURL);
        alert('Foto alterada com sucesso!')
      }
      )
      .catch(err => {
        console.log(err)
        alert('Não foi possível alterar sua foto, tente novamente mais tarde.')
    })
    };

    if (input.files) {
      reader.readAsDataURL(input.files[0]);
    }
  };

  const inputFile = useRef<HTMLInputElement | null>(null);

  const mudarImagem = () => {
    // `current` points to the mounted file input element
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  return (
    <span className={style.fotosNomes__user}>
      <button onClick={mudarImagem}>
        <img src={image} alt="Foto do usuário" />
      </button>
      <input
        id="inputFile1"
        type="file"
        accept="image/*"
        onChange={handleChange}
        ref={inputFile}
      />
      <p>{nome}</p>
    </span>
  )
}