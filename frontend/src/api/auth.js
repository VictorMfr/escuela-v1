import axios from './axios';

export const registerRequest = user => axios.post("/direccion/nuevoDirector", user)

export const loginRequest = user => axios.post(`${user.type}/iniciarSesion`, user)

export const logoutRequest = (user) => {
    let url = "direccion/cerrarSesion";
    const type = Object.keys(user)[0]

    if (type === "administrador") {
        url = "administracion/cerrarSesion"
    } else if (type === "profesor") {
        url = "docente/cerrarSesion"
    } else if (type === "representante") {
        url = "representante/cerrarSesion"
    }

    return axios.post(url, user, {
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    })
}