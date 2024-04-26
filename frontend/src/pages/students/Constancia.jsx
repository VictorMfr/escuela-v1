import logo from "../../assets/logo_escuela.png";
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import { useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import { useParams, useNavigate } from "react-router-dom";
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
    fontSize: 14,
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
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
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
    flexDirection: "row",
    borderBottom: "1px solid #000",
  },
  tableCell: {
    padding: 5,
  },
  tableHeaderCell: {
    backgroundColor: "#dcdcdc",
    fontWeight: "bold",
  },
});

const Constancia = () => {
  const { studentDynamicReport, getStudentProof, IsDynamicReportLoading } = useStudents();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const checkIfData = async () => {
      const dataRequest = await getStudentProof(id);

      if (!dataRequest) {
        Swal.fire("Atención", "No hay datos cargados, espera a que el docente lo cargue", "warning").then(() => navigate(-1))
      }
    }

    checkIfData()
  }, []);

  

  const data = studentDynamicReport ? studentDynamicReport.datosConstancia : "";

  
  return (
    <PDFViewer style={{ width: "99%", height: "99vh" }}>
      {data && data.grado && (
        <Document>
          <Page size="Letter" style={styles.page}>
            <View style={styles.title}>
              <Image src={logo} style={styles.logo} />
              <Text>República Bolivariana de Venezuela</Text>
              <Text>Ministerio del Poder Popular para la Educación</Text>
              <Text>E.B. República del Uruguay</Text>
              <Text style={styles.heading}>CONSTANCIA DE ESTUDIOS</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.bodyText}>
                La Institución E.B. República del Uruguay, por medio de la presente, certificamos que el/la estudiante {data.nombres} {data.apellidos}, de cédula escolar {data.cedula_escolar}. Está actualmente inscrito/a y cursando el año académico {data.periodoEscolar} en nuestro plantel educativo.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.bodyText}>
                Esta constancia se emite a solicitud del interesado y tiene validez a partir de la fecha de emisión ({new Date().getDay()}/{new Date().getDate()}/{new Date().getFullYear()}). El estudiante mencionado ha cumplido con los requisitos de asistencia y desempeño académico establecidos por nuestra institución.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.bodyText}>
                Cualquier consulta o aclaración adicional puede ser dirigida a nuestra oficina administrativa a la dirección antes mencionada o al número de teléfono {data.telefono}.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={{ ...styles.bodyText, marginTop: 30, marginBottom: 30 }}>
                Atentamente, el Director/a {data.director}
              </Text>
              <Text style={{ ...styles.bodyText, marginTop: 30, textAlign: "center" }}>
                ____________________________
              </Text>
              <Text style={{ ...styles.bodyText, marginTop: 30, marginBottom: 30, textAlign: "center" }}>
                Firma del Director
              </Text>
              <Text style={{ ...styles.bodyText, marginTop: 40, marginBottom: 30 }}>
                Fecha de Emisión: {new Date().getDate()}/{new Date().getMonth() + 1}/{new Date().getFullYear()}
              </Text>
            </View>
          </Page>
        </Document>
      )}
    </PDFViewer>
  );
};

export default Constancia;
