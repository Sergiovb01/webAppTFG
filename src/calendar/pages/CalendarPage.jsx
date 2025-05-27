
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import {getMessagesES} from '../../helpers'
import { CalendarEvent } from '../components/CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from '../components/CalendarModal'

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

const events = [{

  title: 'Mi evento',
  notes: 'Este es mi primer evento',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor:'#fafafa'
}]



export const CalendarPage = () => {

  // Estado para guardar la última vista del calendario (semana, mes, día, etc.)
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week') 

  const eventStyleGetter = (event, start, end, isSelected) => {
    

  }

  //Eventos en los eventos del calendario

  // Evento que se dispara al hacer doble clic sobre un evento del calendario
  const onDoubleClick = (event) => {
    console.log({onDoubleClick: event})
  }

  // Evento que se dispara al hacer clic sobre un evento
  const onSelect = (event) => {
    console.log({click: event})
  }

// Evento que se dispara al cambiar la vista del calendario (semana, mes, día
  const onViewChanged = (event) => { //Evento de cambiar vista en el calendario
    localStorage.setItem('lastView', event)
    setLastView(event)
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
      <CalendarModal/>
    </>
  )
}


