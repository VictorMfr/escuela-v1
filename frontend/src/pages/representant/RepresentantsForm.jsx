import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRepresentants } from '../../context/RepresentantsContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Classes from "./RepresentantsForm.module.css";
import LoadingModal from '../register/LoadingModal';

const CreateRepresentant = ({ title }) => {
  const { register, setValue, handleSubmit } = useForm();
  const { createRepresentant, getRepresentant, updateRepresentant } = useRepresentants();
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      _getRepresentant(id)
    }
  }, [])



  const _getRepresentant = async (Id) => {
    const resp = await getRepresentant(Id)

    setValue("name", resp.name);
    setValue("email", resp.email);
    
    if (resp.error) Swal.fire('Error', resp.error, 'error').then(() => { window.history.back(); })
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)

    if (title == "Modificar Representante") {
      const res = await updateRepresentant(id, data)
      
      if (res) {
        navigate("/representants")
      } else {
        Swal.fire("Error en el proceso", res, "error");
      }
    } else {
      const res = await createRepresentant(data)
      if (res === true) {
        navigate("/representants")
      } else {
        Swal.fire("Error en el proceso", res, "error");
      }
    }
    setIsLoading(false)
  })

  let optionalInputBasedOnFormType = title == "Modificar Representante";

  return (
    <div className={Classes.screen}>
      <Sidebar />
      <div className={Classes.container}>
        <Navbar />
        <div>
          <div className={Classes.top}>
            <h1>{title}</h1>
            {optionalInputBasedOnFormType}
            <Link to='/representants' className={Classes.backlink}>
              Volver
            </Link>
          </div>
          <form onSubmit={onSubmit} className={Classes.representantForm}>

            <label htmlFor="name">Nombre</label>
            <input type="text" {...register("name")} placeholder='Ingrese el nombre' autoFocus required={optionalInputBasedOnFormType} />

            <label htmlFor="email">Email</label>
            <input type="email" {...register("email")} placeholder="Ingrese el email" required={optionalInputBasedOnFormType} />

            <label htmlFor="password">Contraseña</label>
            <input type="password" {...register("password")} placeholder='Ingrese la contraseña' required={optionalInputBasedOnFormType} />

            <div className={Classes.saveButton}>
              <button>Guardar</button>
            </div>
          </form>
        </div>
        <LoadingModal show={isLoading} />
      </div>
    </div>
  )
}

export default CreateRepresentant