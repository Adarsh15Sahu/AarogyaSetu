import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './sidebar.css'
function Dashboard_sidebar({ setActivePage }) {
    const navigate = useNavigate();
    const handleLogout =  () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("code");
        navigate("/login");
    }
    return (
        <aside className="sidebar">
            

            <ul className="sidebar-menu">
                <li onClick={() => setActivePage(null)}>Dashboard</li>
                <li onClick={() => setActivePage("prescription")}>
                    New Prescription
                </li>
                <li onClick={() => setActivePage("patients")}>
                    My Patients
                </li>

                <li onClick={() => setActivePage("profile")}>My Profile & Clinic</li>
            </ul>
           
            <div className="sidebar-footer">
                <hr />
                <span>Settings</span>
                <span onClick={handleLogout}>Logout</span>
            </div>
        </aside>
    )
}

export default Dashboard_sidebar
