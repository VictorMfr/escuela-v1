import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { esES } from '@mui/x-data-grid/locales/esES';
import { Link } from "react-router-dom";
import { useState } from "react";

const DataTable = ({ title, createUrl, tableCols, tableRows, actionColumn, student }) => {
  const [searchTerm, setSearchTerm] = useState('');


  const filteredRows = tableRows.filter((td) => {

    if (td.name && td.email) {
      return td.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        td.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (td.nombres && td.apellidos) {
      return td.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        td.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        td.cedula_escolar.toLowerCase().includes(searchTerm.toLowerCase())
    } 

  });

  return (
    <div className="datatable">
      <div className="datatableTitle" style={{ display: "flex", justifyContent: "space-between" }}>
        {title}
        {createUrl && (<Link to={createUrl} className="vlink"> Agregar </Link>)}
      </div>

      <input type="text" placeholder={`Buscar ${title.toLowerCase()}`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search" />

      <DataGrid
        getRowHeight={() => 'auto'}
        className="datagrid"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={filteredRows}
        columns={tableCols.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          }
        }}
        pageSizeOptions={[10, 50, 100]}
        getRowId={(row) => {
          return row._id
        }}
        components={{ NoRowsOverlay: () => (<></>) }}
      />
    </div>
  )
}

export default DataTable