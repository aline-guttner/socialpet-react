import style from './Principal.module.scss';
import tamara from 'assets/imagens/tamara-andreeva-priroda-peizazh-gory-altai-zhivotnoe-kot.jpg'
import classNames from 'classnames';
import pets from 'dados/pets'
import userPic from 'assets/imagens/User.png'
import { ChangeEvent, useRef, useState } from 'react';

export default function Principal() {
    const [image, setImage] = useState("");
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

    return (

        <section className={classNames({
            [style.principal]: true,
            "container": true
        })}>
            <img src={tamara} className="img-fluid" alt="foto de gato olhando para paisagem montanhosa" />
            <div className={style.fotosNomes}>
                <span className={style.fotosNomes__user}>
                    <img src="" alt="Foto do usuário" />
                    <p>Fulano de Tal</p>
                </span>
                {pets.map(pet => (
                    <span key={String(pet.id)} className={style.fotosNomes__pets}>
                        <img className={style.fotosNomes__pets__fotosPets} alt="Foto de animal"
                            src={image}
                        />
                        <input
                            id="inputFile1"
                            type="file"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        <p>{pet.nome}</p>
                    </span>
                ))}
            </div>
        </section>

    )
}
