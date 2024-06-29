import "./personalTraits.scss";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DataTable from "../../components/datatable/DataTable";
import { useEffect } from 'react';
import { usePersonalTraits } from "../../context/PersonalTraitsContext";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';

const PersonalTraits = () => {

  const { getPersonalTraits, personalTraits, deletePersonalTrait } = usePersonalTraits();

  const tableCols = [
    {
      field: 'name', headerName: 'Nombre', width: 200,
      renderCell: (params) => {
        return (<p>{params.row.name}</p>)
      }
    },
    { field: 'description', headerName: 'Descripción', width: 300 }
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="deleteButton" onClick={() => deleteRow(params.row._id)}>
              <Tooltip title="Eliminar">
                <DeleteOutlineOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        )
      }
    }
  ];

  const deleteRow = (id) => {
    Swal.fire({
      title: 'Eliminar registro',
      text: "Confirme eliminar el registro seleccionado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePersonalTrait(id);
        Swal.fire(
          'Borrado',
          'El registro ha sido borrado.',
          'success'
        );
      }
    });
  };

  const _getPersonalTraits = async () => {
    const resp = await getPersonalTraits();
    if (resp.error) Swal.fire('Error', resp.error, 'error').then(() => window.history.back());
  };

  useEffect(() => {
    _getPersonalTraits();
  }, []);

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Rasgos Personales"
          tableCols={tableCols}
          tableRows={personalTraits}
          actionColumn={actionColumn}
          createUrl="/personalTraits/create" />
      </div>
    </div>
  );
}

export default PersonalTraits;
