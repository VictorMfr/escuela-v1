import classes from "./CreateStudentForm.module.css";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudents } from '../../context/StudentsContext';
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import LoadingModal from "../register/LoadingModal";

const CreateStudent = () => {

  const { register, handleSubmit, setValue } = useForm()
  const { createStudent, editStudent, getStudent } = useStudents()
  const navigate = useNavigate()
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true)

    const id_est = params.id_est
    const id_rep = params.id_rep
    if (id_est && id_rep) {
      const res = await editStudent(id_rep, id_est, data)
      if (res === true) {
        navigate('/students')
      } else {
        Swal.fire("Error", res, 'error')
      }
    } else {
      const res = await createStudent(id_rep, data)
      if (res === true) {
        navigate('/representants')
      } else {
        Swal.fire("Error", res, 'error')
      }
    }
  })

  return (
    <div className={classes.screen}>
      <Sidebar />
      <div className={classes.container}>
        <Navbar />
        <div className={classes.top}>
          <h1>{(params.id_est) ? 'Modificar Estudiante' : 'Agregar Estudiante Nuevo'}</h1>
          <Link to={(params.id_est) ? '/students' : '/representants'} className={classes.backlink}>
            Regresar
          </Link>
        </div>
        <div className="bottom">
          <div className="right" >
            <form onSubmit={onSubmit}  className={classes.representantAddStudentForm}>
              <div className={classes.representantAddStudentFormDisplay}>
                <div>
                  <div className="formInput">
                    <label htmlFor="nombres">Nombres</label>
                    <input type="text" required {...register('nombres')} placeholder="Ingrese los nombres" autoFocus />
                  </div>
                  <div className="formInput">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input type="text" required {...register('apellidos')} placeholder="Ingrese los apellidos" />
                  </div>
                  <div className="formInput">
                    <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento</label>
                    <input type="date" required {...register('fecha_de_nacimiento')} placeholder="Ingrese la fecha de nacimiento" />
                  </div>
                  <div className="formInput">
                    <label htmlFor="edad">Edad</label>
                    <input type="text" required {...register('edad')} placeholder="Ingrese la edad" />
                  </div>
                </div>
                <div>
                  <div className="formInput">
                    <label htmlFor="direccion">Dirección</label>
                    <input type="text" required {...register('direccion')} placeholder="Ingrese la dirección" />
                  </div>
                  <div className="formInput">
                    <label htmlFor="cedula_escolar">Cédula Escolar</label>
                    <input type="text" required {...register('cedula_escolar')} placeholder="Ingrese la cédula escolar" />
                  </div>
                  <div className="formInput">
                    <label htmlFor="año_escolar">Año Escolar</label>
                    <input type="text" required {...register('año_escolar')} placeholder="Ingrese el año escolar" />
                  </div>
                </div>
              </div>
              <div className={classes.saveButton}>
                <button>Guardar</button>
              </div>
            </form>
          </div>
        </div>
        <LoadingModal show={isLoading} />
      </div>
    </div>
  )
}

export default CreateStudent