import React, { useEffect } from 'react'
import DataTable from '../../components/datatable/DataTable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useRepresentants } from '../../context/RepresentantsContext';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Representant = () => {

  const { getRepresentants, representants, deleteRepresentant } = useRepresentants()
  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name', headerName: 'Nombre y Apellido', width: 200,
      renderCell: (params) => (<Link to={params.row._id}>{ params.value }</Link>)
    },
    { field: 'email', headerName: 'Email', width: 220 },
    {
      field: 'hijos_estudiantes', headerName: 'Estudiantes', width: 220,
      renderCell: (params) => {
        if (params.value.length > 0) {
          return <div style={{ padding: 0, }}>{params.value.map((e) => (<p key={e._id}><b>{e.hijo_estudiante.nombres} {e.hijo_estudiante.apellidos}</b></p>))}</div>
        } else {
          return <b>-Sin registros-</b>
        }
      }
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
            <Link to={`/representants/${params.row._id}/add-student`} className="viewButton">
              <Tooltip title="Agregar Estudiante">
                <AddReactionOutlinedIcon />
              </Tooltip>
            </Link>
            <Link to={`edit/${params.row._id}`} className="viewButton">
              <Tooltip title="Modificar">
                <EditOutlinedIcon />
              </Tooltip>
            </Link>
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

  const addStudent = (id) => {
    alert(id)
  }

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
        deleteRepresentant(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  useEffect(() => {
    getRepresentants()
  }, [])

  return (
    <div className='list' style={{display: "flex"}}>
      <Sidebar />
      <div className="listContainer" style={{ width: "100%" }}>
        <Navbar />
        <DataTable
          title="Representantes"
          tableCols={tableCols}
          tableRows={representants}
          createUrl={`/representants/create`}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  )
}

export default Representant