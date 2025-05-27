
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours, format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'

const locales = {
  'es': es,
}

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
  return (
    <div>
      <Calendar
       culture='es'
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 57px)' }}
      />
    </div>
  )
}


