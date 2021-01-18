import React from 'react'

const CalendarEvent = ({ event }) => {

    const { title, user } = event

    return (
        <div className='Calendar__event'>
            <strong>{title}</strong>
            <span> {user.name}</span>
        </div>
    )
}

export default CalendarEvent
