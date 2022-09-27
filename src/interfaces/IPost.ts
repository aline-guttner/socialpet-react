export default interface IPost{
    _id: string,
    id: string,
    date: Date,
    userId: string,
    title: string,
    image: string[],
    content: string
}