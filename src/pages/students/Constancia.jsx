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
import { useStudents } from "../../context/StudentsContext";

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

const Constancia = () => {
  
  const { studentDynamicReport, getStudentProof } = useStudents();
  const { id } = useParams();

  useEffect(() => {
    getStudentProof(id);
  }, []);

  const data = studentDynamicReport ? studentDynamicReport.datosConstancia : "";


  const approvedQualifications = ["A", "B", "C", "D"];

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

export default Constancia;
