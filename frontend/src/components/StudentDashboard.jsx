// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import EventList from './EventList'; // Assuming this component renders the EventCard components
import DashboardStats from './DashboardStats';
import axios from 'axios';

const StudentDashboard = () => {
    const [events, setEvents] = useState([]); // State to store events
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to handle errors
    const [totalEvents, setTotalEvents] = useState(0); // State to keep track of totalEvents
    const [eventCategories, setEventCategories] = useState(new Set()); // State to keep track of total categories
    const [searchTerm, setSearchTerm] = useState(''); // State to manage the search term

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:2000/api/events'); // Adjust the URL if necessary
                setEvents(response.data);
                setTotalEvents(response.data.length); // Update total events
                const categories = new Set(response.data.map(event => event.category)); // Update categories
                setEventCategories(categories);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to fetch events.'); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchEvents(); // Call the fetch function
    }, []); // Empty dependency array means this runs once on mount

    const handleDelete = (id) => {
        // Filter out the deleted event from the state
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    };

    // Filter events based on the search term
    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Adjust 'title' based on your event object structure
        event.category.toLowerCase().includes(searchTerm.toLowerCase()) // Adjust if you want to search by category as well
    );

    return (
        <div>
            <DashboardStats totalEvents={totalEvents} eventCategories={eventCategories.size} />
            <h1>Event List</h1>
            <input
                type="text"
                placeholder="Search events by category or title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                style={{ marginBottom: '20px', padding: '10px', width: '300px' }} // Style for input
            />
            {loading && <p>Loading events...</p>} {/* Show loading message */}
            {error && <p>{error}</p>} {/* Show error message if any */}
            {!loading && !error && (
                <EventList events={filteredEvents} onDelete={handleDelete} /> // Pass filtered events to EventList
            )} {/* Render EventList only when loading is complete */}
        </div>
    );
};

export default StudentDashboardDashboard;
