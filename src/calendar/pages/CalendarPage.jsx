
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import {getMessagesES} from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'
import { Fade } from '@mui/material'


const locales = {
  'es': es,
}

// Configuración del localizador de fechas usando date-fns
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const events = [
  
  {
    title: 'Feria Internacional de Animación 2025',
    notes: 'Exposición de nuevas tecnologías en animación 3D y VFX.',
    start: new Date(2025, 5, 24, 10, 0),
    end: new Date(2025, 5, 24, 18, 0),
    bgColor: '#FF8C00',
    image: '/img/feria-animacion.jpg',
    location: 'Centro de Convenciones, Madrid'
  },
  {
    title: 'Conferencia: El futuro del VFX en el cine',
    notes: 'Charla impartida por expertos de ILM y Weta Digital.',
    start: new Date(2025, 5, 25, 11, 0),
    end: new Date(2025, 5, 25, 13, 0),
    bgColor: '#1E90FF',
    image: '/img/conferencia-vfx.jpg',
    location: 'Auditorio VFX, Barcelona'
  },
  {
    title: 'Taller de Motion Capture',
    notes: 'Prácticas en vivo con equipos de última generación.',
    start: new Date(2025, 5, 26, 15, 0),
    end: new Date(2025, 5, 26, 17, 0),
    bgColor: '#32CD32',
    image: '/img/motion-capture.png',
    location: 'Estudio Creativo, Valencia'
  },

  
  {
    title: 'Networking: Profesionales del Cine y la Animación',
    notes: 'Espacio para generar contactos y oportunidades de colaboración.',
    start: new Date(2025, 6, 5, 19, 0),
    end: new Date(2025, 6, 5, 21, 0),
    bgColor: '#FFD700',
    image: '/img/networking-cine.jpg',
    location: 'Terraza CineForum, Sevilla'
  },
  {
    title: 'Premios a la mejor producción VFX',
    notes: 'Gala de entrega de premios a las mejores producciones del año.',
    start: new Date(2025, 6, 12, 20, 0),
    end: new Date(2025, 6, 12, 23, 0),
    bgColor: '#BA55D3',
    image: '/img/premios-vfx.jpg',
    location: 'Teatro Principal, Bilbao'
  },

 
  {
    title: 'Workshop: Iluminación y Composición Digital',
    notes: 'Sesión práctica con herramientas de postproducción.',
    start: new Date(2025, 7, 8, 9, 0),
    end: new Date(2025, 7, 8, 12, 0),
    bgColor: '#FF4500',
    image: '/img/workshop-iluminacion.jpg',
    location: 'Espacio Creativo, Málaga'
  },
  {
    title: 'Proyección exclusiva: Making of de Avatar 3',
    notes: 'Detrás de cámaras y procesos de creación de efectos.',
    start: new Date(2025, 7, 22, 18, 0),
    end: new Date(2025, 7, 22, 20, 0),
    bgColor: '#00CED1',
    image: '/img/proyeccion-avatar.jpeg',
    location: 'Cine Fórum, Valencia'
  }
]






export const CalendarPage = () => {

  // Estado para guardar la última vista del calendario (semana, mes, día, etc.)
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week') 
  const [activeEvent, setActiveEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

 // Estilo personalizado mejorado para los eventos del calendario
const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: event.bgColor || '#347CF7',
    borderRadius: '8px',              
    opacity: isSelected ? 1 : 0.9,    
    color: '#ffffff',                
    border: isSelected ? '2px solid #000000' : 'none', 
    padding: '2px 6px',               
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
    cursor: 'pointer'                
  };
  
  return { style };
};

  //Eventos en los eventos del calendario

  // Evento que se dispara al hacer doble clic sobre un evento del calendario
  const onDoubleClick = (event) => {
    console.log({onDoubleClick: event})
  }

  // Evento que se dispara al hacer clic sobre un evento
  const onSelect = (event) => {
    setActiveEvent(event)
    setIsModalOpen(true)
  }

// Evento que se dispara al cambiar la vista del calendario (semana, mes, día
  const onViewChanged = (event) => { //Evento de cambiar vista en el calendario
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  
  const onCloseModal = () => {
    console.log('Cerrando Modal')
    setIsModalOpen(false)
  }


  return (
    <>
    
      <Calendar
        culture='es' //Calendario en español
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 57px)' }}
        messages={getMessagesES()} // Función personalizada para traducir los textos del calendario al español
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        event={activeEvent}
        />
    </>
  )
}


