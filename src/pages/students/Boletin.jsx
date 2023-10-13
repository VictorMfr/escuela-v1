import logo from "../../assets/logo_escuela.png";
import axios from "../../api/axios";
import { useAuth } from "../../context/AuthProvider"
import { useParams } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { getStudentNotesRequest } from "../../api/students";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
  },
  title: {
    display: "flex",
    alignContent: "center",
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

const Boletin = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [student, setStudent] = useState();




  const getStudent = async () => {
    try {
      // Tomar la cedula de periodo para saber buscar en la tabla estatica
      // Ver los datos del lapso
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
        return est._id == id
      });

      // Finalmente tomar la cedula del estudiante
      const student_cedula_escolar = foundStudent.cedula_escolar;

      // Ahora se debe buscar utilizando la cedula los datos del estudiante en la tabla estatica
      const studentsRequest = await axios.get("/direccion/estudiantes", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      // Haciendo la busqueda usando la cedula del estudiante
      const student = studentsRequest.data.find(est => {
        return est.cedula_escolar == student_cedula_escolar;
      })

      // Ahora hay que buscar los datos del representante utilizando la id del representante
      const idRepresentante = student.id_representante;

      // Hacer la consulta
      const representante = await axios.get(`/representantes/${idRepresentante}`,  {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });



      setStudent({student,  representante: representante.data.name})

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
  }, [])

  const approvedQualifications = ["A", "B", "C", "D"];

  return (
    <PDFViewer style={{ width: "99%", height: "98vh" }}>
      <Document>
        <Page size="Letter" style={styles.page}>
          <View style={styles.title}>
            <Text>República Bolivariana de Venezuela</Text>
            <Text>Ministerio del Poder Popular para la Educicación</Text>
            <Text>E.B. República del Uruguay</Text>
            <Text
              style={{
                paddingTop: "15px",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              INFORMACIÓN AL REPRESENTANTE
            </Text>
            <Image src={logo} style={styles.logo} />
          </View>

          <View style={styles.body}>
            <Text style={styles.bodyText}>Apellidos: {student ? student.student.apellidos : ""}</Text>
            <Text style={styles.bodyText}>Nombres: {student ? student.student.nombres : ""}</Text>
            <Text style={styles.bodyText}>Fecha de Nacimiento: {student ? student.student.fecha_de_nacimiento : ""}</Text>
            <Text style={styles.bodyText}>Edad: {student ? student.student.edad : ""}</Text>
            <Text style={styles.bodyText}>Grado y Sección: {student ? student.student.grado : ""} {student ? student.student.seccion.toUpperCase() : ""}</Text>
            <Text style={styles.bodyText}>Representante: {student? student.representante: ""}</Text>
            <Text style={styles.bodyText}>Dirección: {student ? student.student.direccion : ""}</Text>
            <Text style={styles.bodyText}>Cédula Escolar: {student ? student.student.cedula_escolar : ""}</Text>
            <Text style={styles.bodyText}>Año Escolar: {student ? student.student.año_escolar : ""}</Text>
          </View>
        </Page>
        <Page size="Letter" style={styles.page}>
          <View style={styles.body}>
            <Text style={styles.bodyText}>
              El Alumno {student ? student.student.nombres : ""} {student ? student.student.apellidos : ""}, Natural de {student ? student.student.direccion : ""} de {student ? student.student.edad : ""} años de edad, cursante de {student ? student.student.grado : ""} de educación básica
              ha sido {student ? (approvedQualifications.includes(student.student.literal_calificativo_final.toUpperCase()) ? `promovido al grado ${student.student.grado + 1}` : `reprobado en el grado ${student.student.grado}`) : ""} con el literal de {student ? student.student.literal_calificativo_final : ""}
            </Text>
            <Text style={styles.bodyText}>
              Docente de Grado: ______________,
              Director: ______________
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Boletin;
