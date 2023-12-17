import axios from 'axios';

export default axios.create({
    baseURL: 'https://school-rest-api-victormfr.vercel.app',
    withCredentials: true
})