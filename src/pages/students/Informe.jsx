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
import { useStudents } from "../../context/StudentsContext";

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

  const { studentDynamicReport, getStudentReport } = useStudents();
  const { id } = useParams();

  useEffect(() => {
    getStudentReport(id);
  }, []);

  const data = studentDynamicReport ? studentDynamicReport.datosInforme : "";

  return (
    <PDFViewer style={{ width: "99%", height: "98vh" }}>
      {data && <Document>
        <Page size="Letter" style={styles.page}>
          <View style={styles.title}>
            <Text>Proyecto: {data.proyectoEscolar}</Text>
            <Text>Año escolar: {data.periodoEscolar}</Text>
            <Text>Alumno: {data.nombres} {data.apellidos}</Text>
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
              {data.informe_descriptivo}
            </Text>
            <Text style={styles.bodyText}>
              Docente de Grado: {data.docente}
              Director: {data.director}
              Representante: {data.representante}
            </Text>
          </View>
        </Page>
      </Document>}
    </PDFViewer>
  );
};

export default Informe;
