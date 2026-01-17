import React from 'react'
import './topbar.css'
function Dashboard_topbar() {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <span className="logo">HealthConnect</span>
            </div>

            <input
                className="search-box"
                placeholder="Search Patient by Unique ID..."
            />

            <div className="profile">
                <img
                    src="https://i.pravatar.cc/40"
                    alt="profile"
                />
            </div>
        </header>
    )
}

export default Dashboard_topbar
