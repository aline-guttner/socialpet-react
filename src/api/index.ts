import axios from "axios";

export const baseURL = 'https://socialpet-backend.herokuapp.com/'

const http = axios.create({
    baseURL: 'https://socialpet-backend.herokuapp.com/'
});

export const deletePostRequest = (_id: string) => {
    axios
        .delete(`${baseURL}posts/${_id}`)
        .then(() => {
            alert("Post deleted!");
        });
}
// axios.delete(`http://localhost:8000/posts/${_id}`);
// alert("Post deletado com sucesso!")

export default http; 