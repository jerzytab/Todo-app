import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost/backend/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log('Logged out successfully');
                // Odśwież stronę po wylogowaniu
                window.location.reload();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <div className="sidebar">
            <div className="avatar"></div>
            <div className="logout" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt"></i>
            </div>
        </div>
    );
};

export default Sidebar;
