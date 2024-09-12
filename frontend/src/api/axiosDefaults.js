import axios from 'axios';

axios.defaults.baseURL = 'https://8000-mistersouza-cliphub-0rgnlzr37ma.ws.codeinstitute-ide.net/api/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosRequest = axios.create();
export const axiosResponse = axios.create();