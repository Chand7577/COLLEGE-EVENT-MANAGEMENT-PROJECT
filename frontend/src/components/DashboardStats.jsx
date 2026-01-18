// src/components/DashboardStats.js
import React from 'react';

const DashboardStats = ({totalEvents,eventCategories}) => {
    console.log(totalEvents)
    // Sample data (this would come from your backend or state management)
    const stats = {
        totalRegistrations: 120,
        totalEvents: 5,
        eventCategories: 3,
    };
    const cardColors = {
        registrations: '#4caf50', // Green
        events: '#2196f3', // Blue
        categories: '#ff9800', // Orange
    };

    return (
        <div className="dashboard-stats">
            <div className="card" style={{ backgroundColor: cardColors.registrations, color: '#fff' }}>
                <h3>Total Registrations</h3>
                <p>{stats.totalRegistrations}</p>
            </div>
            <div className="card" style={{ backgroundColor: cardColors.events, color: '#fff' }}>
                <h3>Total Events</h3>
                <p>{totalEvents}</p>
            </div>
            <div className="card" style={{ backgroundColor: cardColors.categories, color: '#fff' }}>
                <h3>Event Categories</h3>
                <p>{eventCategories}</p>
            </div>
        </div>
    );
};

export default DashboardStats;
