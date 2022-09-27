import axios from "axios";

const http = axios.create({
    baseURL: 'https://socialpet-backend.herokuapp.com/'
});

export default http; 