export default interface IUser{
    username: string,
    name: string,
    email: string,
    password: string,
    birthDate: Date,
    profileImg: string,
    pets: [{
        petName: string,
        petType: string,
        petImg: string
    }],
    phone: string

}