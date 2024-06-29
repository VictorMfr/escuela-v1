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
import React from "react"
import { usePersonalTraits } from "../../context/PersonalTraitsContext";

const Students = () => {
  const { userType } = useAuth();
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

  const { personalTraits, getPersonalTraits } = usePersonalTraits();

  const isStaticTable = (students[0] && students[0].static)

  let tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: "cedula_escolar", headerName: "Cédula Escolar", width: 130 },
    { field: "nombres", headerName: "Nombres", width: 150 },
    { field: "apellidos", headerName: "Apellidos", width: 150 },
    //{ field: "año_escolar", headerName: "Año Escolar", width: 100 },
  ];

  if (!isStaticTable) {
    tableCols = tableCols.concat({ field: "grado", headerName: "Grado", width: 100 },
      { field: "seccion", headerName: "Sección", width: 100 })
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Opciones",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            {(userType == "director" || userType == "administrador") && (
              <>
                {params.row.seccion && <div
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
                </div>}
                {params.row.seccion && (
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

            {!isStaticTable && <Link
              to={`${params.row._id}/boletin`}
              className="viewButton"
            >
              <Tooltip title="Boletín">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>}

            {!isStaticTable && <Link
              to={`${params.row._id}/informe`}
              className="viewButton"
            >
              <Tooltip title="Informe Descriptivo">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>}

            {!isStaticTable && <Link
              to={`${params.row._id}/constancia`}
              className="viewButton"
            >
              <Tooltip title="Constancia">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>}

            {!isStaticTable && <Link
              to={`${params.row._id}/rasgos`}
              className="viewButton"
            >
              <Tooltip title="Rasgos Personales">
                <SummarizeOutlinedIcon />
              </Tooltip>
            </Link>}
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
    <small style="display: block"><strong>${NombreRasgo ? NombreRasgo : ""}:</strong></small>
    <label for="${idRasgo}_verdadero"></label>
    <input style="align-text: start" type="checkbox" id="${idRasgo}_verdadero" value="false" name="${NombreRasgo ? NombreRasgo.toLowerCase() : ""}" onclick="this.value = this.checked ? true : false">
    </div>
    `
  }

  const _rasgosPersonales = async (student) => {
    let htmlString = `<label class="bold">Estudiante: </label><span>${student.nombres} ${student.apellidos}</span>
      <hr><br/>`;

    personalTraits.forEach(trait => {
      htmlString += rasgo(trait.name, trait.name.toLowerCase());
    });

    htmlString += `<br/><hr/>`;

    const { value: data } = await Swal.fire({
      title: "Cargar Rasgos Personales",
      html: htmlString,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const rasgos = {};
        personalTraits.forEach(trait => {
          rasgos[trait.name.toLowerCase()] = document.getElementById(`${trait.name.toLowerCase()}_verdadero`).value;
        });
        return { rasgos };
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
      inputValue: current,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      showLoaderOnConfirm: true,

      html: `
      <select default="a" id="seccion" required style="padding:15px; width: 285px; margin: 20.25px 40.25px 3px 40.25px; border: 1px solid #ddd; border-radius: 3px; font-size: 1.125rem; color: inherit">
        <option value="a">Sección A</option>
        <option value="b">Sección B</option>
        <option value="c">Sección C</option>
        <option value="d">Sección D</option>
        <option value="e">Sección E</option>
      </select>
      <br/>
      `,


      preConfirm: async () => {
        const data = document.getElementById("seccion").value;
        return await assignSection(id_rep, id_est, data);
      },

    }).then(() => {
      Swal.fire("Exito", "Se ha movido de sección exitosamente", "success").then(() => Swal.close());
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
        Swal.fire("Exito", "Se ha removido de sección exitosamente", "success").then(() => Swal.close());
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

    getPersonalTraits();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title={userType == "representante" ? "Hijos" : "Estudiantes"}
          tableCols={tableCols}
          tableRows={students}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  );
};

export default Students;
