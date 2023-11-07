import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthProvider";
import logo from "../../assets/logo_escuela.png";

const Sidebar = () => {
  const { userType } = useAuth()

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="Logo Escuela" className="logo-img" />
          {/* <span className="logo">logoescuela</span> */}
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>

          <p className="title">PRINCIPAL</p>

          <hr />

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>

          {
            (userType == "representante") && (
              <>
                <Link to={`students`} style={{ textDecoration: "none" }}>
                  <li>
                    <PeopleIcon className="icon" />
                    <span>Hijos</span>
                  </li>
                </Link>
              </>
            )
          }

          {
            (userType === "profesor") && (
              <>
                <Link to={`/students`} style={{ textDecoration: "none" }}>
                  <li>
                    <SpeedOutlinedIcon className="icon" />
                    <span>Estudiantes</span>
                  </li>
                </Link>
              </>
            )
          }

          {
            (userType === "director" || userType === "administrador") && (
              <>
                <Link to="/representants" style={{ textDecoration: "none" }}>
                  <li>
                    <PeopleIcon className="icon" />
                    <span>Representantes</span>
                  </li>
                </Link>
                <Link to="/students" style={{ textDecoration: "none" }}>
                  <li>
                    <SchoolIcon className="icon" />
                    <span>Estudiantes</span>
                  </li>
                </Link>

                {
                  (userType === "director") && (
                    <Link to="/users" style={{ textDecoration: "none" }}>
                      <li>
                        <PeopleIcon className="icon" />
                        <span>Administradores</span>
                      </li>
                    </Link>
                  )
                }

                {/* <Link to="/personal" style={{ textDecoration: "none" }}>
                  <li>
                    <FolderSharedIcon className="icon" />
                    <span>Personal Administrativo</span>
                  </li>
                </Link> */}
                <Link to="/teachers" style={{ textDecoration: "none" }}>
                  <li>
                    <AssignmentIndIcon className="icon" />
                    <span>Docentes</span>
                  </li>
                </Link>
              </>
            )
          }
          
        </ul>
      </div>
      
    </div>
  )
}

export default Sidebar