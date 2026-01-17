import React from 'react'
import { useState } from 'react';
import './Doctor_dashboard.css'
import Dashboard_topbar from '../../Components/doctor/dashboard_topbar';
import Dashboard_sidebar from '../../Components/doctor/dashboard_sidebar';
import Prescription from './prescription';
import Patient from './patient_list';
import Empty_state from './empty_state';
import DoctorProfile from './DoctorProfile';
function Doctor_dashboard() {

    const [activePage, setActivePage] = useState(null);

    const renderContent = () => {
        if (activePage === "prescription") return <Prescription />;
        if (activePage === "patients") return <Patient />;
        if (activePage === "profile") return <DoctorProfile />;
        return <Empty_state />;
    };
    return (
        <div className="dashboard">
            <Dashboard_topbar />

            <div className="dashboard-body">
                <Dashboard_sidebar setActivePage={setActivePage} />
                <div className="dashboard-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Doctor_dashboard
