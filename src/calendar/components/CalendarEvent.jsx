

export const CalendarEvent = ({event}) => {

  const {title, notes} = event 

  return (
    <>
      <strong>{title}</strong>
      <p>-{notes}</p>
    </>
  )
}


