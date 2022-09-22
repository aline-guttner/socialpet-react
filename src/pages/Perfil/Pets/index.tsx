import Pet from './Pet';
import plus from 'assets/imagens/plus-16.png';
import style from './Pets.module.scss';
import { useContext } from 'react';
import { UserContext } from 'contexts/UserContext';

export default function Pets() {
    const { pets, adicionando, setAdicionando } = useContext(UserContext)

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
                    {pets.map(pet => (
                        <Pet pet={pet} key={pet._id} />
                    ))}
                    {adicionando && <Pet ocultoHerdado={true} />}
                </tbody>
            </table>
                : <div><p className={style.semPets}>Você ainda não adicionou nenhum pet</p>
                    <table>
                        <tbody>
                            {adicionando && <Pet ocultoHerdado={true} />}
                        </tbody>
                    </table>
                </div>
            }
            <button onClick={() => setAdicionando(true)} className={style.button}><img src={plus} alt="Símbolo de adição" /></button>
        </section>
    )
}