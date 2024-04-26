import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserProvider } from "./context/UsersContext";
import { TeacherProvider } from "./context/TeachersContext";
import { StudentProvider } from "./context/StudentsContext";
import { RepresentantProvider } from "./context/RepresentantsContext";
import { DirectorsProvider } from "./context/DirectorContext";
import { PeriodProvider } from "./context/PeriodContext";

import Boletin from "./pages/students/Boletin"
import Informe from "./pages/students/Informe"
import Constancia from "./pages/students/Constancia"
import Rasgos from "./pages/students/Rasgos";
import LoadingModal from "./pages/register/LoadingModal";

const LazyRegisterStudents = React.lazy(() => import("./pages/home/RegisterStudents"));
const LazyRegisterSections = React.lazy(() => import("./pages/home/RegisterSections"));
const LazyRegisterGrades = React.lazy(() => import("./pages/home/RegisterGrades"));
const LazyLandingPage = React.lazy(() => import("./pages/landing/Landing"));
const RepresentantsForm = React.lazy(() => import("./pages/representant/RepresentantsForm"));
const LazyRepresentant = React.lazy(() => import("./pages/representant/Representants"));
const LazyLogin = React.lazy(() => import("./pages/login/Login"));
const LazyRegister = React.lazy(() => import("./pages/register/Register"));
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
const LazyEvaluate = React.lazy(() => import("./pages/students/Evaluate"));
const LazyViewUser = React.lazy(() => import("./pages/users/ViewUser"));
const LazyViewTeacher = React.lazy(() => import("./pages/teachers/ViewTeacher"));


function App() {
  return (
    <AuthProvider>
      <PeriodProvider>
        <UserProvider>
          <DirectorsProvider>
            <TeacherProvider>
              <StudentProvider>
                <RepresentantProvider>
                  <BrowserRouter>
                    <Suspense fallback={<LoadingModal show={true} />}>
                      <Routes>
                        <Route path="/home" element={<LazyLandingPage />} />
                        <Route path="/login" element={<LazyLogin />} />
                        <Route path="/register" element={<LazyRegister />} />
                        <Route path="/grades/register" element={<LazyRegisterGrades />} />
                        <Route path="/sections/register" element={<LazyRegisterSections />} />
                        <Route path="/students/register" element={<LazyRegisterStudents />} />

                        <Route path="/" element={<ProtectedRoute />}>
                          <Route index element={<LazyHome />} />

                          <Route path="personal">
                            <Route index element={<LazyPersonal />} />
                            <Route path="create" element={<LazyCreatePersonal />} />
                          </Route>

                          <Route path="representants">
                            <Route index element={<LazyRepresentant />} />
                            <Route path="create" element={<RepresentantsForm title="Nuevo Representante" />} />
                            <Route path="edit/:id" element={<RepresentantsForm title="Modificar Representante" />} />
                            <Route path=":id_rep/add-student" element={<LazyStudentForm />} />
                          </Route>

                          <Route path="students">
                            <Route index element={<LazyStudents />} />
                            <Route path="evaluate" element={<LazyEvaluate />} />

                            <Route path=":id/boletin" element={<Boletin />} />
                            <Route path=":id/informe" element={<Informe />} />
                            <Route path=":id/constancia" element={<Constancia />} />
                            <Route path=":id/rasgos" element={<Rasgos />} />

                            <Route path="create" element={<LazyStudentForm />} />
                            <Route path=":id_est/representants/:id_rep" element={<LazyStudentForm />} />

                          </Route>

                          <Route path="teachers">
                            <Route index element={<LazyTeachers />} />
                            <Route path=":id_teacher" element={<LazyViewTeacher />} />
                            <Route path="create" element={<LazyCreateTeacher title="Nuevo Docente" />} />
                          </Route>

                          <Route path="users">
                            <Route index element={<LazyUsers />} />
                            <Route path="create" element={<LazyCreateUser title="Nuevo Administrador" />} />
                            <Route path="edit/:id_user" element={<LazyEditUser title="Modificar Administrador" />} />
                            <Route path=":id_user" element={<LazyViewUser />} />
                          </Route>
                        </Route>
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
  );
}

export default App;
