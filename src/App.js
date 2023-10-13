import React, { useContext, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserProvider } from "./context/UsersContext";
import { TeacherProvider } from "./context/TeachersContext";
import { StudentProvider } from "./context/StudentsContext";
import { RepresentantProvider } from "./context/RepresentantsContext";
import { PDFViewer } from "@react-pdf/renderer";
import { DirectorsProvider } from "./context/DirectorContext";
import { PeriodProvider } from "./context/PeriodContext";
import LoadingModal from "./pages/register/LoadingModal";
import LandingPage from "./pages/landing/Landing";

import { RegisterGrades } from "./pages/home/RegisterGrades";
import { RegisterSections } from "./pages/home/RegisterSections";
import { RegisterStudents } from "./pages/home/RegisterStudents";

import Boletin from "./pages/students/Boletin"
import Informe from "./pages/students/Informe"
import Constancia from "./pages/students/Constancia"
import Representant from "./pages/representant/Representants";
import RepresentantsForm from "./pages/representant/RepresentantsForm";

const LazyHome = React.lazy(() => import("./pages/home/Home"));
const LazyUsers = React.lazy(() => import("./pages/users/Users"));
const LazyCreateUser = React.lazy(() => import("./pages/users/CreateUser"));
const LazyEditUser = React.lazy(() => import("./pages/users/EditUser"));
const LazyStudents = React.lazy(() => import("./pages/students/Students"));
const LazyPersonal = React.lazy(() => import("./pages/personal/Personal"));
const LazyTeachers = React.lazy(() => import("./pages/teachers/Teachers"));
const LazyCreatePersonal = React.lazy(() => import("./pages/personal/CreatePersonal"));
const LazyCreateTeacher = React.lazy(() => import("./pages/teachers/CreateTeacher"));
const LazyStudentForm = React.lazy(() => import("./pages/students/StudentForm"));
const LazyRepresentant = React.lazy(() => import("./pages/representant/Representants"));
const LazyRepresentantsForm = React.lazy(() => import("./pages/representant/RepresentantsForm"));
const LazyShowRepresentant = React.lazy(() => import("./pages/representant/ShowRepresentant"));
const LazyEvaluate = React.lazy(() => import("./pages/students/Evaluate"));
const LazyInforme = React.lazy(() => import("./pages/students/Informe"));
const LazyConstancia = React.lazy(() => import("./pages/students/Constancia"));
const LazyViewUser = React.lazy(() => import("./pages/users/ViewUser"));
const LazyViewTeacher = React.lazy(() => import("./pages/teachers/ViewTeacher"));

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <AuthProvider>
        <PeriodProvider>
          <UserProvider>
            <DirectorsProvider>
              <TeacherProvider>
                <StudentProvider>
                  <RepresentantProvider>
                    <BrowserRouter>
                      <Suspense fallback={<LoadingModal show={true}/>}>
                        <Routes>
                          <Route path="/home" element={<LandingPage/>}/> 
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />
                          <Route path="/grades/register" element={<RegisterGrades />} />
                          <Route path="/sections/register" element={<RegisterSections />} />
                          <Route path="/students/register" element={<RegisterStudents />} />
                          <Route path="/" element={<ProtectedRoute />}>
                            <Route index element={<LazyHome />} />
                            <Route path="personal">
                              <Route index element={<LazyPersonal />} />
                              <Route path="create" element={<LazyCreatePersonal />} />
                            </Route>
                            <Route path="representants">
                              <Route index element={<Representant />} />
                              <Route path="create" element={<RepresentantsForm title="Nuevo Representante" />} />
                              <Route path="edit/:id" element={<RepresentantsForm title="Modificar Representante" />} />
                              <Route path=":id" element={<LazyShowRepresentant />} />
                              <Route path=":id_rep/add-student" element={<LazyStudentForm />} />
                            </Route>
                            <Route path="students">
                              <Route index element={<LazyStudents />} />
                              <Route path="evaluate" element={<LazyEvaluate />} />
                              <Route
                                path=":id/boletin"
                                element={<Boletin/>}
                              />
                              <Route
                                path=":id/informe"
                                element={<Informe />}
                              />
                              <Route
                                path=":id/constancia"
                                element={<Constancia />}
                              />
                              <Route path="create" element={<LazyStudentForm />} />
                              <Route path=":id_est/representants/:id_rep" element={<LazyStudentForm />} />
                            </Route>
                            <Route path="teachers">
                              <Route index element={<LazyTeachers />} />
                              <Route path=":id_teacher" element={<LazyViewTeacher />} />
                              <Route path="create" element={<LazyCreateTeacher />} />
                            </Route>
                            <Route path="users">
                              <Route index element={<LazyUsers />} />
                              <Route path="create" element={<LazyCreateUser />} />
                              <Route path="edit/:id_user" element={<LazyEditUser />} />
                              <Route path=":id_user" element={<LazyViewUser />} />
                            </Route>
                          </Route>
                          <Route path="*" element={<Navigate to={"/home"} replace={true}/>}/>
                        </Routes>
                      </Suspense>
                    </BrowserRouter>
                  </RepresentantProvider>
                </StudentProvider>
              </TeacherProvider>
            </DirectorsProvider>
          </UserProvider>
        </PeriodProvider>
      </AuthProvider>
    </div >
  );
}

export default App;
