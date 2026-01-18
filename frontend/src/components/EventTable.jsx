import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from '@mui/material';

// Function to format date from ISO string to YYYY-MM-DD
const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
};

const EventTable = ({ events = [], onDelete }) => {
    const navigate = useNavigate();
    
    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`http://localhost:2000/api/events/${id}`);
                onDelete(id);
                alert('Event deleted successfully');
            } catch (error) {
                console.error('Error deleting event:', error);
                alert('There was an error deleting the event.');
            }
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Image</TableCell>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Title</TableCell>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Category</TableCell>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Start Date</TableCell>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>End Date</TableCell>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Venue</TableCell>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Description</TableCell>
                        <TableCell style={{ position: 'sticky', top: 0, backgroundColor: '#fff' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {events.length > 0 ? (
                        events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell>
                                    <img
                                        src={`http://localhost:2000${event.image_url}`}
                                        alt={event.title}
                                        style={{ width: '100px', height: '100px', borderRadius: '5px' }}
                                    />
                                </TableCell>
                                <TableCell>{event.title}</TableCell>
                                <TableCell>{event.category}</TableCell>
                                <TableCell>{formatDate(event.start_date)}</TableCell>
                                <TableCell>{formatDate(event.end_date)}</TableCell>
                                <TableCell>{event.venue}</TableCell>
                                <TableCell>{event.description}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleEdit(event.id)}
                                        variant="contained"
                                        color="primary"
                                        style={{ marginRight: '5px' }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(event.id)}
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={8} align="center">No events found.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EventTable;
