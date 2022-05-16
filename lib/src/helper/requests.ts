import axios from 'axios';

const ROOT_URL:string|undefined = process.env['ROOT_URL'];

export const getRequest = async (suffix:string,query_params:string) => {
    console.log(`${ROOT_URL}/${suffix}?q=${query_params}&page=1&per_page=2`);
    return axios.get(`${ROOT_URL}/${suffix}?q=${query_params}`);
};