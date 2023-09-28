import "./create-student.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudents } from '../../context/StudentsContext';
import Swal from 'sweetalert2';
import { useEffect } from "react";

const CreateStudent = () => {

  const { register, handleSubmit, setValue } = useForm()
  const { createStudent, editStudent, getStudent } = useStudents()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.id_rep && params.id_est) {
      _getStudent(params.id_est)
    }
  }, [])

  const _getStudent = async (id) => {
    const student = await getStudent(id)
    setValue("nombres", student.nombres);
    setValue("apellidos", student.apellidos);
    setValue("fecha_de_nacimiento", student.fecha_de_nacimiento);
    setValue("edad", student.edad);
    setValue("seccion", student.seccion);
    setValue("direccion", student.direccion);
    setValue("cedula_escolar", student.cedula_escolar);
    setValue("año_escolar", student.año_escolar);
  }

  const onSubmit = handleSubmit(async (data) => {
    const id_est = params.id_est
    const id_rep = params.id_rep
    if (id_est && id_rep) {
      const res = await editStudent(id_rep, id_est, data)
      if (res === true) {
        navigate('/students')
      } else {
        Swal.fire("Error!", res, 'error')
      }
    } else {
      const res = await createStudent(id_rep, data)
      if (res === true) {
        navigate('/representants')
      } else {
        Swal.fire("Error!", res, 'error')
      }
    }
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{(params.id_est) ? 'Modificar Estudiante' : 'Agregar Estudiante Nuevo'}</h1>
          <Link to={(params.id_est) ? '/students' : '/representants'} className="link">
            Regresar
          </Link>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="nombres">Nombres</label>
                <input type="text" required {...register('nombres')} placeholder="..." autoFocus />
              </div>
              <div className="formInput">
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" required {...register('apellidos')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento</label>
                <input type="date" required {...register('fecha_de_nacimiento')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="edad">Edad</label>
                <input type="text" required {...register('edad')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="direccion">Dirección</label>
                <input type="text" required {...register('direccion')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="cedula_escolar">Cédula Escolar</label>
                <input type="text" required {...register('cedula_escolar')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="año_escolar">Año Escolar</label>
                <input type="text" required {...register('año_escolar')} placeholder="..." />
              </div>
              <div className="formInput">
                <button>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateStudent