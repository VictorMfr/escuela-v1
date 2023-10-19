import axios from "./axios"

const config = (token) => (
  {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
)

export const getStudentsRequest = (token) => axios.get(`direccion/estudiantes`, config(token));

export const createStudentRequest = (token, id, student) => axios.patch(`representante/${id}/nuevoEstudiante`, student, config(token));

export const editStudentRequest = (token, id_rep, id_est, data) => axios.patch(`representante/${id_rep}/estudiante/${id_est}/editarEstudiante`, data, config(token));

export const assignSectionRequest = (token, id_rep, id_est, data) => axios.patch(`representante/${id_rep}/estudiante/${id_est}/moverSeccion`, data, config(token));

export const removeSectionRequest = (token, id_rep, id_est, data) => axios.patch(`representante/${id_rep}/estudiante/${id_est}/retirarSeccion`, {}, config(token));

export const getStudentsByRepresentantRequest = (token, id) => axios.get(`representante/estudiantes`, config(token));


// Docente

//Cargar estudiantes del profesor
export const getStudentsByTeacherRequest = (token) => axios.get(`profesor/estudiantes`, config(token));

// Cargar informe descriptivo: patch /estudiante/:estudiante/cargarInforme 
export const setInformStudentRequest = (token, id, data) => axios.post(
  `docentes/estudiantes/${id}/informeDescriptivo/cargarInforme`,
  data,
  config(token))

// Establecer rasgos personales: patch /estudiante/:estudiante/cargarRasgosPersonales
export const setStudentPersonalTraitsRequest = (token, id, data) => axios.post(
  `/docentes/estudiantes/${id}/rasgosPersonales/establecerRasgos`,
  data,
  config(token))

// Registrar calificativo final: patch /estudiante/:estudiante/registrarCalificativoFinal
export const setFinalQualifierStudentRequest = (token, id_student, data) => axios.post(
  `/docentes/estudiantes/${id_student}/calificativoFinal/registrarLiteralCalificativoFinal`,
  data,
  config(token))


// Obtener boletin del estudiante
export const getStudentNotesRequest = (token, id) => axios.get(`estudiante/${id}/boletin`, config(token));

// Obtener Constancia de estudios del estudiante
export const getStudentProofRequest = (token, id) => axios.get(`estudiante/${id}/constanciaDeEstudios`, config(token));

// Obtener informe Descriptivo del estudiante
export const getStudentDescriptiveReportRequest = (token, id) => axios.get(`estudiante/${id}/informeDescriptivo`, config(token));

// Establecer rasgos personales: patch /estudiante/:estudiante/cargarRasgosPersonales
export const getStudentPersonalTraitsRequest = (token, id) => axios.get(`/estudiantes/${id}/rasgosPersonales`, config(token))