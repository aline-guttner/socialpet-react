import { UserContext } from 'contexts/UserContext';
import { Protected } from 'hooks/Auth';
import { useContext, useRef } from 'react';
import { useParams } from 'react-router';
import style from '../Principal.module.scss';

export default function FotoUser() {
  const { idLogado } = useContext(UserContext);
  const params = useParams();
  const { image, info, updateUserImg } = useContext(UserContext)

  const inputFile = useRef<HTMLInputElement | null>(null);

  const mudarImagem = () => {
    // `current` points to the mounted file input element
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const updateImg = (file: React.ChangeEvent<HTMLInputElement>) => {
    const input = file.currentTarget;
    var reader = new FileReader();

    if (input.files) {
      reader.readAsDataURL(input.files[0]);
    }

    reader.onload = async function () {
      const dataURL = reader.result;
      const stringURL = String(dataURL);
      updateUserImg(stringURL)

    }


  }

  return (
    <span className={style.fotosNomes__user}>
      <button onClick={mudarImagem}>
        <img src={image} alt="Foto do usuário" />
      </button>
      <Protected userId={idLogado} paramsId={params.id}>
        <input
          id="inputFile1"
          type="file"
          accept="image/*"
          onChange={evento => updateImg(evento)}
          ref={inputFile}
        />
      </Protected>
      <p>{info && info.name}</p>
    </span>
  )

};