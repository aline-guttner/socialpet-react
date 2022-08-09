import { ChangeEvent, useRef, useState } from 'react';
import style from '../Principal.module.scss';
import user from 'data/user';

export default function FotoUser(){
    const [image, setImage] = useState(user.profileImg);

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
    return(
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
        <p>{user.name}</p>
      </span>
    )
}