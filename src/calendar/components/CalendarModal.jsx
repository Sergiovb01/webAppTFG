import Modal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000
  }
};

Modal.setAppElement('#root');

export const CalendarModal = ({ isOpen, onClose, event }) => {

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!event) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      closeTimeoutMS={200}
    >
      <div className="modal-container">
        {/* Imagen */}
        {event.image && (
          <div className="image-container">
            <img src={event.image} alt={event.title} className="event-image" />
          </div>
        )}

        <div className="modal-content">
          {/* Título */}
          <h2 className="event-title">{event.title}</h2>

          {/* Fecha */}
          <p className="event-date">
            📅 {formatDate(event.start)} | 🕐 {formatTime(event.start)} - {formatTime(event.end)}
          </p>

          {/* Descripción */}
          {event.notes && (
            <div className="event-section">
              <h3 className="section-title">Descripción</h3>
              <p className="section-text">{event.notes}</p>
            </div>
          )}

          {/* Localización */}
          {event.location && (
            <div className="event-section">
              <h3 className="section-title">Ubicación</h3>
              <p className="section-text">📍 {event.location}</p>
            </div>
          )}

          {/* Botón cerrar */}
          <button className="close-button" onClick={onClose}>Cerrar</button>
        </div>
      </div>

      <style jsx>{`
        .modal-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
        }

        .image-container {
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }

        .event-image {
         width: 100%;
        height: 100%;
        object-fit: cover;
        }

        .modal-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .event-title {
          font-size: 24px;
          font-weight: 700;
          color: #222;
          margin: 0;
        }

        .event-date {
          font-size: 14px;
          color: #555;
          margin: 0;
        }

        .event-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #0064ff;
          margin: 0;
        }

        .section-text {
          font-size: 14px;
          color: #333;
          margin: 0;
        }

        .close-button {
          align-self: flex-end;
          margin-top: 8px;
          padding: 8px 16px;
          background-color: #0064ff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .close-button:hover {
          background-color: #004db3;
        }
      `}</style>
    </Modal>
  );
};
