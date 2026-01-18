// src/components/EventList.js
import React from 'react';
import EventTable from './EventTable';

const EventList = ({ events,onDelete }) => {
    
    return (
        <div className="event-list">
            
                <EventTable  events={events} onDelete={onDelete} />
           
        </div>
    );
};

export default EventList;
