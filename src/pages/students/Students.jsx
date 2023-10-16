import "./students.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/DataTable";
import { useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import { Tooltip } from "@mui/material";
import HourglassDisabledOutlinedIcon from "@mui/icons-material/HourglassDisabledOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Students = () => {
  const { user, userType } = useAuth();
  const {
    getStudents,
    getStudentsByTeacher,
    getStudentsByRepresentant,
    students,
    assignSection,
    removeSection,
    informeDescriptivo,
    rasgosPersonales,
    calificativoFinal
  } = useStudents();

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: "cedula_escolar", headerName: "Cédula Escolar", width: 130 },
    { field: "nombres", headerName: "Nombres", width: 150 },
    { field: "apellidos", headerName: "Apellidos", width: 150 },
    { field: "grado", headerName: "Grado", width: 100 },
    { field: "seccion", headerName: "Sección", width: 100 },
    //{ field: "año_escolar", headerName: "Año Escolar", width: 100 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Opciones",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            {(userType == "director" || userType == "administrador") && (
              <>
                <div
                  className="viewButton"
                  onClick={() =>
                    _assignSection(
                      params.row.id_representante,
                      params.row._id,
                      params.row.seccion === "ninguno" ? "" : params.row.seccion
                    )
                  }
                >
                  <Tooltip title="Cambiar Sección">
                    <HourglassEmptyOutlinedIcon />
                  </Tooltip>
                </div>
                {params.row.seccion !== "ninguno" && (
                  <div
                    className="deleteButton"
                    onClick={() =>
                      _removeSection(
                        params.row.id_representante,
                        params.row._id
                      )
                    }
                  >
                    <Tooltip title="Remover Sección">
                      <HourglassDisabledOutlinedIcon />
                    </Tooltip>
                  </div>
                )}
                <Link
                  to={`/students/${params.row._id}/representants/${params.row.id_representante}`}
                  className="viewButton"
                >
                  <Tooltip title="Modificar">
                    <EditOutlinedIcon />
                  </Tooltip>
                </Link>
              </>
            )}

            {userType === "profesor" && (
              <>
                <div
                  className="viewButton"
                  onClick={() => _informeDescriptivo(params.row)}
                >
                  <Tooltip title="Añadir Informe Descriptivo">
                    <BookOutlinedIcon />
                  </Tooltip>
                </div>

                <div
                  className="viewButton"
                  onClick={() => _rasgosPersonales(params.row)}
                >
                  <Tooltip title="Establecer Rasgos Personales">
                    <LocalLibraryOutlinedIcon />
                  </Tooltip>
                </div>

                <div
                  className="viewButton"
                  onClick={() =>
                    _calificativoFinal(params.row)
                  }
                >
                  <Tooltip title="Registrar Calificativo Final">
                    <BookOutlinedIcon />
                  </Tooltip>
                </div>
              </>
            )}

            <Link
              to={`${params.row._id}/boletin`}
              className="viewButton"
            >
              <Tooltip title="Boletín">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>

            <Link
              to={`${params.row._id}/informe`}
              className="viewButton"
            >
              <Tooltip title="Informe Descriptivo">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>

            <Link
              to={`${params.row._id}/constancia`}
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

  const _calificativoFinal = async (student) => {
    const { value: data } = await Swal.fire({
      title: "Cargar Informe Descriptivo",
      html: `<label class="bold">Estudiante: </label><span>${student.nombres} ${student.apellidos}</span><hr>
      <br/>
      <select name="qualification" style="padding: 8px" id="qualification">
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
    <option value="E">E</option>
    </select>
`,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          literal_calificativo_final: document.getElementById("qualification").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await calificativoFinal(student._id, data);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  }

  const _informeDescriptivo = async (student) => {
    const { value: data } = await Swal.fire({
      title: "Cargar Informe Descriptivo",
      html: `<label class="bold">Estudiante: </label><span>${student.nombres} ${student.apellidos}</span>
      <hr>
      <textarea id="description" class="swal2-textarea" placeholder="Añade una descripción informativa del estudiante" cols="27">`,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          descripcion: document.getElementById("description").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await informeDescriptivo(student._id, data);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  };

  const rasgo = (NombreRasgo, idRasgo) => {
    return `<div style="display: flex; justify-content: space-between; padding: 0 80px">
    <small style="display: block"><strong>${NombreRasgo}:</strong></small>
    <label for="${idRasgo}_verdadero"></label>
    <input style="align-text: start" type="checkbox" id="${idRasgo}_verdadero" value="false" name="${NombreRasgo.toLowerCase()}" onclick="this.value = this.checked ? true : false">
  </div>

    `
  }

  const _rasgosPersonales = async (student) => {
    const { value: data } = await Swal.fire({
      title: "Cargar Rasgos Personales",
      html: `<label class="bold">Estudiante: </label><span>${student.nombres} ${student.apellidos}</span>
      <hr>
      <br/>

      ${rasgo("Motivación", "motivacion")}
      ${rasgo("Responsabilidad", "responsabilidad")}
      ${rasgo("Organizacion", "organizacion")}
      ${rasgo("Disciplina", "disciplina")}
      ${rasgo("Empatia", "empatia")}
      ${rasgo("Adaptabilidad", "adaptabilidad")}
      ${rasgo("Creatividad", "creatividad")}
      ${rasgo("Trabajo en Equipo", "trabajo_en_equipo")}
      ${rasgo("Honestidad", "honestidad")}
      ${rasgo("Autodirección", "autodireccion")}
      ${rasgo("Resiliencia", "resiliencia")}
      ${rasgo("Paciencia", "paciencia")}
      ${rasgo("Pensamiento Crítico", "pensamiento_critico")}
      ${rasgo("Tolerancia a la Frustración", "tolerancia_frustracion")}
      ${rasgo("Ambición", "ambicion")}
      <br/>
      <hr/>
      `
      ,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const rasgos = {
          motivacion: document.getElementById("motivacion_verdadero").value,
          responsabilidad: document.getElementById("responsabilidad_verdadero").value,
          organizacion: document.getElementById("organizacion_verdadero").value,
          disciplina: document.getElementById("disciplina_verdadero").value,
          empatia: document.getElementById("empatia_verdadero").value,
          adaptabilidad: document.getElementById("adaptabilidad_verdadero").value,
          creatividad: document.getElementById("creatividad_verdadero").value,
          trabajo_en_equipo: document.getElementById("trabajo_en_equipo_verdadero").value,
          honestidad: document.getElementById("honestidad_verdadero").value,
          autodireccion: document.getElementById("autodireccion_verdadero").value,
          resiliencia: document.getElementById("resiliencia_verdadero").value,
          paciencia: document.getElementById("paciencia_verdadero").value,
          pensamiento_critico: document.getElementById("pensamiento_critico_verdadero").value,
          tolerancia_frustracion: document.getElementById("tolerancia_frustracion_verdadero").value,
          ambicion: document.getElementById("ambicion_verdadero").value,
        }
        return {
          rasgos
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await rasgosPersonales(student._id, data);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  };

  const _assignSection = (id_rep, id_est, current) => {
    Swal.fire({
      title: "Ingrese la sección",
      input: "text",
      inputValue: current,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        return await assignSection(id_rep, id_est, data);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result === true) {
        Swal.close();
      }
    });
  };

  const _removeSection = (id_rep, id_est) => {
    Swal.fire({
      title: "Confirmar acción",
      text: "Confirme remover la sección del registro seleccionado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSection(id_rep, id_est);
      }
    });
  };

  useEffect(() => {
    if (userType == "profesor") {
      getStudentsByTeacher();
    } else if (userType == "representante") {
      getStudentsByRepresentant();
    } else {
      getStudents();
    }
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title={userType == "representante"? "Hijos": "Estudiantes"}
          tableCols={tableCols}
          tableRows={students}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  );
};

export default Students;
