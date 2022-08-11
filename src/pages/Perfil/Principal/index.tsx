import style from "./Principal.module.scss";
import classNames from "classnames";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import FotosPets from "./FotosPets";
import Carousel from "react-bootstrap/Carousel";
import FotoUser from "./FotoUser";
import { useNavigate, useParams } from "react-router-dom";
import http from "api";
import IPet from "interfaces/IPet";


declare global {
  interface Array<T> {
    chunk(size: number): any[][];
  }
}

export default function Principal() {
  let params = useParams();
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState(Date.now())
  const [profileImg, setProfileImg] = useState('')
  const [backImg, setBackImg] = useState('');
  const [pets, setPets] = useState<IPet[]>([{
    petName: '',
    petType: '',
    petImg: '',
    petId: ''
  }])
  const [phone, setPhone] = useState('')
  const [authenticated, setAuthenticated] = useState('false');
  const [index, setIndex] = useState(0);
  let navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser === 'true') {
      setAuthenticated(loggedInUser);
      http.get(`auth/${params.id}`)
        .then(res => {
          console.log(res)
          setUsername(res.data.username)
          setName(res.data.name)
          setEmail(res.data.email)
          setDate(res.data.birthDate)
          setProfileImg(res.data.profileImg)
          setBackImg(res.data.backImg)
          setPets(res.data.pets)
          setPhone(res.data.phone)
        })
        .catch(err => console.log(err)
        )
    } else {
      navigate(`../login`, { replace: true })
    }
  }, []);

  const handleChange = (file: ChangeEvent<HTMLInputElement>) => {
    const input = file.currentTarget;

    var reader = new FileReader();
    reader.onload = function () {
      const dataURL = reader.result;
      const stringURL = String(dataURL);
      setBackImg(stringURL);
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
        <FotoUser/>
        {pets.length > 3 ? (
          <Carousel indicators={false} activeIndex={index} interval={3000000} onSelect={handleSelect} className='w-100'>
            {
              newPets().map((newPet, i) => (
                <Carousel.Item key={i} >
                  {newPet.map(pet => (
                    <FotosPets pet={pet} key={pet.petId} />
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
              {pets.map((pet) => (
                <FotosPets pet={pet} key={pet.petId} />

              ))}
            </div>
          </span>
        )}
      </div>
    </section>
  );

};

