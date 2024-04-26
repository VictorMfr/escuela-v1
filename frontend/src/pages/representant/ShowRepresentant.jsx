import { useEffect } from 'react'
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useStudents } from '../../context/StudentsContext'
import { Link, useParams } from 'react-router-dom'
import { useRepresentants } from '../../context/RepresentantsContext';

const ShowRepresentant = () => {
  const { students, getStudentsByRepresentant } = useStudents()
  const { representantInfo, getRepresentant } = useRepresentants()
  const params = useParams()

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre y Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 220 },
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton" onClick={() => addStudent(params.row._id)}>
              <Tooltip title="Agregar Estudiante">
                <AddReactionOutlinedIcon />
              </Tooltip>
            </div>
            {/* <Link to={`edit/${params.row._id}`} className="viewButton">
              <Tooltip title="Modificar">
                <EditOutlinedIcon />
              </Tooltip>
            </Link> */}
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
        // deleteRepresentant(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const loadData = async (id_representant) => {
    // const resp = await getStudentsByRepresentant(id_representant)
    const resp = await getRepresentant(id_representant);
    if(resp.error) Swal.fire("Error!", resp.error, 'error').then(() => window.history.back());
  }

  useEffect(() => {
    loadData(params.id)
  }, [])

  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Información del Profesor</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{ representantInfo.name ?? '' }</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{ representantInfo.email ?? '' }</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estado:</span>
                  <span className="itemValue">
                    {
                      (representantInfo.habilitado) ? "Habilitado" : "Inactivo"
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
        <div className="bottom">
        <DataTable
          title="Estudiantes de Representante"
          tableCols={tableCols}
          tableRows={students}
          createUrl={`/representants/${params.id}/create`}
          actionColumn={actionColumn}
        />
        </div>
      </div>
    </div>
  )
}

export default ShowRepresentant