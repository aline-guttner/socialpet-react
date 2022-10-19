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
    handleBackChange: (file: ChangeEvent<HTMLInputElement>) => void,
    updatePetImg: (petId: string, stringURL: string) => void,
    threePets: () => IPet[][],
    updateUserImg: (stringURL: string) => void,
    salvarUserDados: (name?: string, username?: string, data?: Date | null, telefone?: string) => void,
    salvarPetsDados: (evento: React.MouseEvent<HTMLButtonElement, MouseEvent>, petId: string | undefined, petNome: string, tipo: string) => void,
    adicionando: boolean,
    setAdicionando: (newState: boolean) => void,
    idLogado: string | undefined,
    setIdLogado: (newState: string | undefined) => void,
    excluirPet: (pet: IPet | undefined) => void,
    user: IUser | undefined,
    setUser: (user: IUser | undefined) => void,
    setUserData: (id: string | undefined) => void,
    excluirUser: () => Promise<void>
    tabela: boolean,
    setTabela: (smth: boolean) => void,
    info: IUser | undefined,
    setInfo: (user: IUser | undefined) => void,
    Protected: ({ children, userId, paramsId }: any) => any,
    isAuthenticated: () => Promise<void>,
    authenticated: boolean,
    setAuthenticated: (smth: boolean) => void
};

export const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProps) => {
    const [pets, setPets] = useState<IPet[]>([])
    const [petsId, setPetsId] = useState([])
    const [image, setImage] = useState(camera);
    const [backImg, setBackImg] = useState(camera);
    const [adicionando, setAdicionando] = useState(false);
    const [idLogado, setIdLogado] = useState<string | undefined>('');
    const [user, setUser] = useState<IUser | undefined>(undefined)
    const [info, setInfo] = useState<IUser | undefined>(undefined)
    const [tabela, setTabela] = useState(false)
    const [authenticated, setAuthenticated] = useState(true)

    const { mutate } = useApi(`user/${idLogado}`)

    const isAuthenticated = async () => {
        const tokenS = localStorage.getItem('token');
        if (!tokenS) {
            setAuthenticated(false)
            return
        }
        http.get('auth/verify', {
            headers: {
                'x-access-token': tokenS
            }
        })
            .then(res => {
                setIdLogado(res.data.loggedId)
                localStorage.setItem('user', res.data.loggedId);
                setAuthenticated(true)
            })
            .catch(err => {
                console.log(err)
                setAuthenticated(false)
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            })
    }

    const Protected = ({ children, userId, paramsId }: any) => {
        if (authenticated && userId !== paramsId) return (null)
        return (children)
    }

    const setUserData = async (id: string | undefined) => {

        if (!id) {
            return
        }

        try {
            let res = await http.get(`user/${id}`)
            setBackImg(res.data.backImg)
            setPets(res.data.pets)
            if (res.data.pets.length) {
                setTabela(true)
            } else {
                setTabela(false)
            }
            if (res.data.profileImg !== '') {
                setImage(res.data.profileImg)
            } else {
                setImage(camera)
            }
            setInfo(res.data);
        } catch (error) {
            console.log(error)
        }

    }

    const handleBackChange = (file: ChangeEvent<HTMLInputElement>) => {
        let input = file.currentTarget;
        var reader = new FileReader();
        reader.onload = async function () {
            const dataURL = reader.result;
            const stringURL = String(dataURL);
            setBackImg(stringURL);
            try {
                await http.patch(`user/${idLogado}`, {
                    backImg: stringURL
                });
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

        try {
            await http.patch(`user/${idLogado}`, {
                profileImg: stringURL
            })
            setImage(stringURL);
            alert('Foto alterada com sucesso!');
        } catch (err) {
            alert('Não foi possível alterar sua foto, tente novamente mais tarde.')
            console.log(err)
        }


    }

    const salvarUserDados = async (name?: string, username?: string, data?: Date | null, telefone?: string) => {
        if (info) {

            try {
                await http.patch(`user/${idLogado}`, {
                    name: name,
                    username: username,
                    birthDate: data,
                    phone: telefone
                })
                setUserData(idLogado)
                alert('Dados alterados com sucesso!')

            } catch (err) {
                console.log(err)
                alert('Não foi possível salvar seus dados, tente novamente mais tarde.')
            }
        } else {
            console.log("Sem info")
        }

    }

    const excluirUser = async () => {
        try {
            await http.delete(`user/${idLogado}`);
            alert("Usuário deletado com sucesso.");
            // usar um state pra deletar os pets quando o usuário for deletado
        } catch (err) {
            console.log(err)
        };
    };

    const updatePetImg = async (petId: string, stringURL: string) => {
        try {
            await http.patch(`pets/${petId}`, {
                petImg: stringURL
            })
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
                let res = await http.patch(`pets/${petId}`, {
                    petName: petNome,
                    petType: tipo
                })
                setUserData(idLogado)
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
                    userId: idLogado
                })
                setUserData(idLogado)
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

    const excluirPet = async (pet: IPet | undefined) => {
        try {
            if (pet) {
                let indexPet = pets.indexOf(pet)
                await http.delete(`pets/${pet._id}`)
                setUserData(idLogado)
                pets.length === 0 && setTabela(false)
                alert('Pet removido com sucesso!')
            }
        } catch (err) {
            console.log(err)
            alert('Não foi possível remover o pet, tente novamente mais tarde.')
        }
        if (setAdicionando) {
            setAdicionando(false)
        }
    }

    return (
        <UserContext.Provider value={{ pets, petsId, image, setImage, backImg, setBackImg, handleBackChange, updatePetImg, threePets, updateUserImg, salvarUserDados, salvarPetsDados, adicionando, setAdicionando, setIdLogado, idLogado, excluirPet, setPets, user, setUser, setUserData, excluirUser, tabela, setTabela, info, setInfo, Protected, isAuthenticated, authenticated, setAuthenticated }}>
            {children}
        </UserContext.Provider>
    )
}

