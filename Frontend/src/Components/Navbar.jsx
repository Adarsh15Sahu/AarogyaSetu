import React from 'react'
import './Navbar.css'
import { Navigate,useNavigate } from 'react-router-dom'
function Navbar() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    return (
        <nav className="navbar">
            <h1>HealthConnect</h1>

            {
                !token && (<div className="nav-item">

                    <button className="login-btn desktop-btn" onClick={() => { navigate('/login', { state: { role: "doctor" } }) }}>
                        Login as Doctor
                    </button>

                    <button className="login-btn desktop-btn" onClick={() => { navigate('/login', { state: { role: "patient" } }) }}>
                        Login as Patient
                    </button>

                    <button className="login-btn mobile-btn" onClick={() => { navigate('/login') }}>
                        Login / Signup
                    </button>
                </div>)
            }
            {token && (
                <div className="profile-section">
                    <img
                        src="https://i.pravatar.cc/150?img=12"
                        alt="profile"
                        className="profile-avatar"
                        
                    />

                </div>
            )}
        </nav>
    )
}

export default Navbar
