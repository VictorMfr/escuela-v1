import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { usePersonalTraits } from '../../context/PersonalTraitsContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Classes from "./CreatePersonalTrait.module.css";
import LoadingModal from '../register/LoadingModal';

const CreatePersonalTrait = ({ title }) => {
  const { register, setValue, handleSubmit } = useForm();
  const { createPersonalTrait, getPersonalTraitById } = usePersonalTraits();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      _getPersonalTrait(id);
    }
  }, [id]);

  const _getPersonalTrait = async (Id) => {
    const resp = await getPersonalTraitById(Id);

    setValue("name", resp.name);
    setValue("description", resp.description);

    if (resp.error) Swal.fire('Error', resp.error, 'error').then(() => { window.history.back(); });
  };

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);

    const res = await createPersonalTrait(data);
    if (res === true) {
      navigate("/personalTraits");
    } else {
      Swal.fire("Error en el proceso", res, "error");
    }

    setIsLoading(false);
  });

  return (
    <div className={Classes.screen}>
      <Sidebar />
      <div className={Classes.container}>
        <Navbar />
        <div>
          <div className={Classes.top}>
            <h1>{title}</h1>
            <Link to='/personalTraits' className={Classes.backlink}>
              Volver
            </Link>
          </div>
          <form onSubmit={onSubmit} className={Classes.personalTraitForm}>
            <label htmlFor="name">Nombre</label>
            <input type="text" {...register("name")} placeholder='Ingrese el nombre' autoFocus required />

            <label htmlFor="description">Descripción</label>
            <input type="text" {...register("description")} placeholder="Ingrese la descripción" />

            <div className={Classes.saveButton}>
              <button>Guardar</button>
            </div>
          </form>
        </div>
        <LoadingModal show={isLoading} />
      </div>
    </div>
  );
};

export default CreatePersonalTrait;
