import { useState } from "react";
import Modal from "react-modal"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Esta línea es obligatoria para accesibilidad: le dice a react-modal cuál es el elemento raíz de tu app
Modal.setAppElement('#root');

export const CalendarModal = () => {

    // Estado local para controlar si el modal está abierto o cerrado
    const [isOpen, setIsOpen] = useState(true)  

    // Función que se ejecuta al cerrar el modal
    const onCloseModal = () => {
        console.log('Cerrando Modal')
        setIsOpen(false);
    }
  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal} // Se ejecuta cuando el usuario hace clic fuera del modal
        style={customStyles}
        className='modal'
        overlayClassName="modal-fondo"
        closeTimeoutMS={200} // Tiempo de espera para la animación de cierre
    >
      <h1>Hola Mundo</h1>
      <hr />
      <p>Este es mi primer Modal</p>
    </Modal>
  )
}


