import Pet from './Pet';
import plus from 'assets/imagens/plus-16.png';
import style from './Pets.module.scss';
import { useState } from 'react';


interface Props {
    pets: string[],
    petChange: boolean,
    setPetChange: React.Dispatch<React.SetStateAction<boolean>>,
    setPets: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Pets({ pets, petChange, setPetChange, setPets }: Props) {
    const [adicionando, setAdicionando] = useState(false)
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
                        <Pet setPets={setPets} pets={pets} petChange={petChange} setPetChange={setPetChange} pet={pet} key={index} />
                    ))}
                    {adicionando && <Pet adicionando={adicionando} setAdicionando={setAdicionando}  petChange={petChange} setPetChange={setPetChange} ocultoHerdado={true} />}
                </tbody>
            </table>
                : <div><p className={style.semPets}>Você ainda não adicionou nenhum pet</p>
                    <table>
                        <tbody>
                            {adicionando && <Pet adicionando={adicionando} setAdicionando={setAdicionando}  petChange={petChange} setPetChange={setPetChange} ocultoHerdado={true} />}
                        </tbody>
                    </table>
                </div>

            }
            <button onClick={() => setAdicionando(true)} className={style.button}><img src={plus} alt="Símbolo de adição" /></button>
        </section>
    )
}