import style from "./Principal.module.scss";
import classNames from "classnames";
import { useEffect, useRef, useState, useContext } from "react";
import FotosPets from "./FotosPets";
import Carousel from "react-bootstrap/Carousel";
import FotoUser from "./FotoUser";
import { useParams } from "react-router-dom";
import { UserContext } from "contexts/UserContext";
import IPet from "interfaces/IPet";

declare global {
  interface Array<T> {
    chunk(size: number): any[][];
  }
}

export default function Principal() {
  const params = useParams();
  const [index, setIndex] = useState(0);

  const { backImg, pets, handleUserChange, threePets } = useContext(UserContext)

  const inputFile = useRef<HTMLInputElement | null>(null);

  const mudarImagem = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

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
            alt="Foto de capa" />
        </button>
        <input
          id="inputFile2"
          type="file"
          accept="image/*"
          onChange={evento => handleUserChange(evento)}
          ref={inputFile}
        /></span>

      <div className={style.fotosNomes}>
        <FotoUser />
        {pets.length > 3 ? (
          <Carousel indicators={false} activeIndex={index} interval={3000000} onSelect={handleSelect} className={style.carousel}>
            {pets.length &&
              threePets().map((newPet, i) => (
                <Carousel.Item key={i} >
                  {newPet.map((pet: IPet, index: number) => (
                    <FotosPets pet={pet._id} key={index} />
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
              {pets.map((pet: IPet, index: number) => (
                <FotosPets pet={pet._id} key={index} />
              ))}
            </div>
          </span>
        )}
      </div>
    </section>
  );
};

