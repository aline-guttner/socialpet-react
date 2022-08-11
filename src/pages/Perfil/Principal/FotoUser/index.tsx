import http from 'api';
import IUser from 'interfaces/IUser';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from '../Principal.module.scss';

export default function FotoUser() {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const params = useParams();

  useEffect(() => {
      http.get(`auth/${params.id}`)
        .then(res => {
          setImage(res.data.profileImg)
          setName(res.data.name)
        })
        .catch(err => console.log(err)
        )
  }, []);

  const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
    const input = file.currentTarget;

    var reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      const stringURL = String(dataURL);
      setImage(stringURL);
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
      <p>{name}</p>
    </span>
  )
}