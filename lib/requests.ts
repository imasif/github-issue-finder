import axios from 'axios';

const ROOT_URL = process.env['ROOT_URL'];

export const getRequest = async (suffix:String,query_params:String) => {
    return axios.get(`${ROOT_URL}/${suffix}?q=${query_params}`);
};