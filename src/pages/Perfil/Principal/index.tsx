import style from './Principal.module.scss';
import tamara from 'assets/imagens/tamara-andreeva-priroda-peizazh-gory-altai-zhivotnoe-kot.jpg'
import classNames from 'classnames';
import pets from 'data/pets'
import userPic from 'assets/imagens/User.png'
import { ChangeEvent, useRef, useState } from 'react';
import FotosUserPets from './FotosUserPets';
import { Carousel, CarouselItem } from 'react-bootstrap';


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

    function chunk(array: typeof pets, size: number): {
        nome: string;
        src: string;
        id: string;
    }[][] {
        const chunked_arr = [];
        let index = 0;
        while (index < array.length) {
            chunked_arr.push(array.slice(index, size + index));
            index += size;
        }
        return chunked_arr;
    }

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

                <Carousel>
                    {chunk(pets, 3).map<{
                        nome: string;
                        src: string;
                        id: string;
                    }[][]>(carItem => {
                        <CarouselItem>
                            {this.carItem.map(pet => {
                                <FotosUserPets pet={pet} key={pet.id} />
                            })}
                        </CarouselItem>
                    })}
                </Carousel>
            </div>
        </section>

    )
}
