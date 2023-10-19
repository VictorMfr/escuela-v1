import { createContext, useContext, useState } from "react";
import { createRepresentantRequest, deleteRepresentantRequest, getRepresentantRequest, getRepresentantsRequest, updateRepresentantRequest } from "../api/representants";
import { useAuth } from "./AuthProvider";

const RepresentantContext = createContext();

export const useRepresentants = () => {
  const context = useContext(RepresentantContext)

  if (!context) {
    throw new Error("useRepresentants must be used within a RepresentantProvider")
  }
  return context;
}

export function RepresentantProvider({ children }) {

  const [representants, setRepresentants] = useState([])
  const [representantInfo, setRepresentantInfo] = useState([])
  const { user } = useAuth()

  const getRepresentants = async () => {
    try {
      const res = await getRepresentantsRequest(user.token)
      setRepresentants(res.data)
    } catch (error) {
      // console.log(error)
      return error.response.data
    }
  }

  const createRepresentant = async (data) => {
    try {
      const res = await createRepresentantRequest(user.token, data)
      if (res.status === 201) {
        return true
      } else {
        return res.data.message
      }
    } catch (error) {
      // console.log(error)
      return error.response.data
    }
  }

  const deleteRepresentant = async (id) => {
    try {
      const res = await deleteRepresentantRequest(user.token, id)
      if (res.status === 200) getRepresentants()
    } catch (error) {
      // console.log(error)
      return error.response.data
    }
  }

  const getRepresentant = async (id) => {
    try {
      const resp = await getRepresentantRequest(user.token, id)
      if (resp.status === 200) return resp.data
    } catch (error) {
      return error.response.data
    }
  }

  const updateRepresentant = async (id, data) => {
    try {
      const resp = await updateRepresentantRequest(user.token, id, data)
      console.log(resp)
      if (resp.status === 200) return resp.data
    } catch (error) {
      return error.response.data
    }
  }

  return (
    <RepresentantContext.Provider
      value={{
        representants,
        representantInfo,
        getRepresentant,
        getRepresentants,
        deleteRepresentant,
        createRepresentant,
        updateRepresentant
      }}>
      {children}
    </RepresentantContext.Provider>
  )
}