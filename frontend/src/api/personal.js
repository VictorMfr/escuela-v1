import axios from './axios'

const config = (token) => (
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getPersonalRequest = (token) => axios.get(`/administracion`, config(token));

export const createPersonalRequest = (token, data) => axios.post(
    `direccion/administracion/registrarAdministrador`, data, config(token));