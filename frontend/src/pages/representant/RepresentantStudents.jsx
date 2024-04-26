import "./representant_students.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/DataTable";
import { useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import { Tooltip } from "@mui/material";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { Link, Navigate, useParams } from "react-router-dom";

const RepresentantStudents = () => {
  const { id } = useParams();
  const { getStudentsByRepresentant, students } = useStudents();

  const tableCols = [
    { field: "cedula_escolar", headerName: "Cédula Escolar", width: 130 },
    { field: "nombres", headerName: "Nombres", width: 150 },
    { field: "apellidos", headerName: "Apellidos", width: 150 },
    { field: "grado", headerName: "Grado", width: 100 },
    { field: "seccion", headerName: "Sección", width: 100 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Opciones",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <Navigate
              to={`/hola/hey`}
              className="viewButton"
            >
              <Tooltip title="Boletín">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Navigate>

            <Link
              to={`informe`}
              className="viewButton"
            >
              <Tooltip title="Informe Descriptivo">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>

            <Link
              to={`constancia`}
              className="viewButton"
            >
              <Tooltip title="Constancia">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getStudentsByRepresentant(id)
  }, []);

  return (
    <div className="list">
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
  );
};

export default RepresentantStudents;