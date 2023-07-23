import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest } from '../api/auth';

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

  const signup = async (user) => {
    try {
      const res = await registerRequest(user)
      // console.log(res.data);
      setUser(res.data)
    } catch (error) {
      // console.log(error.response)
      let errorMessages = []
      if (Array.isArray(error.response.data)) {
        errorMessages = error.response.data
      } else {
        errorMessages = [error.response.data.message]
      }
      setErrors(errorMessages)
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      setIsAuthenticated(true)
      setUser(res.data)
      sessionStorage.setItem("session", JSON.stringify(res.data))
    } catch (error) {
      // console.log(error.response)
      let errorMessages = []
      if (Array.isArray(error.response.data)) {
        errorMessages = error.response.data
      } else if (error.response.data.message) {
        errorMessages = [error.response.data.message]
      } else {
        errorMessages = ["Credenciales no válidas. Intente nuevamente."]
      }
      setErrors(errorMessages)
    }
  }

  const logout = async () => {
    const res = await logoutRequest(user)
    if (res.status === 200) {
      sessionStorage.removeItem("session")
      console.log("removing")
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

      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;