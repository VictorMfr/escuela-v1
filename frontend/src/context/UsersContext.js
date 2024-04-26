import { createContext, useContext, useState } from "react";
import { createUserRequest, getUsersRequest, activeUserRequest, inactiveUserRequest, deleteUserRequest, getUserRequest } from '../api/users'
import { useAuth } from "./AuthProvider";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("useUsers must be used within a UserProvider")
  }
  return context;
}

export function UserProvider({ children }) {

  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const { user } = useAuth()

  const activateUser = async (id) => {
    try {
      const res = await activeUserRequest(user.token, id)
      if (res.status === 200) getUsers()
    } catch (error) {
      console.log(error)
    }
  }
  const deactivateUser = async (id) => {
    try {
      const res = await inactiveUserRequest(user.token, id)
      if (res.status === 200) getUsers()
    } catch (error) {
      console.log(error)
    }
  }

  const getUsers = async () => {
    try {
      const res = await getUsersRequest(user.token)
      if (res.status === 200 && !res.data.error) {
        setUsers(res.data)
        return res.data
      }
      else return res.data
    } catch (error) {
      console.log(error)
      return error.response.data
    }
  }

  const getUserById = async (id) => {
    try {
      const res = await getUserRequest(user.token, id);
      setUserInfo(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createUser = async (data) => {
    try {
      const res = await createUserRequest(user.token, data)
      if (res.status === 201) {
        return true
      } else {
        return res.data.message
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.code === 11000) {
        return "El email ya se encuentra registrado";
      }
      return error.response.data.message
    }
  }

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(user.token, id)
      if (res.status === 200) getUsers()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UserContext.Provider
      value={{
        userInfo,
        users,
        createUser,
        getUsers,
        activateUser,
        deactivateUser,
        deleteUser,
        getUserById
      }}>
      {children}
    </UserContext.Provider>
  )
}