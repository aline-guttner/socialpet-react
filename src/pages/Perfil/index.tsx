import Principal from './Principal';
import { useEffect, useLayoutEffect, useState } from 'react';
import Dados from './Dados';
import { useParams } from 'react-router-dom';
import http from 'api';
import Pets from './Principal/Pets';
import camera from 'assets/imagens/cameraCinza.jpg';

interface Props {
    auth: boolean
}

export default function Perfil({ auth }: Props) {
    let params = useParams();
    const [image, setImage] = useState(camera);
    const [backImg, setBackImg] = useState(camera);
    const [pets, setPets] = useState<string[]>([]);
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('');
    const [telefone, setTelefone] = useState('');
    const [petChange, setPetChange] = useState(false);
    useEffect(() => {
        http.get(`user/${params.id}`)
            .then(res => {
                setBackImg(res.data.backImg)
                setNome(res.data.name)
                setUsuario(res.data.username)
                setEmail(res.data.email)
                setData(res.data.birthDate)
                setTelefone(res.data.phone)
                setPets(res.data.pets)
                if (res.data.profileImg !== "") {
                    setImage(res.data.profileImg)
                }
            })
            .catch(err => console.log(err)
            )


    }, [petChange]);
    return (
        <main className='container'>
            <Principal nome={nome} image={image} setImage={setImage} backImg={backImg} setBackImg={setBackImg} pets={pets} setPets={setPets} petChange={petChange} setPetChange={setPetChange} />
            <Dados nome={nome} setNome={setNome} usuario={usuario} setUsuario={setUsuario} email={email} setEmail={setEmail} data={data} setData={setData} telefone={telefone} setTelefone={setTelefone}
            />
            <Pets pets={pets} petChange={petChange} setPetChange={setPetChange} />
        </main>
    )
}