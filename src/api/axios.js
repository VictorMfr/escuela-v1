import axios from 'axios';

export default axios.create({
    baseURL: 'https://school-rest-api-git-master-victormfr.vercel.app/',
    withCredentials: true
})