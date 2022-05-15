import axios from 'axios';

const ROOT_URL:string|undefined = process.env['ROOT_URL'];

export const getRequest = async (suffix:string,query_params:string) => {
    return axios.get(`${ROOT_URL}/${suffix}?q=${query_params}`);
};