import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { esES } from '@mui/x-data-grid/locales/esES';
import { Link } from "react-router-dom";
import { useState } from "react";

const DataTable = ({ title, createUrl, tableCols, tableRows, actionColumn }) => {

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link to={createUrl} className="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={tableRows}
        columns={tableCols.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          }
        }}
        pageSizeOptions={[10, 50, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
      />
    </div>
  )
}

export default DataTable