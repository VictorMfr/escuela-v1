import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales/esES';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Tooltip, Button, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { useDirectors } from "../../context/DirectorContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const RegisterGrades = () => {
  const navigate = useNavigate();
  const { addGrades } = useDirectors();

  const [tableRows, setTableRows] = useState([]);
  const [gradeSelect, setGradeSelect] = useState("1");

  const changeGradeSelectHandler = (event) => {
    setGradeSelect(event.target.value);
  }

  const addRow = () => {
    const gradeValue = gradeSelect;
    const found = tableRows.find((e) => e.grado === gradeValue);

    if (found) {
      Swal.fire("Atención", "El valor ya se encuentra registrado", "warning")
        .then(() => {
          // Handle duplicates
        });
    } else {
      const row = {
        id: uuidv4(),
        grado: gradeValue
      };

      const newTable = [...tableRows, row];
      setTableRows(newTable);
    }
  };

  const deleteRow = (id) => {
    const newTable = tableRows.filter((e) => e.id !== id);
    setTableRows(newTable);
  }

  const saveGrades = async () => {
    const grados = tableRows.map((row) => ({ grado: parseInt(row.grado) }));

    if (grados.length === 0) {
      Swal.fire("Atención", "Ingrese al menos 1 grado a procesar", "warning")
        .then(() => {
          // Handle missing grades
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
          const resp = await addGrades(grados);
          Swal.fire(resp.title, resp.text, resp.type).then((res) => {
            if (res.isConfirmed && resp.type === "success") navigate("/");
          });
        }
      });
    }
  }

  const tableCols = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "grado", headerName: "Grado", width: 130 },
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
    <div className="list" style={{display: "flex"}}>
      <Sidebar />
      <div className="listContainer" style={{width: "100%"}}>
        <Navbar />
        <div className="gradeSelect">
          <span className="title">AGREGAR GRADO</span>
          <Select
            labelId="grade-label"
            id="grade-label"
            value={gradeSelect}
            onChange={changeGradeSelectHandler}
            required
            size="small"
            variant="filled"
            style={{width: 300}}
          >
            <MenuItem value={"1"}>Primer Grado</MenuItem>
            <MenuItem value={"2"}>Segundo Grado</MenuItem>
            <MenuItem value={"3"}>Tercer Grado</MenuItem>
            <MenuItem value={"4"}>Cuarto Grado</MenuItem>
            <MenuItem value={"5"}>Quinto Grado</MenuItem>
            <MenuItem value={"6"}>Sexto Grado</MenuItem>
          </Select>
          <br/>
          <button className="link" onClick={addRow}>
            Agregar Grado
          </button>
        </div>
        <div className="datatable">
          <div className="datatableTitle"  style={{width: 625, margin: "0 auto", marginTop: 21, marginBottom: 21}}>
            Grados a Procesar
            <Button variant="outlined" onClick={saveGrades}>
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

export default RegisterGrades;