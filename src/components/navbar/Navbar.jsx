import "./navbar.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Tooltip } from "@mui/material";
import { useAuth } from '../../context/AuthProvider';
import Swal from "sweetalert2";

const Navbar = () => {
  const { logout } = useAuth();

  // Function to handle the logout confirmation
  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar Sesión?',
      text: '¿Seguro que quieres cerrar la sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Logout the user when confirmed
        logout();
      }
    });
  };

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="items">
          <div className="item" onClick={handleLogout}>
            <Tooltip title="Cerrar Sesión">
              <LogoutOutlinedIcon className="icon" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
