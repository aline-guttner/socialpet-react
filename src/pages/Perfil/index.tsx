import Header from 'components/Header'
import Menu from 'components/Menu'
import Sidebar from 'components/Sidebar'
import { Navbar, NavbarBrand } from 'react-bootstrap'
import Amigos from './Amigos'
import Fotos from './Fotos'
import style from './Perfil.module.scss'
import Principal from './Principal'
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react'
import Dados from './Dados'
import { useNavigate, useParams } from 'react-router-dom'
import http from 'api'
import Pets from './Principal/Pets'


export default function Perfil() {
    let params = useParams();
    const [backImg, setBackImg] = useState('');
    const [pets, setPets] = useState([])
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState('')
    const [telefone, setTelefone] = useState('')
    const [authenticated, setAuthenticated] = useState('false');
    const [petChange, setPetChange] = useState(false)

    let navigate = useNavigate()

    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");
        if (loggedInUser === 'true') {
            setAuthenticated(loggedInUser);
            http.get(`user/${params.id}`)
                .then(res => {
                    setBackImg(res.data.backImg)
                    setNome(res.data.name)
                    setUsuario(res.data.username)
                    setEmail(res.data.email)
                    setData(res.data.birthDate)
                    setTelefone(res.data.phone)
                    setPets(res.data.pets)
                })
                .catch(err => console.log(err)
                )
        } else {
            navigate(`../`, { replace: true })
        }
    }, [petChange]);
    return (
        <main className='container'>
            <Principal backImg={backImg} setBackImg={setBackImg} pets={pets} setPets={setPets} petChange={petChange} setPetChange={setPetChange}/>
            <Dados nome={nome} setNome={setNome} usuario={usuario} setUsuario={setUsuario} email={email} setEmail={setEmail} data={data} setData={setData} telefone={telefone} setTelefone={setTelefone}
            />
            <Pets pets={pets} petChange={petChange} setPetChange={setPetChange}/>
        </main>
    )
}