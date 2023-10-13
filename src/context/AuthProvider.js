import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from '../api/auth';
import { HttpStatusCode } from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true)

  const userType = user && Object.keys(user)[0] // Obtener el tipo de usuario

  const handleError = (err) => {

    // Figuring out want kind of error it is dealing with
    let error = "";

    switch (err.message) {
      case "Network Error":
        error = "Error de Conexión con el Servidor";
        break;
      case "Request failed with status code 500": 
        error = `${err.response.data.error}`;
        break;
    }

    // Sending the corresponding error
    setError(error)
  };  

  // Making a Register request to Backend
  const register = async (user) => {
    try {
      // Sending request
      const res = await registerRequest(user)

      // Dealing with the Good Response
      if (res.status === HttpStatusCode.Created) {
        return true
      } else {
        return res.data.message? res.data.message: res
      }

    } catch (error) {
      // Something went wrong with the response
      handleError(error);
      return error
    }
  }

  // Making a Login request to Backend
  const login = async (user) => {
    try {
      const res = await loginRequest(user)

      // Checking response of backend
      if (res.status === 200) {
        // The response was positive, but there was a error
        if (res.data.error) {
          handleError(res);
          return;
        }

        // The response was positive and good
        setIsAuthenticated(true)
        setUser(res.data)


        sessionStorage.setItem("session", JSON.stringify(res.data))
      } else {
        return res.error
      }
    } catch (error) {
      handleError(error);
      return error
    }
  }

  const logout = async () => {
    const res = await logoutRequest(user)
    if (res.status === 200) {
      sessionStorage.removeItem("session")
      setIsAuthenticated(false)
      setUser(null)
    }
  }

  

  useEffect(() => {

    if (!sessionStorage.getItem('session')) {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false)
    } else {
      setUser(JSON.parse(sessionStorage.getItem("session")))
      setIsAuthenticated(true)
      setLoading(false)
    }

  }, [isAuthenticated])

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        user,
        loading,
        isAuthenticated,
        error,
        userType,
        setError
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;