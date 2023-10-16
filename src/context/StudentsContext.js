import { createContext, useContext, useState } from "react";
import {
  assignSectionRequest,
  createStudentRequest,
  editStudentRequest,
  getStudentDescriptiveReportRequest,
  getStudentNotesRequest,
  getStudentsByRepresentantRequest,
  getStudentsByTeacherRequest,
  getStudentsRequest,
  removeSectionRequest,
  setFinalQualifierStudentRequest,
  setInformStudentRequest,
  setStudentPersonalTraitsRequest,
  getStudentProofRequest
} from "../api/students";
import { useAuth } from "./AuthProvider";
import { HttpStatusCode } from "axios";

const StudentContext = createContext();

export const useStudents = () => {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);

  // Student-Related Reports
  const [studentDynamicReport, setStudentDynamicReport] = useState();

  const { user } = useAuth();

  const getStudents = async () => {
    try {
      const res = await getStudentsRequest(user.token);
      setStudents(res.data);
      if (res.status === 200 && !res.data.error) return res.data;
      else throw new Error(res.data.error);
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  const getStudentsList = async () => {
    try {
      const res = await getStudentsRequest(user.token);
      if (res.status === 200 && !res.data.error) {
        setStudents(res.data.map(e => ({
          label: e.nombres + ' ' + e.apellidos,
          id: e._id,
          cedula_escolar: e.cedula_escolar,
        })));
      }
      else throw new Error(res.data.error);
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  };

  const getStudent = async (id) => {
    try {
      const res = await getStudentsRequest(user.token);
      return res.data.filter((e) => e._id === id)[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentsByRepresentant = async (id) => {
    try {
      const res = await getStudentsByRepresentantRequest(user.token, id);
      setStudents(res.data? res.data.message : []);
    } catch (error) {
      console.log(error);
    }
  };

  const createStudent = async (id, student) => {
    try {
      const res = await createStudentRequest(user.token, id, student);
      if (res.status === HttpStatusCode.Ok) {
        return true;
      } else {
        return res.data.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = async (id_rep, id_est, student) => {
    try {
      const res = await editStudentRequest(user.token, id_rep, id_est, student);
      if (res.status === HttpStatusCode.Ok) {
        return true;
      } else {
        return res.data.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Asignar sección
  const assignSection = async (id_rep, id_est, data) => {
    try {
      const res = await assignSectionRequest(user.token, id_rep, id_est, {
        seccion: data,
      });
      if (res.status === 200) getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  //Retirar sección
  const removeSection = async (id_rep, id_est) => {
    try {
      const res = await removeSectionRequest(user.token, id_rep, id_est);
      if (res.status === 200) getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener estudiantes por profesor
  const getStudentsByTeacher = async () => {
    try {
      const res = await getStudentsByTeacherRequest(user.token);
      setStudents(res.data !== "" ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // Cargar informe descriptivo a estudainte por profesor
  const informeDescriptivo = async (id, data) => {
    try {
      const res = await setInformStudentRequest(user.token, id, data);
      if (res.status === 200 && !res.data.error) {
        return {
          title: 'Procesado.',
          text: 'Proceso realizado exitosamente',
          type: 'success'
        }
      } else {
        return {
          title: 'Error!',
          text: res.data.error,
          type: 'error'
        }
      }
    } catch (error) {
      return {
        title: 'Error!',
        text: error.data.error,
        type: 'error'
      }
      console.log(error);
    }
  };

  // Cargar rasgos personales a estudiante por profesor
  const rasgosPersonales = async (id, data) => {
    try {
      const res = await setStudentPersonalTraitsRequest(user.token, id, data);
      if (res.status === 200 && !res.data.error) {
        return {
          title: 'Procesado.',
          text: 'Proceso realizado exitosamente',
          type: 'success'
        }
      } else {
        return {
          title: 'Error!',
          text: res.data.error,
          type: 'error'
        }
      }
    } catch (error) {
      return {
        title: 'Error!',
        text: error.data,
        type: 'error'
      }
      console.log(error);
    }
  };

  // Cargar calificativo final a estudiante por profesor
  const calificativoFinal = async (id_representant, id_student, data) => {
    try {
      const res = await setFinalQualifierStudentRequest(user.token, id_representant, id_student, data);
      if (res.status === 200 && !res.data.error) {
        return {
          title: 'Procesado.',
          text: 'Proceso realizado exitosamente',
          type: 'success'
        }
      } else {
        return {
          title: 'Error!',
          text: res.data.error,
          type: 'error'
        }
      }
    } catch (error) {
      return {
        title: 'Error!',
        text: error.data.error,
        type: 'error'
      }
      console.log(error);
    }
  };

  // Obtener Boletin del estudiante
  const getStudentBulletin = async (id) => {
    try {
      const res = await getStudentNotesRequest(user.token, id);
      setStudentDynamicReport(res.data.message)
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener Informe Descriptivo del estudiante
  const getStudentReport = async (id) => {
    try {
      const res = await getStudentDescriptiveReportRequest(user.token, id);
      setStudentDynamicReport(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  // Obtener rasgos Personales del Estudiantes
  const getStudentPersonalTraits = async (id) => {
    try {
      const res = await getStudentPersonalTraits(user.token, id);
      setStudentDynamicReport(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  const getStudentProof = async (id) => {
    try {
      const res = await getStudentProofRequest(user.token, id);
      setStudentDynamicReport(res.data.message)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudent,
        getStudents,
        getStudentsList,
        getStudentsByRepresentant,
        getStudentsByTeacher,
        createStudent,
        editStudent,
        informeDescriptivo,
        rasgosPersonales,
        assignSection,
        removeSection,
        calificativoFinal,
        studentDynamicReport,
        getStudentBulletin,
        getStudentPersonalTraits,
        getStudentReport,
        getStudentProof
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
