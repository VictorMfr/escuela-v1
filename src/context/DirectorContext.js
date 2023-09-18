import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { addGradeRequest, addSectionsRequest, createLapseRequest, createPeriodRequest } from "../api/director";

const DirectorContext = createContext();

export const useDirectors = () => {
  const context = useContext(DirectorContext);

  if (!context) {
    throw new Error("useDirectors must be used within a DirectorProvider");
  }
  return context;
}

export function DirectorsProvider({ children }) {
  const [directors] = useState([]);
  const { user } = useAuth()

  const addPeriod = async (data) => {
    try {
      const res = await createPeriodRequest(user.token, data);
      if(res.status === 200 && !res.data.error)
      {
        return {
          title: 'Procesado',
          text: "Periodo escolar procesado exitosamente.",
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
        text: error.response.data.error,
        type: 'error'
      }
    }
  };

  const addLapse = async (data) => {
    try {
      const res = await createLapseRequest(user.token, data);
      if(res.status === 200 && !res.data.error)
      {
        return {
          title: 'Procesado',
          text: "Lapso procesado exitosamente.",
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
        text: error.response.data.error,
        type: 'error'
      }
    }
  };

  const addGrades = async (lapse, grades) => {
    try {
      const res = await addGradeRequest(user.token, lapse, grades);
      if(res.status === 200 && !res.data.error)
      {
        return {
          title: 'Procesado',
          text: "Grado procesado exitosamente.",
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
        text: error.response.data.error,
        type: 'error'
      }
    }
  }

  const addSections = async (lapse, grade, section) => {
    try {
      const res = await addSectionsRequest(user.token, lapse, grade, section);
      if(res.status === 200 && !res.data.error)
      {
        return {
          title: 'Procesado',
          text: "Sección procesado exitosamente.",
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
        text: error.response.data.error,
        type: 'error'
      }
    }
  }

  return (
    <DirectorContext.Provider value={{
      directors,
      addPeriod,
      addLapse,
      addGrades,
      addSections,
    }}>
      {children}
    </DirectorContext.Provider>
  );
}