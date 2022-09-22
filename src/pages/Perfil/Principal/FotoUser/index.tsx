import { UserContext } from 'contexts/UserContext';
import { useContext, useRef } from 'react';
import style from '../Principal.module.scss';

export default function FotoUser() {

  const { image, user, updateUserImg } = useContext(UserContext)

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

    reader.onload = async function () {
      const dataURL = reader.result;
      const stringURL = String(dataURL);
      updateUserImg(stringURL)

    }

    if (input.files) {
      reader.readAsDataURL(input.files[0]);
    }
  }

  return (
    <span className={style.fotosNomes__user}>
      <button onClick={mudarImagem}>
        <img src={image} alt="Foto do usuário" />
      </button>
      <input
        id="inputFile1"
        type="file"
        accept="image/*"
        onChange={evento => updateImg(evento)}
        ref={inputFile}
      />
      <p>{user && user.name}</p>
    </span>
  )

};