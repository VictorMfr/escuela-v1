import logo from "../../assets/logo_escuela.png";
import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, Image, PDFViewer } from "@react-pdf/renderer";
import { useEffect } from "react";
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
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30
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

const Rasgos = () => {
  const { studentDynamicReport, getStudentPersonalTraits } = useStudents();
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    const checkIfData = async () => {
      const dataRequest = await getStudentPersonalTraits(id);

      if (!dataRequest || dataRequest.datosRasgos.rasgos == {}) {
        Swal.fire("Atención", "No hay datos cargados, espera a que el docente lo cargue", "warning").then(() => navigate(-1))
      }
    }

    checkIfData()
  }, []);

  const data = studentDynamicReport ? studentDynamicReport.datosRasgos : "";

  let rasgosPositivos = [];
  let rasgosNegativos = [];


  if (data && data.rasgos) {
    Object.keys(data.rasgos).map(rasgo => {

      if (data.rasgos[rasgo]) {
        rasgo = rasgo.replace("_", " ")
        rasgo = rasgo.replace("_", " ")
        rasgosPositivos.push(rasgo)
      } else {
        rasgo = rasgo.replace("_", " ")
        rasgo = rasgo.replace("_", " ")
        rasgosNegativos.push(rasgo)
      }
    })
  }

  return (
    <PDFViewer style={{ width: "99%", height: "98vh" }}>
      {data && data.rasgos && (
        <Document>
          <Page size="Letter" style={styles.page}>
            <View style={styles.title}>
              <Image src={logo} style={styles.logo} />
              <Text>República Bolivariana de Venezuela</Text>
              <Text>Ministerio del Poder Popular para la Educación</Text>
              <Text>E.B. República del Uruguay</Text>
              <Text style={styles.heading}>INFORME DE RASGOS PERSONALES</Text>
            </View>

            <View style={styles.body}>
              <Text style={styles.bodyText}>Nombre del Estudiante: {data.nombres} {data.apellidos}</Text>
              <Text style={styles.bodyText}>Fecha del Informe: {new Date().getDay()}/{new Date().getDate()}/{new Date().getFullYear()}</Text>
            </View>

            <View style={{ ...styles.body, marginTop: 30 }}>
              <Text style={styles.bodyText}>RESUMEN GENERAL:</Text>
              <Text style={styles.bodyText}>
                El presente informe tiene como objetivo proporcionar una descripción de los rasgos personales y el comportamiento del estudiante {data.nombres} {data.apellidos}. Durante el período {data.periodoEscolar} lapso N° {data.lapso}, hemos observado y evaluado sus características personales, habilidades sociales, comportamiento y actitudes en diversas situaciones.
              </Text>
            </View>

            <View style={{ ...styles.body, marginBottom: 20 }}>
              <Text style={{ ...styles.bodyText, marginTop: 20 }}>ASPECTOS POSITIVOS:</Text>
              <Text style={{ ...styles.bodyText, marginBottom: 20 }}>El estudiante presenta una serie de rasgos personales positivos que merecen ser destacados. Entre ellos, se incluyen:</Text>
              {rasgosPositivos.map((rasgo, index) => <Text style={styles.bodyText}>{" "} {" "} {" "}{index + 1}._ {rasgo}</Text>)}
            </View>

            <View style={{ ...styles.body, marginBottom: 20 }}>
              <Text style={styles.bodyText}>ÁREAS DE MEJORA:</Text>
              <Text style={{ ...styles.bodyText, marginBottom: 20 }}>A pesar de los rasgos positivos, el estudiante también presenta áreas de mejora en su desarrollo personal. Estas áreas incluyen:</Text>
              {rasgosNegativos.map((rasgo, index) => <Text style={styles.bodyText}>{" "} {" "} {" "}{index + 1}._ {rasgo}</Text>)}
            </View>

            <View style={styles.body}>
              <Text style={styles.bodyText}>CONCLUSIONES Y RECOMENDACIONES:</Text>
              <Text style={styles.bodyText}>
                En resumen, el estudiante muestra rasgos personales positivos, como los mencionados anteriormente. Sin embargo, también existen áreas de mejora, como las detalladas. Se recomienda brindar apoyo y orientación continuos para su desarrollo personal y social.
              </Text>
              <Text style={styles.bodyText}>
                El equipo docente está comprometido en ayudar al estudiante a fortalecer sus rasgos positivos y abordar las áreas de mejora identificadas. Esperamos ver un crecimiento continuo en su desarrollo personal en el próximo período.
              </Text>
            </View>

            <View style={{ ...styles.body, marginTop: 20 }}>
              <Text style={styles.bodyText}>Firma del Docente: ________________________________</Text>
              <Text style={styles.bodyText}>Nombre del Docente: {data.docente}</Text>
              <Text style={styles.bodyText}>Fecha: {new Date().getDay()}/{new Date().getDate()}/{new Date().getFullYear()}</Text>
            </View>
          </Page>
        </Document>
      )}
    </PDFViewer>
  );
};

export default Rasgos;
