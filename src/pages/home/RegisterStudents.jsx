import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Autocomplete, Button, InputLabel, TextField, Tooltip, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales/esES';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import { useDirectors } from "../../context/DirectorContext";
import { useNavigate } from "react-router-dom";
import { useStudents } from '../../context/StudentsContext'
import { useEffect } from "react";

export const RegisterStudents = () => {

  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([])
  const [selected, setSelected] = useState(null);
  const { addStudents } = useDirectors();
  const { students, getStudentsList } = useStudents();
  const tableCols = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "student", headerName: "Estudiante", width: 250 },
    { field: "cedula_escolar", headerName: "Cédula Escolar", width: 200 },
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

  const addRow = () => {
    const input = document.getElementById('student')
    const found = tableRows.find((e) => e.id === selected.id);

    if (found) {
      Swal.fire("Atención", "El valor ya se encuentra registrado", "warning")
        .then(() => {
          input.focus();
        })
      return;
    }
    const row = {
      id: selected.id,
      student: selected.label,
      cedula_escolar: selected.cedula_escolar,
    }
    const newTable = tableRows.concat(row);
    setTableRows(newTable);
  };

  const deleteRow = (id) => {
    const newTable = tableRows.filter((e) => {
      return e.id !== id;
    })
    setTableRows(newTable);
  }

  const saveGrades = async () => {
    const data = tableRows
    const grade = document.getElementById("grade")
    const section = document.getElementById("section")
    if (!grade.value) {
      Swal.fire("Atención", "Indique el grado a registrar", "warning")
        .then(() => {
          grade.focus();
        })
    } else if (!section.value) {
      Swal.fire("Atención", "Indique la sección a registrar", "warning")
        .then(() => {
          section.focus();
        })
    } else if (data.length <= 0) {
      Swal.fire("Atención", "Ingrese al menos 1 estudiante a procesasr", "warning")
        .then(() => {
          document.getElementById("student").focus()
        })
    } else {
      console.log(grade.value, section.value, data)
      Swal.fire({
        title: 'Confirmar.',
        text: "Confirme realizar el proceso.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Procesar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await addStudents(grade.value, section.value, data);
          Swal.fire(resp.title, resp.text, resp.type).then((res) => {
            if (res.isConfirmed && resp.type === "success") navigate("/")
          });
        }
      })
    }
  }

  useEffect(() => {
    getStudentsList();
  }, [])

  return (
    <div className="list" style={{ display: "flex" }}>
      <Sidebar />
      <div className="listContainer" style={{ width: "100%" }}>
        <Navbar />
        <br /><br />
        <div className="listContainer" >
          <div className="widgets" style={{ display: "flex", gap: 5, justifyContent: "center" }}>
            <div className="left">
              <span className="title">SELECCIONE ESTUDIANTE</span>
              <Autocomplete
                disablePortal
                id="student"
                options={students}
                onChange={(e, value) => setSelected(value)}
                sx={{ width: 300 }}
                renderInput={(params) => {
                  return <TextField {...params} label="Estudiante" variant="filled" size="small" />
                }}
              />
            </div>
            <div>
              <p className="title">INDIQUE EL GRADO</p>
              <TextField
                type="number"
                step="1"
                min="1"
                id="grade"
                label="Ingrese el grado"
                variant="filled"
                required
                size="small"
              />
            </div>

            <div>
              <p className="title">INDIQUE LA SECCION</p>
              <TextField
                type="String"
                step="1"
                min="1"
                id="section"
                label="Ingrese la sección (Ej. 'a' o 'A')"
                variant="filled"
                required
                size="small"
              />
            </div>



          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }} >
          <button style={{ backgroundColor: "rebeccapurple", padding: 10, outline: "none", border: "none", color: "white", marginTop: 21 }} onClick={addRow}>
            Agregar a la lista
          </button>
        </div>

        <div className="datatable">
          <div className="datatableTitle" style={{ display: "flex", justifyContent: "space-around" }}>
            <p>Estudiantes a Procesar</p>
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
              // Hide columns status and traderName, the other columns will remain visible
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
            checkboxSelection
            disableRowSelectionOnClick
          // getRowId={(row) => row._id}
          />
        </div>
      </div>
    </div>
  );
};
