import { useParams } from 'react-router-dom';
import Pet from './Pet';



interface Props{
    pets: string[],
    petChange: boolean,
    setPetChange: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Pets({pets, petChange, setPetChange}: Props) {
    const params = useParams()
    return (
        <section>
            <h2>Pets</h2>
            {pets.length ? <table>
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Tipo</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, index) => ( 
                        <Pet petChange={petChange} setPetChange={setPetChange} pet={pet} key={index}/>
                    ))}
                </tbody>
            </table>
            : <p>Você ainda não adicionou nenhum pet</p>}
        </section>
    )
}