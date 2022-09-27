import http from "api";
import { useApi } from "hooks/useApi";
import IPet from "interfaces/IPet";
import { ChangeEvent, createContext, ReactNode, useState } from "react";
import camera from 'assets/imagens/cameraCinza.jpg';
import IUser from "interfaces/IUser";


type UserContextProps = {
    children: ReactNode;
};

type UserContextType = {
    pets: IPet[],
    setPets: (pets: IPet[]) => void,
    petsId: string[],
    image: string,
    setImage: (newState: string) => void,
    backImg: string,
    setBackImg: (newState: string) => void,
    handleUserChange: (file: ChangeEvent<HTMLInputElement>) => void,
    updatePetImg: (petId: string, stringURL: string) => void,
    threePets: () => IPet[][],
    updateUserImg: (stringURL: string) => void,
    salvarUserDados: (name?: string, username?: string, data?: Date | null, telefone?: string) => void,
    salvarPetsDados: (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>, petId: string | undefined, petNome: string, tipo: string) => void,
    adicionando: boolean,
    setAdicionando: (newState: boolean) => void,
    id: string | undefined,
    setId: (newState: string | undefined) => void,
    excluirPet: (petId: string | undefined) => void,
    user: IUser | undefined,
    setUser: (user: IUser | undefined) => void,
    setUserData: () => void;
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [pets, setPets] = useState<IPet[]>([])
    const [petsId, setPetsId] = useState([])
    const [image, setImage] = useState(camera);
    const [backImg, setBackImg] = useState(camera);
    const [adicionando, setAdicionando] = useState(false);
    const [id, setId] = useState<string | undefined>('');
    const [user, setUser] = useState<IUser | undefined>(undefined)

    const { mutate } = useApi(`user/${id}`)


    const setUserData = () => {
        if (user) {
            setBackImg(user.backImg)
            setPets(user.pets)
            if (user.profileImg !== '') {
                setImage(user.profileImg)
            }
        }
        mutate()
    }

    const handleUserChange = (file: ChangeEvent<HTMLInputElement>) => {
        let input = file.currentTarget;
        var reader = new FileReader();
        reader.onload = async function () {
            const dataURL = reader.result;
            const stringURL = String(dataURL);
            setBackImg(stringURL);
            try {
                await http.patch(`user/${id}`, {
                    backImg: stringURL
                });
                mutate();
                alert('Foto alterada com sucesso!');
            }
            catch (err) {
                console.log(err)
                alert('Não foi possível alterar sua foto, tente novamente mais tarde.')
            }
        };

        if (input.files) {
            reader.readAsDataURL(input.files[0]);
        }

    };

    const updateUserImg = async (stringURL: string) => {
        if (id) {
            try {
                await http.patch(`user/${id}`, {
                    profileImg: stringURL
                })
                mutate();
                setImage(stringURL);
                alert('Foto alterada com sucesso!');
            } catch (err) {
                alert('Não foi possível alterar sua foto, tente novamente mais tarde.')
                console.log(err)
            }
        }

    }

    const salvarUserDados = async (name?: string, username?: string, data?: Date | null, telefone?: string) => {
        if (user) {

            try {
                await http.patch(`user/${id}`, {
                    name: name,
                    username: username,
                    birthDate: data,
                    phone: telefone
                })
                mutate();
                alert('Dados alterados com sucesso!')

            } catch (err) {
                console.log(err)
                alert('Não foi possível salvar seus dados, tente novamente mais tarde.')
            }
        }

    }

    const updatePetImg = async (petId: string, stringURL: string) => {
        try {
            await http.patch(`pets/${petId}`, {
                petImg: stringURL
            })
            mutate();
            alert('Pet alterado com sucesso!')
        } catch (err) {
            console.log(err)
        }
    }

    const threePets = () => {
        return Array.from(
            new Array(Math.ceil(pets.length / 3)),
            (_, i) => pets.slice(i * 3, i * 3 + 3)
        )
    }

    const salvarPetsDados = async (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>, petId: string | undefined, petNome: string, tipo: string) => {
        evento.preventDefault()
        if (petId) {
            try {
                await http.patch(`pets/${petId}`, {
                    petName: petNome,
                    petType: tipo
                })
                mutate();
                alert('Dados alterados com sucesso!')
            } catch (err) {
                console.log(err)
                alert('Não foi possível alterar os dados, tente novamente mais tarde.')
            }
        } else {
            try {
                await http.post('pets/', {
                    petName: petNome,
                    petType: tipo,
                    petImg: "",
                    userId: id
                })
                mutate();
                alert('Pet criado com sucesso!')
                if (setAdicionando) {
                    setAdicionando(false)
                }

            } catch (err) {
                alert('Não foi possível adicionar o pet, tente novamente mais tarde')
                console.log(err)
            }
        }

    }

    const excluirPet = async (petId: string | undefined) => {
        try {
            await http.delete(`pets/${petId}`)
            mutate();
            alert('Pet removido com sucesso!')
        } catch (err) {
            console.log(err)
            alert('Não foi possível remover o pet, tente novamente mais tarde.')
        }
        if (setAdicionando) {
            setAdicionando(false)
        }
    }

    return (
        <UserContext.Provider value={{ pets, petsId, image, setImage, backImg, setBackImg, handleUserChange, updatePetImg, threePets, updateUserImg, salvarUserDados, salvarPetsDados, adicionando, setAdicionando, setId, id, excluirPet, setPets, user, setUser, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}

