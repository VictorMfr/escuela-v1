import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import { useTeachers } from "../../context/TeachersContext";
import { useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import Swal from "sweetalert2";
import { useDirectors } from "../../context/DirectorContext";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/UsersContext";
import { useRepresentants } from "../../context/RepresentantsContext";
import { usePeriod } from "../../context/PeriodContext";
import Person from "@mui/icons-material/Person"


const Home = () => {
  const { teachers, getTeachers } = useTeachers();
  const { students, getStudents } = useStudents();
  const { period, lapse, getPeriod, getLapse } = usePeriod();
  const { users, getUsers } = useUsers();
  const { representants, getRepresentants } = useRepresentants();
  const { addPeriod, addLapse} = useDirectors();
  const { userType } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    getTeachers();
    if (userType != "profesor" && userType !="representante") {
      getStudents();
    } 
    getUsers();
    getPeriod();
    getLapse();
    getRepresentants();
  }, []);

  const _addPeriod = async () => {
    const { value: data } = await Swal.fire({
      title: "Ingrese el periodo escolar:",
      html:
        '<label>Periodo: </label><input type="text" id="periodo" class="swal2-input"><br>' +
        '<label>Fecha Inicio: </label><input type="date" id="fecha_inicio" class="swal2-input"><br>' +
        '<label>Fecha Fin: </label><input type="date" id="fecha_fin" class="swal2-input">' +
        '<br/><br/><p class="alert">Esta acción es irreversible</p>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          periodo: document.getElementById("periodo").value,
          fechaInicio: document.getElementById("fecha_inicio").value,
          fechaCulminacion: document.getElementById("fecha_fin").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    

    if (data) {
      const resp = await addPeriod(data);
      Swal.fire(resp.title, resp.text, resp.type).then(() => {
        getPeriod()
      });
    }
  };

  const _addLapse = async () => {

    const { value: data } = await Swal.fire({
      title: "Ingrese los datos solicitados:",
      html:
        '<p>Nombre del Proyecto Escolar: </p><textarea id="proyecto_escolar" class="swal2-textarea"></textarea><p class="alert">Esta accion es irreversible</p>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm() {
        return {
          proyectoEscolar: document.getElementById("proyecto_escolar").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await addLapse(data);
      Swal.fire(resp.title, resp.text, resp.type).then(() => {
        getPeriod();
        getLapse();
      });
    }
  }


  

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        {userType === "director" && (
          <>
            <h3 className="htitle">ESTADISTICAS</h3>
            <div className="widgets">
              {
                (userType === "director" || userType === "administrador") && (
                  <>
                    <Widget type="teacher" amount={teachers.length ?? 0} />
                  </>)
              }
              <Widget type="student" amount={students.length ?? 0} />
              <Widget type="user" amount={users.length ?? 0} />
              <Widget type="representant" amount={representants.length ?? 0} />
            </div>
            <div className="widgets">
              <Widget type="periodData" amount={period ? period.lapsos : ""} onclick={_addLapse} />
            </div>
            {
              (userType === "director") && (

                <>
                  <h3 className="htitle">TIEMPO ACTUAL</h3>
                  <div className="widgets">
                    <Widget type="period" amount={period ? period.periodo : ""} onclick={_addPeriod} />
                    <Widget type="lapse" amount={lapse ? lapse.lapso : ""} onclick={_addLapse} />
                  </div>

                  <h3 className="htitle">PANEL DE CONTROL DE PERIODO ACTUAL</h3>
                  <div className="widgets">
                    <Widget type="grade" amount="" onclick={() => navigate("/grades/register")} />
                    <Widget type="section" amount="" onclick={() => navigate("/sections/register")} />
                    <Widget type="students" amount="" onclick={() => navigate("/students/register")} />
                  </div>
                </>
              )}
          </>)}
        {
          userType != "director" && (
            <div style={{ width: "100%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
              <p><Person style={{ fontSize: 58 }} /></p>
              <h4 style={{ fontWeight: "normal" }}>{`BIENVENIDO ${userType.toUpperCase()}`}</h4>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;
