import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvensts";
import { types } from "../types/types"


export const eventStartAddNew = (event) => {

    return async(dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json()
            
            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                dispatch(eventAddNew( event ))
            }
        } catch (e) {
            console.log(e);
        }


        



    };

};


const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event,
});


export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event,
});

export const eventClearActiveEvent = () => ({type: types.eventClearActiveEvent})

export const eventStartUpdate = (event) => {
    return async(dispatch) => {
        try {

            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if ( body.ok ){
                dispatch(eventUpdated(event));
            } else {
                Swal.fire('Error', 'No se pudo guardar la nota', 'error');
            }
            
        } catch (e) {
            console.log(e)
        }
    }
}

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventStartDelete = () => {
    return async(dispatch, getState) => {

        try {
            const {id} = getState().calendar.activeEvent; 

            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ){
                dispatch(eventDeleted());
            } else {
                Swal.fire('Error', 'No se pudo eliminar la nota', 'error');
            }
            
        } catch (e) {
            console.log(e)
        }

    }
}

const eventDeleted = () => ({type: types.eventDeleted})


export const eventClearActive = () => ({ type: types.eventClearActive });

export const eventStartLoading = () => {
    return async(dispatch) => {

        try {

            const resp = await fetchConToken('events',{},'GET');
            const body = await resp.json();


            const events = prepareEvents( body.eventos );
            dispatch(eventLoaded(events));
            
        } catch (e) {
            console.log(e)
        }

    }
}


const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

