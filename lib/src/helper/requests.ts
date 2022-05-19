import axios, { AxiosResponse } from 'axios';

const ROOT_URL:string|undefined = process.env['ROOT_URL'];

export const getRequest = async (suffix:string,query_params:string): Promise<AxiosResponse<string, string>> => {
    console.log(`${ROOT_URL}/${suffix}?q=${query_params}`);
    return axios.get(`${ROOT_URL}/${suffix}?q=${query_params}`);
};