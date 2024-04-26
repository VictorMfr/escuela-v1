import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useForm } from 'react-hook-form'
import { createPersonalRequest } from '../../api/personal'

const CreatePersonal = () => {

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    data.habilitado = true
    createPersonalRequest(data)
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Crear Nuevo Personal Administrativo</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" {...register("nombre")} placeholder='...' autoFocus required />
              </div>
              <div className="formInput">
                <label htmlFor="nombre">Email</label>
                <input type="email" {...register("email")} placeholder="..." required />
              </div>
              <button>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePersonal