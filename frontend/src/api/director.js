import axios from './axios';

const config = (token) => (
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

// Agregar nuevo periodo
export const createPeriodRequest = (token, data) => axios.post(
    `direccion/nuevoPeriodo`, data, config(token));

// Agregar Lapso a periodo actual
export const createLapseRequest = (token, data) => axios.post(
    `direccion/periodoActual/nuevoLapso`, data, config(token));

// Agregar Grados a lapto actual
export const addGradeRequest = (token, grades) => axios.post(
    `direccion/periodoActual/lapsos/lapsoActual/crearGrados`, {
        grados: grades
    }, config(token));

// Agregar Secciones al grado del periodo actual
export const addSectionsRequest = (token, section) => axios.post(
    `direccion/periodoActual/lapsos/lapsoActual/crearSecciones`, {
        secciones: section
    }, config(token));

// Agregar estudiantes a una seccion del period y lapso actual + id grado + id seccion
export const addStudentsRequest = (token, id_grade, id_section, data) => axios.post(
    `direccion/periodoActual/lapsoActual/grados/${id_grade}/secciones/${id_section}/registrarEstudiantes`,
    {
        estudiantes: data
    }, config(token));