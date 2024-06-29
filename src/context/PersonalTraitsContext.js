import { createContext, useContext, useState } from "react";
import {
  createPersonalTraitRequest,
  getPersonalTraitsRequest,
  deletePersonalTraitRequest,
  getPersonalTraitRequest
} from '../api/personalTraits';
import { useAuth } from "./AuthProvider";

const PersonalTraitsContext = createContext();

export const usePersonalTraits = () => {
  const context = useContext(PersonalTraitsContext);

  if (!context) {
    throw new Error("usePersonalTraits must be used within a PersonalTraitsProvider");
  }
  return context;
}

export function PersonalTraitsProvider({ children }) {

  const [personalTraits, setPersonalTraits] = useState([]);
  const [personalTraitInfo, setPersonalTraitInfo] = useState([]);
  const { user } = useAuth();


  const getPersonalTraits = async () => {
    try {
      const res = await getPersonalTraitsRequest(user.token);
      if (res.status === 200 && !res.data.error) {
        setPersonalTraits(res.data);
        return res.data;
      } else {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }

  const getPersonalTraitById = async (id) => {
    try {
      const res = await getPersonalTraitRequest(user.token, id);
      setPersonalTraitInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createPersonalTrait = async (data) => {
    try {
      const res = await createPersonalTraitRequest(user.token, data);
      if (res.status === 201) {
        return true;
      } else {
        return res.data.message;
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.code === 11000) {
        return "El rasgo personal ya se encuentra registrado";
      }
      return error.response.data.message;
    }
  }

  const deletePersonalTrait = async (id) => {
    try {
      const res = await deletePersonalTraitRequest(user.token, id);
      if (res.status === 200) getPersonalTraits();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PersonalTraitsContext.Provider
      value={{
        personalTraitInfo,
        personalTraits,
        createPersonalTrait,
        getPersonalTraits,
        deletePersonalTrait,
        getPersonalTraitById
      }}>
      {children}
    </PersonalTraitsContext.Provider>
  )
}
