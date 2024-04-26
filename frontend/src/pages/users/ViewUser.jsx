import './edit-user.scss'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import { useUsers } from '../../context/UsersContext'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const ViewUser = () => {
  const { getUserById, userInfo } = useUsers();
  const params = useParams();
  useEffect(() => {
    getUserById(params.id_user)
  }, [])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Información del Administrador</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{ userInfo.name }</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ userInfo.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estado:</span>
                  <span className="itemValue">
                    {
                      (userInfo.habilitado) ? "Habilitado" : "Inactivo"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Link to="/users" className="link">Volver</Link>
          </div>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  )
}

export default ViewUser