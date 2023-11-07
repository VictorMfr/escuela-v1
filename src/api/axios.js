import axios from 'axios';

export default axios.create({
    baseURL: 'https://school-rest-api-nu.vercel.app',
    withCredentials: true
})