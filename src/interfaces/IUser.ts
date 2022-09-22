import IPet from "./IPet";

export default interface IUser {
    username: string,
    name: string,
    email: string,
    password: string,
    birthDate: Date,
    profileImg: string,
    pets: IPet[],
    phone: string,
    backImg: string

}