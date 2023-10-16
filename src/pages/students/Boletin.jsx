import logo from "../../assets/logo_escuela.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import { useParams } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: "auto",
    margin: "0 auto",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    textDecoration: "underline",
  },
  bodyText: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const Boletin = () => {
  const { studentDynamicReport, getStudentBulletin } = useStudents();
  const { id } = useParams();

  useEffect(() => {
    getStudentBulletin(id);
  }, []);

  const approvedQualifications = ["A", "B", "C", "D"];

  const data = studentDynamicReport ? studentDynamicReport.datosBoletin : "";

  return (
    <PDFViewer style={{ width: "99%", height: "98vh" }}>
      {data && <Document>
        <Page size="Letter" style={styles.page}>
          <View style={styles.title}>
            <Image src={logo} style={styles.logo} />
            <Text>República Bolivariana de Venezuela</Text>
            <Text>Ministerio del Poder Popular para la Educación</Text>
            <Text>E.B. República del Uruguay</Text>
            <Text style={styles.heading}>INFORMACIÓN AL REPRESENTANTE</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.bodyText}>Alumno: {data.nombres} {data.apellidos}</Text>
            <Text style={styles.bodyText}>Grado y Sección: {data.grado} {data.seccion}</Text>
            <Text style={styles.bodyText}>Representante: {data.representante}</Text>
            <Text style={styles.bodyText}>Dirección: {data.direccion}</Text>
            <Text style={styles.bodyText}>Cédula Escolar: {data.cedula_escolar}</Text>
            <Text style={styles.bodyText}>Año Escolar: {data.periodoEscolar}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.bodyText}>
              El alumno {data.nombres} {data.apellidos}, natural de {data.direccion}, cursante de educación básica,
              ha sido {approvedQualifications.includes(data.literal_calificativo_final)
                ? `aprobado con literal calificativo ${data.literal_calificativo_final}`
                : `reprobado con literal calificativo ${data.literal_calificativo_final}`}
            </Text>
            <Text style={styles.bodyText}>
              Docente de Grado: {data.docente}
            </Text>
            <Text style={styles.bodyText}>
              Director: {data.director}
            </Text>
          </View>
        </Page>
      </Document>}
    </PDFViewer>
  );
};

export default Boletin;
