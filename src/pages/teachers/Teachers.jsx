import './teachers.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'
import { useTeachers } from '../../context/TeachersContext'
import { useEffect } from 'react';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HourglassDisabledOutlinedIcon from '@mui/icons-material/HourglassDisabledOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'


const Teachers = () => {
  const {
    getTeachers,
    teachers,
    activateTeacher,
    deactivateTeacher,
    deleteTeacher,
    assignClass,
    removeClass
  } = useTeachers()

  const navigate = useNavigate();


  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'name', headerName: 'Nombre y Apellido', width: 200,
      renderCell: (params) => {
        return (<p>{ params.row.name }</p>)
      }
    },
    { field: 'email', headerName: 'Email', width: 200 },
    ,
    {
      field: 'habilitado', headerName: 'Estado', width: 100,
      valueGetter: (params) => `${params.row.habilitado ? 'Activo' : 'Inactivo'}`
    }
  ];

  if (teachers.length > 0 && !teachers[0].static){
    tableCols.push({
      field: 'clases_asignadas',
      headerName: 'Clases Asignadas',
      width: 200,
      renderCell: (params) => {
        if (params.value.length > 0) {
          return <div style={{listStyle: "none"}}>{ params.value.map(Clase => <><small>Grado {Clase.grado} Sección { Clase.seccion.toUpperCase()}</small><br/></>) }</div>
        } else {
          return <b>-Sin clases asignadas-</b>
        }
      }
    })
  } 


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
                ? (<div className="viewButton" onClick={() => activateTeacher(params.row._id)}>
                  <Tooltip title="Habilitar">
                    <ToggleOnOutlinedIcon />
                  </Tooltip>
                </div>)
                : (<div className="deleteButton" onClick={() => deactivateTeacher(params.row._id)}>
                  <Tooltip title="Deshabilitar">
                    <ToggleOffOutlinedIcon />
                  </Tooltip>
                </div>)
            }
            {params.row.clases_asignadas.length == 0 && !params.row.static && <div className="viewButton" onClick={() => _assignClass(params.row._id)}>
              <Tooltip title="Asignar Clase">
                <HourglassEmptyOutlinedIcon />
              </Tooltip>
            </div>}
            {params.row.clases_asignadas.length > 0 && !params.row.static && (<div className="viewButton" onClick={() => _removeClass(params.row._id, params.row.clases_asignadas[0]._id)}>
              <Tooltip title="Retirar Clase">
                <HourglassDisabledOutlinedIcon />
              </Tooltip>
            </div>)}

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
        deleteTeacher(id)
      }
    })
  }

  const _assignClass = async (value) => {
    const { value: data } = await Swal.fire({
      title: 'Asignar clase',
      html: `
      <label>Grado: </label>
      <select default="1" id="grado" required style="padding:15px; width: 285px; margin: 20.25px 40.25px 3px 50.25px; border: 1px solid #ddd; border-radius: 3px; font-size: 1.125rem; color: inherit">
        <option value="1">Primer Grado</option>
        <option value="2">Segundo Grado</option>
        <option value="3">Tercero Grado</option>
        <option value="4">Cuarto Grado</option>
        <option value="5">Quinto Grado</option>
        <option value="6">Sexto Grado</option>
      </select>
      <br/>
      
      <label>Sección: </label>
      <select default="a" id="seccion" required style="padding:15px; width: 285px; margin: 20.25px 40.25px 3px 40.25px; border: 1px solid #ddd; border-radius: 3px; font-size: 1.125rem; color: inherit">
        <option value="a">Sección A</option>
        <option value="b">Sección B</option>
        <option value="c">Sección C</option>
        <option value="d">Sección D</option>
        <option value="e">Sección E</option>
      </select>
      <br/>

      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          grado: document.getElementById("grado").value,
          seccion: document.getElementById("seccion").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data && value) {
      const resp = await assignClass(value, data);
      if (resp.error) Swal.fire("Error", resp.error, 'error');
      Swal.fire("Exito", "La clase ha sido añadida exitosamente", "success").then(() => navigate(0));;
    }
  }

  const _removeClass = (id, id_class) => {
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
        const resp = await removeClass(id, id_class)
        if(resp.error) Swal.fire("Error", resp.error, 'error');
        Swal.fire("Exito", "La clase ha sido removida exitosamente", "success").then(() => navigate(0));        
      }
    })
  }

  useEffect(() => {
    getTeachers()
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Profesores"
          tableCols={tableCols}
          tableRows={teachers}
          actionColumn={actionColumn}
          createUrl="/teachers/create" />
      </div>
    </div>
  )
}

export default Teachers