import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from '../api/auth';
import { HttpStatusCode } from "axios";

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must bee used within an AuthProvider");
  }
  return context
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true)

  const userType = user && Object.keys(user)[0] // Obtener el tipo de usuario

  const handleError = (err) => {

    let errorMessages = []
    if (Array.isArray(err.data)) {
      errorMessages = err.data
    } else if (err.data && err.data.message) {
      errorMessages = [err.data.message]
    } else if (typeof err.data == "string") {   
      errorMessages = [err];
    } else {
      errorMessages = ["error al iniciar sesion"]
    }
    setErrors(errorMessages)
  };  

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      if (res.status === HttpStatusCode.Created) {
        // setUser(res.data)
        return true
      } else {
        return res.data.message
      }
    } catch (error) {
      handleError(error);
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      if (res.status === 200) {
        if (res.data.error) {
          handleError(res);
          return;
        }
        
        setIsAuthenticated(true)
        setUser(res.data)
        sessionStorage.setItem("session", JSON.stringify(res.data))
      } else {
        console.log(res.error)
      }
    } catch (error) {
      // console.log(error.response)
      handleError(error);
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
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000);
      return () => clearTimeout(timer)
    }
  }, [errors])

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
        signup,
        signin,
        logout,
        user,
        loading,
        isAuthenticated,
        errors,
        userType
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;