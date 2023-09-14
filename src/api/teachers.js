import axios from './axios';

const config = (token) => (
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getTeachersRequest = (token) => axios.get(`docentes`, config(token));

export const getTeacherRequest = (token, id) => axios.get(`docentes/${id}`, config(token));

export const createTeacherRequest = (token, teacher) => axios.post(
    `docente/registrarDocente`, teacher, config(token));

export const activeTeacherRequest = (token, id) => axios.patch(
    `docente/${id}/habilitarDocente`, {}, config(token));

export const inactiveTeacherRequest = (token, id) => axios.patch(
    `docente/${id}/deshabilitarDocente`, {}, config(token));

export const deleteTeacherRequest = (token, id) => axios.delete(
    `docente/${id}/eliminarDocente`, config(token));

export const assignSectionRequest = (token, id, data) => axios.patch(
    `docente/${id}/asignarSeccion`, data, config(token));

export const removeSectionRequest = (token, id) => axios.patch(
    `docente/${id}/retirarSeccion`, {}, config(token));

export const informeDescriptivoRequest = (token, data) => axios.post(
    'informeDescriptivo/cargarInforme', data, config(token));

export const rasgosPersonalesRequest = (token, data) => axios.post(
    'rasgosPersonales/establecerRasgos', data, config(token));

export const proyectoEscolarRequest = (token, data) => axios.post(
    'proyectoEscolar/registrarProyecto', data, config(token));