import style from "./Principal.module.scss";
import classNames from "classnames";
import { ChangeEvent, useRef, useState } from "react";
import FotosPets from "./FotosPets";
import Carousel from "react-bootstrap/Carousel";
import FotoUser from "./FotoUser";
import { useParams } from "react-router-dom";
import http from "api";



declare global {
  interface Array<T> {
    chunk(size: number): any[][];
  }
}

interface Props{
  backImg: string,
  setBackImg: React.Dispatch<React.SetStateAction<string>>,
  pets: string[],
  setPets: React.Dispatch<React.SetStateAction<string[]>>,
  petChange: boolean,
  setPetChange: React.Dispatch<React.SetStateAction<boolean>>,
  image: string,
  setImage: React.Dispatch<React.SetStateAction<string>>,
  nome: string,
}

export default function Principal({backImg, setBackImg, pets, petChange, setPetChange, image, setImage, nome}: Props) {
  const params = useParams();
  const [index, setIndex] = useState(0);

  const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
    let input = file.currentTarget;

    var reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      const stringURL = String(dataURL);
      setBackImg(stringURL);

      http.patch(`user/${params.id}`, {
        backImg: stringURL
      })
      .then(() =>
        alert('Foto alterada com sucesso!')
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

  const inputFile = useRef<HTMLInputElement | null>(null);

  const mudarImagem = () => {
    // `current` points to the mounted file input element
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const newPets = () => {
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
      <span>
        <button onClick={mudarImagem}>
          <img
            src={backImg}
            className="img-fluid"
          />
        </button>
        <input
          id="inputFile2"
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputFile}
        /></span>

      <div className={style.fotosNomes}>
        <FotoUser nome={nome} image={image} setImage={setImage}/>
        {pets.length > 3 ? (
          <Carousel indicators={false} activeIndex={index} interval={3000000} onSelect={handleSelect} className={style.carousel}>
            {pets.length &&
              newPets().map((newPet, i) => (
                <Carousel.Item key={i} >
                  {newPet.map((pet, index) => (
                    <FotosPets petChange={petChange} setPetChange={setPetChange} pet={pet} key={index}/>
                  ))}
                </Carousel.Item>
              ))}
          </Carousel>
        ) : (
          <span
            className={classNames({
              "d-flex": true,
              "flex-row": true,
              [style.fotosNomes__pets]: true
            })}
          >
            <div className={style.fotosPets}>
              {pets.map((pet, index) => (
                <FotosPets petChange={petChange} setPetChange={setPetChange} pet={pet} key={index} />
              ))}
            </div>
          </span>
        )}
      </div>
    </section>
  );
};

