import React, { useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_escuela.png";
import { useStudents } from "../../context/StudentsContext";
import Swal from "sweetalert2";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14
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
    marginTop: 30
  },
  bodyText: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: "table",
    width: "100%",
    borderCollapse: "collapse",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    border: "1px solid #000",
    padding: 5,
  },
  tableHeaderCell: {
    backgroundColor: "#dcdcdc",
  },
});

const Boletin = () => {
  const { studentDynamicReport, getStudentBulletin } = useStudents();
  const { id } = useParams();
  const navigate = useNavigate();

  const data = studentDynamicReport ? studentDynamicReport.datosBoletin : null;

  useEffect(() => {
    const checkIfData = async () => {
      const dataRequest = await getStudentBulletin(id);

      console.log(dataRequest)

      if (!dataRequest || !dataRequest.datosBoletin.literal_calificativo_final) {
        Swal.fire("Atención", "No hay datos cargados, espera a que el docente lo cargue", "warning").then(() => navigate(-1))
      }
    }

    checkIfData()
  }, []);


  return (
    <PDFViewer style={{ width: "99%", height: "98vh" }}>
      {data && data.literal_calificativo_final && (
        <Document>
          <Page size="Letter" style={styles.page}>
            <View style={styles.title}><Image src={logo} style={styles.logo} /></View>
            <View style={styles.title}>

              <Text>República Bolivariana de Venezuela</Text>
              <Text>Ministerio del Poder Popular para la Educación</Text>
              <Text>Inst. República del Urugay</Text>
            </View>

            <View style={{ marginBottom: 40 }}>
              <Text style={styles.title}>BOLETIN ACADÉMICO</Text>
              <Text style={styles.subtitle}>Período escolar: {data.periodoEscolar}</Text>
            </View>


            <View style={styles.section}>
              <Text style={styles.bodyText}>Nombre del Estudiante: {data.nombres} {data.apellidos}</Text>
              <Text style={styles.bodyText}>Grado y Sección: {data.grado} {data.seccion.toUpperCase()}</Text>
              <Text style={styles.bodyText}>Fecha de Emisión: {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</Text>
              <Text style={styles.bodyText}>Literal Calificativo Final: {data.literal_calificativo_final}</Text>
            </View>


            <Text style={styles.bodyText}>
              Este boletín de calificaciones refleja el desempeño de {data.nombres} {data.apellidos} durante el período escolar {data.periodoEscolar}. Si tiene alguna pregunta o necesita más información, no dude en ponerse en contacto con {data.docente} en {data.docente_email}.
            </Text>

            <Text style={styles.bodyText}>
              Agradecemos su compromiso con la educación de su hijo(a) y esperamos ver mejoras continuas en el próximo período escolar. Atentamente, el Director {data.director} de la Institución Educativa
            </Text>

            <View style={{ ...styles.section, marginTop: 40 }} >
              <Text style={styles.bodyText}>
                Firma del Profesor: ___________________________
              </Text>
            </View>
          </Page>
        </Document>
      )}
    </PDFViewer>
  );
};

export default Boletin;
