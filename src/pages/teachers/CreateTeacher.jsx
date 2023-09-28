import "./create-teacher.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useForm } from 'react-hook-form';
import { useTeachers } from "../../context/TeachersContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CreateTeacher = ({ inputs, title }) => {

  const { register, handleSubmit } = useForm();
  const { createTeacher } = useTeachers();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    data.habilitado = true;
    const res = await createTeacher(data)
    if (res === true) {
      navigate("/teachers")
    } else {
      console.log(res);
      Swal.fire("Error en el proceso", res, "error");
    }
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Crear Nuevo Profesor</h1>
          <Link to='/teachers' className="link">
            Volver
          </Link>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="name">Nombre</label>
                <input type="text" {...register("name")} placeholder='...' autoFocus required />
              </div>
              <div className="formInput">
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email")} placeholder="..." required />
              </div>
              

              <div className="formInput">
                <label htmlFor="password">Contraseña</label>
                <input type="password" {...register("password")} placeholder='...' required />
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

export default CreateTeacher