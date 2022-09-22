import { ChangeEvent, useContext, useRef, useState, useEffect } from 'react';
import style from '../Principal.module.scss';
import camera from 'assets/imagens/cameraCinza.jpg';
import IPet from 'interfaces/IPet';
import { UserContext } from 'contexts/UserContext';
import http from 'api';

interface Props {
    pet: string
}

export default function FotosPets({ pet }: Props) {
    const [petImg, setPetImg] = useState(camera);
    const [petName, setPetName] = useState('');
    const { updatePetImg, pets } = useContext(UserContext)

    useEffect(() => {
        http.get(`pets/${pet}`)
            .then(res => {
                setPetImg(res.data.petImg)
                setPetName(res.data.petName)
            })
            .catch(err => {
                console.log(err)
            })
    }, [pets])

    const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
        const input = file.currentTarget;

        var reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            const stringURL = String(dataURL)
            updatePetImg(pet, stringURL)
            setPetImg(stringURL)
        };

        if (input.files) {
            reader.readAsDataURL(input.files[0]);
        }
    };

    const inputFile = useRef<HTMLInputElement | null>(null)

    const onButtonClick = () => {
        if (inputFile.current) {
            inputFile.current.click();
        }
    };

    return (
        <span
            className={style.fotosNomes__pets}>
            <span className={style.fotosNomes__pets__inputImgWrapper}>
                <button onClick={onButtonClick}>
                    <img alt="Foto de animal"
                        src={petImg == '' ? camera : petImg}
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
            <p>{petName}</p>
        </span>
    )
}