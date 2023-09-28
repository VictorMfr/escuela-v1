import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import { useTeachers } from "../../context/TeachersContext";
import { useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import { useUsers } from "../../context/UsersContext";
import Swal from "sweetalert2";
import { useDirectors } from "../../context/DirectorContext";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { teachers, getTeachers } = useTeachers();
  const { students, getStudents } = useStudents();
  const { users, getUsers } = useUsers();
  const { addPeriod, addLapse, addGrades, addSection } = useDirectors();
  const { userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getTeachers();
    getStudents();
    getUsers();
  }, []);

  console.log()

  const _addPeriod = async () => {
    const { value: data } = await Swal.fire({
      title: "Ingrese el periodo escolar:",
      html:
        '<label>Periodo: </label><input type="text" id="periodo" class="swal2-input"><br>' +
        '<label>Fecha Inicio: </label><input type="date" id="fecha_inicio" class="swal2-input"><br>' +
        '<label>Fecha Fin: </label><input type="date" id="fecha_fin" class="swal2-input">',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Procesar",
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
      Swal.fire(resp.title, resp.text, resp.type);
    }
  };

  const _addLapse = async () => {
    const { value: data } = await Swal.fire({
      title: "Ingrese los datos solicitados:",
      html:
        '<label>Lapso: </label><input type="number" step="1" min="1" id="lapso" class="swal2-input"><br>' +
        '<label>Proyecto: </label><textarea id="proyecto_escolar" class="swal2-textarea"></textarea>',
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          lapso: document.getElementById("lapso").value,
          proyectoEscolar: document.getElementById("proyecto_escolar").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await addLapse(data);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  }

  const _addGrade = async () => {
    const { value: data } = await Swal.fire({
      title: 'Ingrese los datos solicitados:',
      html:
        `<label>Lapso: </label><input type="number" id="lapse" step="1" min="1" class="swal2-input" required/>
        <label>Grado: </label><input type="number" id="grade" step="1" min="1" class="swal2-input" required/>`,
      showCancelButton: true,
      confirmButtonText: 'Procesar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          lapse: document.getElementById("lapse").value,
          grade: document.getElementById("grade").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
    
    if (data) {
      const resp = await addGrades(data.lapse, [{grado: data.grade}]);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  }

  const _addSection = async () => {
    const { value: data } = await Swal.fire({
      title: 'Ingrese los datos solicitados:',
      html:
        `<label>Lapso: </label><input type="number" id="lapse" step="1" min="1" class="swal2-input" required/>
        <label>Grado: </label><input type="number" id="grade" step="1" min="1" class="swal2-input" required/>
        <label>Sección: </label><input type="text" id="section" class="swal2-input" required/>`,
      showCancelButton: true,
      confirmButtonText: 'Procesar',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          lapse: document.getElementById("lapse").value,
          grade: document.getElementById("grade").value,
          section: [
            { seccion: document.getElementById("section").value }
          ],
        };
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
    
    if (data) {
      const resp = await addSection(data.lapse, data.grade, data.section);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          
          {
            (userType === "director") && (
              <>
                <Widget type="user" amount={users.length ?? 0} />
                
              </>
            )
          }
          {
            (userType === "director" || userType === "administrador") && (
              <>
                <Widget type="teacher" amount={teachers.length ?? 0} />
              </>)
          }
          <Widget type="student" amount={students.length ?? 0} />
        </div>
        {
          (userType === "director") && (
            <div className="listContainer">
              <div className="listTitle">Panel de Control.</div>
              <div className="widgets">
                <Widget type="period" amount="" onclick={_addPeriod} />
                <Widget type="lapse" amount="" onclick={_addLapse} />
                <Widget type="grade" amount="" onclick={() => navigate("/grades/register")} />
                <Widget type="section" amount="" onclick={() => navigate("/sections/register")}/>
                <Widget type="students" amount="" onclick={() => navigate("/students/register")}/>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Home;
