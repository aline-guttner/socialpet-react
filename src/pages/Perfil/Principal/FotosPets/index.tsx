import { ChangeEvent, useEffect, useRef, useState } from 'react';
import style from '../Principal.module.scss';
import http from 'api';
import camera from 'assets/imagens/cameraCinza.jpg';

interface Props {
    pet: string,
    petChange: boolean,
    setPetChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FotosPets({ pet, petChange, setPetChange }: Props) {
    const [image, setImg] = useState(camera);
    const [name, setName] = useState('');

    useEffect(() => {

        http.get(`pets/${pet}`)
            .then(res => {
                if(res.data.petImg !== ""){
                    setImg(res.data.petImg)
                } 
                setName(res.data.petName)
            }
            )


    }, []);



    const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
        const input = file.currentTarget;

        var reader = new FileReader();
        reader.onload = function () {
            const dataURL = reader.result;
            const stringURL = String(dataURL)
            setImg(stringURL);

            http.patch(`pets/${pet}`, {
                petImg: stringURL
            })
                .then(res => {
                    console.log(res.data.petImg)
                    setPetChange(!petChange)
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

    const inputFile = useRef<HTMLInputElement | null>(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
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
            <p>{name}</p>
        </span>
    )
}