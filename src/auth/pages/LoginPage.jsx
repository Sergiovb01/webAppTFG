import { useEffect } from 'react';
import { useAuthStore, useForm, usePerfilStore } from '../../hooks';
import './loginPage.css';
import Swal from 'sweetalert2';



const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
   registerName:'',
   registerEmail: '',
   registerPassword: '',
   registerPassword2:'',
}


export const LoginPage = () => {

    // Extrae la función de login y el posible mensaje de error desde el hook personalizado
    const {startLogin, errorMessage, startRegister} = useAuthStore();

    //Uso de 2 useForm para el login y para crear la cuenta
    const {loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm(loginFormFields);
    const {registerEmail, registerName, registerPassword, registerPassword2, onInputChange: onRegisterInputChange} = useForm(registerFormFields);

    // Función que se ejecuta al enviar el formulario de login
    const loginSubmit = (event) => {
        // Previene que el formulario recargue la página (comportamiento por defecto)
        event.preventDefault();
        console.log({loginEmail, loginPassword})
        startLogin( {email: loginEmail, password: loginPassword})
        

    }


    // Función que se ejecuta al enviar el formulario de registro
    const registerSubmit = (event) => {
        // Previene que el formulario recargue la página (comportamiento por defecto)
        event.preventDefault();
        //Si las contraseñas no coinciden se lanza el error
        if(registerPassword !== registerPassword2){
            Swal.fire('Error en el registro', 'Las contraseñas no coinciden', 'error')
            return;
        }

        startRegister({name: registerName, email: registerEmail, password: registerPassword})

    }

    // Hook que se ejecuta cuando cambia errorMessage
     useEffect(()=>{
        // Si hay un mensaje de error, muestra una alerta
        if(errorMessage !== 'Credenciales incorrectas' && errorMessage !== undefined){
            Swal.fire('Error en la autenticación', errorMessage, 'error' );//SweetAlert
        }

    }, [errorMessage])//Se vuelve a ejecutar si cambia el messageError

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                                
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                               
                            />
                        </div>
                        <div className="d-grid gap-2">
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
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                                
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                                
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                               
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
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

