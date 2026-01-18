// src/pages/Admin.js
import React, { useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
const Admin = () => {
    const [isOpen, setIsOpen] = useState(false); // State to toggle the sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar visibility
    };

    return (
        <>
        <Navbar toggleSidebar={toggleSidebar}/>
       
        
        </>
    );
};

export default Admin;
