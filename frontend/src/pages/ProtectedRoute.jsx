import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"
import LoadingModal from "./register/LoadingModal";


const ProtectedRoute = () => {

  const { isAuthenticated, loading } = useAuth();

  if (loading) return (<LoadingModal show={true}/>)
  if (!loading && !isAuthenticated) return <Navigate to="/home" replace />

  return <Outlet />
}

export default ProtectedRoute