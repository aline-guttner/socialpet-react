import style from "./Principal.module.scss";
import tamara from "assets/imagens/tamara-andreeva-priroda-peizazh-gory-altai-zhivotnoe-kot.jpg";
import classNames from "classnames";
import pets from "data/pets";
import { ChangeEvent, useRef, useState } from "react";
import FotosUserPets from "./FotosUserPets";
import Carousel from "react-bootstrap/Carousel";
import user from 'data/user';

declare global {
  interface Array<T> {
    chunk(size: number): any[][];
  }
}

export default function Principal() {
  const [image, setImage] = useState(user.profileImg);
  const [index, setIndex] = useState(0);
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

 const newPets = () =>{
    return Array.from(
      new Array(Math.ceil(pets.length / 3)),
      (_, i) => pets.slice(i * 3, i * 3 + 3)
    )
 }

 const handleSelect = (selectedIndex: any, e: any) => {
   setIndex(selectedIndex);
 };

  return (
    <section
      className={classNames({
        [style.principal]: true,
        container: true,
      })}
    >
      <img
        src={tamara}
        className="img-fluid"
        alt="foto de gato olhando para paisagem montanhosa"
      />
      <div className={style.fotosNomes}>
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
        {pets.length > 3 ? (
          <Carousel indicators={false} activeIndex={index} interval={3000000} onSelect={handleSelect} className='w-100'>
            { 
                newPets().map((newPet, i) => (
              <Carousel.Item key={i} >
                {newPet.map(pet => (
                  <FotosUserPets pet={pet} key={pet.id}/>
                ))}
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <span
            className={classNames({
              "d-flex": true,
              "flex-row": true,
            })}
          >
            <div className={style.fotosPets}>
              {pets.map((pet) => (
                <FotosUserPets pet={pet} key={pet.id} />
            
              ))}
            </div>
          </span>
        )}
      </div>
    </section>
  );
}

  /* Array.prototype.chunk = function (size: number) {
        const result: {
            nome: string;
            src: string;
            id: string;
        }[][] = [];

        while (this.length) {
            result.push(this.splice(0, size));
        }

        return result;
    };
*/
