import "./users.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from "../../components/datatable/DataTable";
import { useEffect } from 'react';
import { useUsers } from "../../context/UsersContext";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

const Users = () => {

  const { getUsers, users, activateUser, deactivateUser, deleteUser } = useUsers()

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name', headerName: 'Nombre y Apellido', width: 200,
      renderCell: (params) => {
        return (<p>{ params.row.name }</p>)
      }
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'habilitado', headerName: 'Estado', width: 150,
      valueGetter: (params) => `${params.row.habilitado ? 'Activo' : 'Inactivo'}`
    }
  ];
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            {
              !params.row.habilitado
                ? (<div className="viewButton" onClick={() => activate(params.row._id)}>
                  <Tooltip title="Habilitar">
                    <ToggleOnOutlinedIcon />
                  </Tooltip>
                </div>)
                : (<div className="deleteButton" onClick={() => deactivate(params.row._id)}>
                  <Tooltip title="Deshabilitar">
                    <ToggleOffOutlinedIcon />
                  </Tooltip>
                </div>)
            }
            <div className="deleteButton" onClick={() => deleteRow(params.row._id)}>
              <Tooltip title="Eliminar">
                <DeleteOutlineOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        )
      }
    }
  ]

  const deleteRow = (id) => {
    Swal.fire({
      title: 'Eliminar registro',
      text: "Confirme eliminar el registro seleccionado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const activate = (id) => {
    activateUser(id)
    getUsers()
  }
  const deactivate = (id) => {
    deactivateUser(id)
    getUsers()
  }

  const _getUsers = async () => {
    const resp = await getUsers()
    if (resp.error) Swal.fire('Error', resp.error, 'error').then(() => window.history.back())
  }

  useEffect(() => {
    _getUsers();
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Administradores"
          tableCols={tableCols}
          tableRows={users}
          actionColumn={actionColumn}
          createUrl="/users/create" />
      </div>
    </div>
  )
}

export default Users