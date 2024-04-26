import axios from './axios'

const config = (token) => (
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
)

export const getStudentsRequest = (token) => axios.get(
  `direccion/estudiantes`, config(token));

export const getRepresentantsRequest = (token) => axios.get(
  `representantes`, config(token));

export const getRepresentantRequest = (token, id) => axios.get(
  `representantes/${id}`, config(token));

export const createRepresentantRequest = (token, data) => axios.post(
  `representante/nuevoRepresentante`, data, config(token));

export const deleteRepresentantRequest = (token, id) => axios.delete(
  `representante/${id}/eliminarRepresentante`, config(token));

export const updateRepresentantRequest = (token, id, data) => axios.patch(
    `representante/${id}`, data, config(token));

