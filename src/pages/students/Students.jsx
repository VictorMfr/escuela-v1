import './students.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'
import { useEffect } from 'react';
import { useStudents } from '../../context/StudentsContext'
import { Tooltip } from '@mui/material';
import HourglassDisabledOutlinedIcon from '@mui/icons-material/HourglassDisabledOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import Swal from 'sweetalert2'

const Students = () => {

  const { getStudents, students, assignSection, removeSection } = useStudents()
  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cedula_escolar', headerName: 'Cédula Escolar', width: 130 },
    { field: 'nombres', headerName: 'Nombres', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 150 },
    { field: 'seccion', headerName: 'Sección', width: 100 },
    { field: 'docente', headerName: 'Docente', width: 200 },
    { field: 'año_escolar', headerName: 'Año Escolar', width: 100 }
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton" onClick={() => _assignSection(params.row.id_representante, params.row._id, (params.row.seccion === "ninguno") ? "" : params.row.seccion)}>
              <Tooltip title="Cambiar Sección">
                <HourglassEmptyOutlinedIcon />
              </Tooltip>
            </div>
            {params.row.seccion !== "ninguno" && (<div className="deleteButton" onClick={() => _removeSection(params.row.id_representante, params.row._id)}>
              <Tooltip title="Remover Sección">
                <HourglassDisabledOutlinedIcon />
              </Tooltip>
            </div>)}
            <div className="viewButton" onClick={() => studentRegister(params.row._id, params.row.section)}>
              <Tooltip title="Registro Estudiantil">
                <BookOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        )
      }
    }
  ]

  const studentRegister = () => {

  }

  const _assignSection = (id_rep, id_est, current) => {
    Swal.fire({
      title: 'Ingrese la sección',
      input: 'text',
      inputValue: current,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        return await assignSection(id_rep, id_est, data)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result === true) {
        // Swal.fire({
        //   title: `${result.value.login}'s avatar`,
        //   imageUrl: result.value.avatar_url
        // })
        Swal.close()
      }
    })
  }

  const _removeSection = (id_rep, id_est) => {
    Swal.fire({
      title: 'Confirmar acción',
      text: "Confirme remover la sección del registro seleccionado",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSection(id_rep, id_est)
      }
    })
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Estudiantes"
          tableCols={tableCols}
          tableRows={students}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  )
}

export default Students