import { ChangeEvent, useRef, useState } from 'react';
import style from '../Principal.module.scss';
import { useParams } from 'react-router-dom'

interface Props{
    pet: {
        petName: string,
        petImg: string,
        petId: string
    },
    
}

export default function FotosPets({pet} : Props){
    const [image, setImage] = useState(pet.petImg);
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
        <span key={pet.petId} className={style.fotosNomes__pets}>
        <span className={style.fotosNomes__pets__inputImgWrapper}>
            <button onClick={onButtonClick}>
                <img className={style.fotosNomes__pets__fotosPets} alt="Foto de animal"
                    src={image}
                />
            </button>
            <input
                id="inputFile3"
                type="file"
                accept="image/*"
                ref={inputFile}
                onChange={handleChange}
            />
        </span>
        <p>{pet.petName}</p>
    </span>
    )
}