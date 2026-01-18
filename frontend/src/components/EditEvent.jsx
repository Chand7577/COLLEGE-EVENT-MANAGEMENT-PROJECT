// src/components/EditEvent.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
    const { id } = useParams(); // Get the event ID from the URL
    const history = useNavigate(); // To navigate back after editing
    const [eventData, setEventData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        category: '',
        venue: '',
        description: '',
        image: null, // For image upload
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the event details by ID
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://localhost:2000/api/events/${id}`);
               
                const event = response.data;

                // Set the event data in state
                setEventData({
                    title: event.title,
                    startDate: event.start_date,
                    endDate: event.end_date,
                    category: event.category,
                    venue: event.venue,
                    description: event.description,
                    image: null, // Reset image if needed
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setEventData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append all form data
        Object.keys(eventData).forEach((key) => {
            formData.append(key, eventData[key]);
        });

        try {
            await axios.put(`http://localhost:2000/api/events/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Event updated successfully');
            history('/') // Redirect back to the dashboard
        } catch (error) {
            console.error('Error updating event:', error);
            alert('There was an error updating the event.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Event</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        value={eventData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        value={eventData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={eventData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Venue:</label>
                    <input
                        type="text"
                        name="venue"
                        value={eventData.venue}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={eventData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </div>
                <button type="submit">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;
