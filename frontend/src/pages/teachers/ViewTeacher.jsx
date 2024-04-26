import "./edit-teacher.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useTeachers } from "../../context/TeachersContext"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const ViewTeacher = () => {

  const { getTeacherById, teacherInfo } = useTeachers();
  const params = useParams();
  useEffect(() => {
    getTeacherById(params.id_teacher);
  }, []);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Información del Profesor</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{ teacherInfo.name }</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ teacherInfo.email }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estado:</span>
                  <span className="itemValue">
                    {
                      (teacherInfo.habilitado) ? "Habilitado" : "Inactivo"
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Link to="/teachers" className="link">Volver</Link>
          </div>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  )
}

export default ViewTeacher