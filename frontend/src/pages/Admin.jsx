// src/pages/Admin.js
import React, { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Button } from '@mui/material'; // Ensure you are using Button if needed

const Admin = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle the sidebar

    const toggleSidebar = () => {
        setIsOpen(prevState => !prevState); // Toggle the sidebar visibility
    };

    return (
        <>
            {/* Navbar that triggers sidebar toggle */}
            <Navbar toggleSidebar={toggleSidebar} />
            
            <div className="admin-container">
                {/* Sidebar component */}
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

                {/* Main content that shifts when sidebar is open */}
                <div className={`main-content ${isOpen ? 'shifted' : ''}`}>
                    <AdminDashboard />
                </div>
            </div>
        </>
    );
};

export default Admin;
