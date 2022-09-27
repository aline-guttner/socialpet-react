import axios from "axios";

export const baseURL = 'https://socialpet-backend.herokuapp.com/'

export const http = axios.create({
    baseURL: 'https://socialpet-backend.herokuapp.com/'
});

//eu mudei o lugar da deletePostRequest pra PostContext, porque eu não tava conseguindo usar o mutate(), que faz o feed atualizar automaticamente, no arquivo da api. Tá lá no fim do arquivo.

export default http; 