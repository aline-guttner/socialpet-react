import style from './Principal.module.scss';
import tamara from 'assets/imagens/tamara-andreeva-priroda-peizazh-gory-altai-zhivotnoe-kot.jpg'
import classNames from 'classnames';
import pets from 'dados/pets'
import userPic from 'assets/imagens/User.png'
import { ChangeEvent, useRef, useState } from 'react';

export default function Principal() {
    const [image, setImage] = useState(userPic);
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

    return (

        <section className={classNames({
            [style.principal]: true,
            "container": true
        })}>
            <img src={tamara} className="img-fluid" alt="foto de gato olhando para paisagem montanhosa" />
            <div className={style.fotosNomes}>
                <span className={style.fotosNomes__user}>
                    <button onClick={onButtonClick}>
                        <img src={image} alt="Foto do usuário" />
                    </button>
                    <input
                        id="inputFile1"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        ref={inputFile}
                    />
                    <p>Fulano de Tal</p>
                </span>
                {pets.map(pet => (
                    <span key={pet.id} className={style.fotosNomes__pets}>
                        <span className={style.fotosNomes__pets__inputImgWrapper}>
                            <button>
                                <img className={style.fotosNomes__pets__fotosPets} alt="Foto de animal"
                                    src={pet.src}
                                />
                            </button>
                            <input
                                id="inputFile2"
                                type="file"
                                accept="image/*"

                            />
                        </span>
                        <p>{pet.nome}</p>
                    </span>
                ))}
            </div>
        </section>

    )
}
