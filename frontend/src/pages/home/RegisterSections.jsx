import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales/esES';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { useDirectors } from "../../context/DirectorContext";
import { useNavigate } from "react-router-dom";
import { Tooltip, Button, Select, MenuItem } from "@mui/material"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const RegisterSections = () => {
  const navigate = useNavigate();
  const { addSections } = useDirectors();

  const [tableRows, setTableRows] = useState([]);
  const [sectionSelect, setSectionSelect] = useState("a");

  const changeSectionSelectHandler = (event) => {
    setSectionSelect(event.target.value);
  }

  const addRow = () => {
    const sectionValue = sectionSelect;
    const found = tableRows.find((e) => e.section === sectionValue);

    if (found) {
      Swal.fire("Atención", "El valor ya se encuentra registrado", "warning")
    } else {
      const row = {
        id: uuidv4(),
        section: sectionValue
      };

      const newTable = [...tableRows, row];
      setTableRows(newTable);
    }
  };

  const deleteRow = (id) => {
    const newTable = tableRows.filter((e) => e.id !== id);
    setTableRows(newTable);
  }

  const saveSections = async () => {
    const secciones = tableRows.map((row) => ({ seccion: row.section }));

    if (secciones.length <= 0) {
      Swal.fire("Atención", "Ingrese al menos 1 sección a procesar", "warning")
        .then(() => {
          // Handle missing sections
        });
    } else {
      Swal.fire({
        title: 'Confirmar.',
        text: "Confirme realizar el proceso.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Procesar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await addSections(secciones);
          Swal.fire(resp.title, resp.text, resp.type).then((res) => {
            if (res.isConfirmed && resp.type === "success") navigate("/");
          });
        }
      });
    }
  }

  const tableCols = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "section", headerName: "Sección", width: 130 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Opciones",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton" onClick={() => deleteRow(params.row.id)}>
              <Tooltip title="Eliminar">
                <DeleteOutlineOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="list" style={{ display: "flex" }}>
      <Sidebar/>
      <div className="listContainer" style={{ width: "100%" }}>
        <Navbar/>
        <div className="gradeSelect">
          <span className="title">AGREGAR SECCIÓN</span>
          <Select
            labelId="section-label"
            id="section"
            required
            size="small"
            variant="filled"
            onChange={changeSectionSelectHandler}
            value={sectionSelect}
            style={{width: 300}}
          >
            <MenuItem value={"a"}>Sección A</MenuItem>
            <MenuItem value={"b"}>Sección B</MenuItem>
            <MenuItem value={"c"}>Sección C</MenuItem>
            <MenuItem value={"d"}>Sección D</MenuItem>
            <MenuItem value={"e"}>Sección E</MenuItem>
          </Select>
        </div>
        <br/>
        <div className="widgets" style={{display: "flex", justifyContent:"center"}}>
          <button className="link" onClick={addRow} >
            Agregar.
          </button>
        </div>

        <div className="datatable">
          <div className="datatableTitle" style={{width: 625, margin: "0 auto", marginTop: 21, marginBottom: 21}}>
            Secciones a Procesar
            <Button variant="outlined" onClick={saveSections}>
              Guardar
            </Button>
          </div>
          <DataGrid
            getRowHeight={() => 'auto'}
            className="datagrid"
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={tableRows}
            columns={tableCols.concat(actionColumn)}
            columnVisibilityModel={{
              status: false,
              traderName: false,
              id: false,
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              }
            }}
            pageSizeOptions={[10, 50, 100]}
            style={{width: "50%", margin: "0 auto"}}
            components={{ NoRowsOverlay: () => (<></>) }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterSections;