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
import { useParams, useNavigate } from "react-router-dom"
import { PDFViewer } from "@react-pdf/renderer";
import { useAuth } from "../../context/AuthProvider";
import { usePeriod } from "../../context/PeriodContext";
import { useTeachers } from "../../context/TeachersContext";
import { useStudents } from "../../context/StudentsContext";
import logo from "../../assets/logo_escuela.png";

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

const Informe = () => {

  const { studentDynamicReport, getStudentReport } = useStudents();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getStudentReport(id);
  }, []);

  const data = studentDynamicReport ? studentDynamicReport.datosInforme : "";

  if (studentDynamicReport && !studentDynamicReport.datosConstancia && !studentDynamicReport.datosBoletin) {
    if (!studentDynamicReport.datosInforme || !data.informe_descriptivo) {
      Swal.fire("Atención", "El Estudiante no tiene un boletin cargado todavía", "warning").then(() => {
        navigate(-1)
      });
    }
  }

  setTimeout(() => {
    if (!data){
      Swal.fire("Atención", "No hay informe cargado, espera a que el docente lo cargue", "warning").then(() => navigate(-1))
    }
  }, 2000)

  return (
    <>
      <PDFViewer style={{ width: "99%", height: "98vh" }}>
        {data && data.informe_descriptivo && <Document>
          <Page size="Letter" style={styles.page}>

            <View style={styles.title}><Image src={logo} style={styles.logo} /></View>

            <View style={styles.title}>
              <Text>República Bolivariana de Venezuela</Text>
              <Text>Ministerio del Poder Popular para la Educación</Text>
              <Text>Inst. República del Urugay</Text>
            </View>

            <View style={{marginBottom: 40}}>
              <Text style={styles.title}>Informe Descriptivo</Text>
              <Text style={styles.subtitle}>Período escolar: {data.periodoEscolar}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.bodyText}>Nombre del Estudiante: {data.nombres} {data.apellidos}</Text>
              <Text style={styles.bodyText}>Grado y Sección: {data.grado} {data.seccion.toUpperCase()}</Text>
              <Text style={styles.bodyText}>Fecha de Emisión: {new Date().getDay()}/{new Date().getDate()}/{new Date().getFullYear()}</Text>
              <Text style={styles.bodyText}>Docente de Grado: {data.docente}</Text>
              <Text style={styles.bodyText}>Director: {data.director}</Text>
            </View>

            

            <View style={{...styles.body, marginTop: 30, marginBottom: 30}}>
              <Text style={styles.bodyText}>
                {data.informe_descriptivo}
              </Text>
            </View>
          </Page>
        </Document>}
      </PDFViewer>
    </>
  );
};

export default Informe;