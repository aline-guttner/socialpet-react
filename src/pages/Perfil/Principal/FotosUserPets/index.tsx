import { ChangeEvent, useRef, useState } from 'react';
import style from '../Principal.module.scss';

interface Props{
    pet: {
        nome: string;
        src: string;
        id: string;
    }
}

export default function FotosUserPets({pet} : Props){
    const [image, setImage] = useState(pet.src);
    const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
        const input = file.currentTarget;

        var reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            const stringURL = String(dataURL)
            setImage(stringURL);
        };

        if (input.files) {
            reader.readAsDataURL(input.files[0]);
        }
    };

    const inputFile = useRef<HTMLInputElement | null>(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        if (inputFile.current) {
            inputFile.current.click();
        }
    };
    return(
        <span key={pet.id} className={style.fotosNomes__pets}>
        <span className={style.fotosNomes__pets__inputImgWrapper}>
            <button onClick={onButtonClick}>
                <img className={style.fotosNomes__pets__fotosPets} alt="Foto de animal"
                    src={image}
                />
            </button>
            <input
                id="inputFile2"
                type="file"
                accept="image/*"
                ref={inputFile}
                onChange={handleChange}
            />
        </span>
        <p>{pet.nome}</p>
    </span>
    )
}