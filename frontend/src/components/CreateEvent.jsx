import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Paper,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
} from '@mui/material';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        startDate: '',
        endDate: '',
        category: '',
        venue: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to send data with the file
        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('startDate', formData.startDate);
        formDataObj.append('endDate', formData.endDate);
        formDataObj.append('category', formData.category);
        formDataObj.append('venue', formData.venue);
        formDataObj.append('description', formData.description);
        if (formData.image) {
            formDataObj.append('image', formData.image);
        }

        try {
            // Send a POST request to your backend
            await axios.post('http://localhost:2000/api/events', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Event created successfully');
            // Clear form after successful submission
            setFormData({
                title: '',
                startDate: '',
                endDate: '',
                category: '',
                venue: '',
                description: '',
                image: null,
            });
        } catch (error) {
            console.error('Error creating event:', error);
            alert('There was an error creating the event. Please try again.');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Create Event
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="End Date"
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Venue"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <MenuItem value="Conference">Conference</MenuItem>
                                <MenuItem value="Workshop">Workshop</MenuItem>
                                <MenuItem value="Seminar">Seminar</MenuItem>
                                <MenuItem value="Webinar">Webinar</MenuItem>
                                {/* Add more categories as needed */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleFileChange}
                            required
                            style={{ display: 'none' }}
                            id="file-input"
                        />
                        <label htmlFor="file-input">
                            <Button variant="contained" component="span">
                                Upload Image
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Create Event
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default CreateEvent;
