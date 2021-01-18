import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const finish = now.clone().add(1, 'hours')

const initialState = () => ({
    title: '',
    notes: '',
    start: now.toDate(),
    end: finish.toDate()
})

const CalendarModal = () => {

    const {modalOpen} = useSelector(({ui}) => ui)
    const {activeEvent} = useSelector(({calendar}) => calendar)

    const dispatch = useDispatch()

    const [dateStart, setDateStart] = useState( now.toDate() )
    const [dateEnd, setDateEnd] = useState( finish.toDate() )
    const [formValues, setFormValues] = useState(initialState);

    const { notes, title, start, end } = formValues


    useEffect(() => {

        if (activeEvent) {
            setFormValues(activeEvent);
        } else {
            setFormValues(initialState);
        }
        
    }, [activeEvent, setFormValues])


    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }


    const handleStartDateChange = (e) => {
        setDateStart( e )
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const closeModal = () => {
        setFormValues(initialState)
        dispatch(uiCloseModal())
        dispatch(eventClearActiveEvent())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if( momentStart.isSameOrAfter(momentEnd) ){
            return Swal.fire('Error', 'La fecha fin debe de ser mayor a la fecha inicio', 'error');
        }else if( title.trim().length < 2 ) {
            return Swal.fire('Error', 'Debe de tener un titulo', 'error');
        }

        if(activeEvent){
            dispatch( eventStartUpdate(formValues) );
        }else {
            dispatch( eventStartAddNew(formValues,) );
        }
    
        closeModal();
    }

    return (
        <Modal
          isOpen={modalOpen}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
          style={customStyles}
          closeTimeoutMS= {200}
          className="modal"
          overlayClassName="modal-fondo"
        >
            <h1> {activeEvent ? 'Editar Evento' : 'Crear un nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={ dateStart }
                        className='form-control'
                    />                
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        value={notes}
                        onChange={handleInputChange}
                        rows="5"
                        name="notes"
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal
