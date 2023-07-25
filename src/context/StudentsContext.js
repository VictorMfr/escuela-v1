import { createContext, useContext, useState } from "react";
import {
    getStudentsRequest,
} from '../api/students'
import { useAuth } from './AuthProvider'

const StudentContext = createContext();

export const useStudents = () => {
    const context = useContext(StudentContext)

    if (!context) {
        throw new Error("useStudents must be used within a StudentProvider")
    }
    return context;
}

export function StudentProvider({ children }) {

    const [students, setStudents] = useState([]);
    const { user } = useAuth()

    // const activateStudent = async (id) => {
    //     try {
    //         const res = await activeStudentRequest(user.token, id)
    //         if (res.status === 200) {
    //             getStudents()
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const deactivateStudent = async (id) => {
    //     try {
    //         const res = await inactiveStudentRequest(user.token, id)
    //         if (res.status === 200) {
    //             getStudents()
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const getStudents = async () => {
        try {
            const res = await getStudentsRequest(user.token)
            setStudents(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // const deleteRepresentant = async (data) => {
    //     try {
    //         await deleteRepresentantRequest(user.token, data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <StudentContext.Provider
            value={{
                students,
                getStudents,
                // createStudent,
                // activateStudent,
                // deactivateStudent
            }}>
            {children}
        </StudentContext.Provider>
    )
}