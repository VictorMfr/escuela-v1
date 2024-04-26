import axios from "./axios";

const config = (token) => (
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)


// Get Current Period
export const getPeriodRequest = (token) => axios.get(
    `/direccion/periodoActual`, config(token));

// Get Current Lapso
export const getLapseRequest = (token) => axios.get(
    "/direccion/lapsoActual", config(token));