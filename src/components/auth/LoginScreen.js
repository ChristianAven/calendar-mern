import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './Login.css';

const initialFormLogin = {
    LEmail: '',
    LPassword: '',
};

const initialFormRegister = {
    RName: '',
    REmail: '',
    RPassword: '',
    RPasswordConfirm: ''
};

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [ formLoginValues, handleLoginInputChange, resetLogin ] = useForm( initialFormLogin )
    const [ formRegisterValues, handleRegisterInputChange, resetRegister ] = useForm( initialFormRegister )


    const { LEmail, LPassword } = formLoginValues;
    const {RName,REmail,RPassword,RPasswordConfirm} = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLogin(LEmail, LPassword))
        resetLogin();
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (RPassword !== RPasswordConfirm) {
            return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }

        dispatch(startRegister(REmail, RPassword, RName))
        resetRegister();
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='LEmail'
                                value={LEmail}
                                onChange={handleLoginInputChange}
                                autoComplete='off'
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='LPassword'
                                value={LPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='RName'
                                value={RName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='REmail'
                                value={REmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='RPassword'
                                value={RPassword}
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='RPasswordConfirm'
                                value={RPasswordConfirm}
                                onChange={handleRegisterInputChange} 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;