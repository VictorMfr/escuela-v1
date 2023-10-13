// import logo from "../../assets/logo_escuela.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import axios from "../../api/axios";
import { getStudentDescriptiveReportRequest } from "../../api/students";
import Swal from "sweetalert2";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { PDFViewer } from "@react-pdf/renderer";
import { useAuth } from "../../context/AuthProvider";
import { usePeriod } from "../../context/PeriodContext";
import { useTeachers } from "../../context/TeachersContext";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  title: {
    display: "flex",
    alignContent: "left",
    textAlign: "center",
    padding: "25px 0px 0px 10px",
    fontSize: "16pt",
  },
  logo: {
    height: "auto",
    width: "70px",
    alignSelf: "center",
    paddingTop: "15px",
  },
  body: {
    display: "flex",
    alignContent: "flex-start",
    margin: 10,
    padding: 10,
  },
  bodyText: {
    padding: "5px",
  },
});

const Informe = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [student, setStudent] = useState();
  const { period, getPeriod } = usePeriod();
  const {teachers, getTeachers} = useTeachers() 

  const getStudent = async () => {
    try {
      const laspeRequest = await axios.get("/direccion/lapsoActual", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      // Ir haciendo una busqueda para encontrar la cedula del estudiante en Periodo
      const foundGrade = laspeRequest.data.grados.find(grado => {
        return grado.secciones.find(sec => {
          return sec.estudiantes.find(est => {
            return est._id == id;
          })
        })
      })

      const foundSection = foundGrade.secciones.find(sec => {
        return sec.estudiantes.find(est => {
          return est._id == id;
        })
      })

      const foundStudent = foundSection.estudiantes.find(est => {
        return est._id == id;
      });

      

      setStudent({ student: foundStudent, lapseProject: laspeRequest.data.proyectoEscolar, teacher: foundSection.docente })

    } catch (error) {
      Swal.fire(
        'Error al cargar los datos.',
        error.message,
        'error'
      )
      console.log(error)

    }
  };

  useEffect(() => {
    getStudent();
    getPeriod();
    getTeachers();
  }, [])


  return (
    <PDFViewer style={{ width: "99%", height: "98vh" }}>
      <Document>
        <Page size="Letter" style={styles.page}>
          <View style={styles.title}>
            <Text>Proyecto: {student? student.lapseProject: ""}</Text>
            <Text>Año escolar: {period? period.periodo: ""}</Text>
            <Text>Alumno: {student? student.student.nombre: ""} {student? student.student.apellido: ""}</Text>
            <Text
              style={{
                paddingTop: "15px",
                fontWeight: "bold",
                textDecoration: "underline",
                textAlign: "left",
              }}
            >
              INFORME DESCRIPTIVO
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              {student? student.student.informe_descriptivo: ""}
            </Text>
            <Text style={styles.bodyText}>
              Docente de Grado: ________
              Director: ___________
              Representante: ___________
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Informe;
