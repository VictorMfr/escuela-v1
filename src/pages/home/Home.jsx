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

const Home = () => {
  const { teachers, getTeachers } = useTeachers();
  const { students, getStudents } = useStudents();
  const { users, getUsers } = useUsers();
  const { addPeriod, period } = useDirectors();

  let new_period = null;

  useEffect(() => {
    getTeachers();
    getStudents();
    getUsers();
  }, []);

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
      const res = await addPeriod(data);
    }
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" amount={users.length ?? 0} />
          <Widget type="teacher" amount={teachers.length ?? 0} />
          <Widget type="student" amount={students.length ?? 0} />
        </div>
        <div className="listContainer">
          <div className="listTitle">
            Periodo Escolar Actual: <b>{period.periodo}</b>
          </div>
          <div className="listTitle">
            Fecha Inicio: <b>{period.fechaInicio}</b>
          </div>
          <div className="listTitle">
            Fecha Culminación: <b>{period.fechaCulminacion}</b>
          </div>
          <button type="button" onClick={_addPeriod} className="addButton">
            Periodo Escolar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
