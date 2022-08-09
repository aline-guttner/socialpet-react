import style from "./Principal.module.scss";
import gatoso from "assets/imagens/gatoso.jpg";
import classNames from "classnames";
import pets from "data/pets";
import { ChangeEvent, useRef, useState } from "react";
import FotosPets from "./FotosPets";
import Carousel from "react-bootstrap/Carousel";
import FotoUser from "./FotoUser";

declare global {
  interface Array<T> {
    chunk(size: number): any[][];
  }
}

export default function Principal() {
  const [image, setImage] = useState(gatoso);
  
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
      <span> 
      <button onClick={mudarImagem}>
      <img
        src={image}
        className="img-fluid"
        alt="foto de gato olhando para paisagem montanhosa"
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
        <FotoUser/>
        {pets.length > 3 ? (
          <Carousel indicators={false} activeIndex={index} interval={3000000} onSelect={handleSelect} className='w-100'>
            { 
                newPets().map((newPet, i) => (
              <Carousel.Item key={i} >
                {newPet.map(pet => (
                  <FotosPets pet={pet} key={pet.id}/>
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
                <FotosPets pet={pet} key={pet.id} />
            
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
