import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'; // Import the icons you need
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Drawer, IconButton, List, Divider } from '@mui/material'; // Import MUI components
import CloseIcon from '@mui/icons-material/Close'; // Icon for closing the drawer

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <Drawer anchor="left" open={isOpen} onClose={toggleSidebar}>
            <div style={{ width: 250, backgroundColor: '#3f51b5', color: '#fff', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
                    <h2 style={{ margin: 0 }}>Sidebar</h2>
                    <IconButton onClick={toggleSidebar} style={{ color: '#fff' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Divider style={{ backgroundColor: '#fff' }} />
                <div style={{ padding: '16px' }}>
                    <Link to="/create-event" onClick={toggleSidebar} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
                        Create Event
                    </Link>
                    <Link to="/event-list" onClick={toggleSidebar} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <FontAwesomeIcon icon={faList} style={{ marginRight: '8px' }} />
                        Event List
                    </Link>
                    <Link to="/dashboard" onClick={toggleSidebar} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        Dashboard
                    </Link>
                    <Link to="/users" onClick={toggleSidebar} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        Users
                    </Link>
                    <Link to="/settings" onClick={toggleSidebar} style={{ color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        Settings
                    </Link>
                </div>
            </div>
        </Drawer>
    );
};

export default Sidebar;
