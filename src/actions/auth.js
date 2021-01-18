import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventClearActive } from "./events";


export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('auth', {email, password}, 'POST' );
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( login({
                uid: body.uid,
                name: body.name,
                email
            }) )
        } else {
            Swal.fire('Error', 'Error con el correo o contraseña' , 'error');
        }

    }
}


export const startRegister = ( email, password, name ) => {

    return async(dispatch) => {
        const resp = await fetchSinToken('auth/new', {name, email, password}, 'POST' );
        const body = await resp.json();


        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
            }))
        }else{
            Swal.fire('Error', 'Error a la hora de crear usuario' , 'error');
        }
    }
}


export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchConToken('auth/renew', {}, 'GET' );
        const body = await resp.json();


        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name,
                token: body.token
            }))
        }else{
            dispatch(checkingFinisht());
        }
    }
}

const checkingFinisht = () => ({
    type: types.authCheckingFinisht
})


const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(logout());
        dispatch(eventClearActive());
    }
}

const logout = () => ({
    type: types.authLogout,
})