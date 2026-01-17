import React from 'react'
import { useNavigate } from 'react-router-dom'
import heroImage from '../assets/hero_img2.png'
import './Hero.css'
function Hero() {
    const navigate = useNavigate();

    const handleDoctorLogin = () => {
        navigate('/login', { state: { role: 'doctor' } });
    };

    const handlePatientLogin = () => {
        navigate('/login', { state: { role: 'patient' } });
    };
    const token = localStorage.getItem("token");
    const handledashboard = () => {
        const role = localStorage.getItem("role");
        
        role === "doctor" ?
            navigate("/doctor_dashboard") :
            navigate("patient_dashboard")
    }
    return (
        <section className="hero">
            <div className="hero-container">

                {/* Left Content */}
                <div className="hero-content">
                    <h1>
                        Digital Prescription <br />
                        & Patient History <br />
                        Management Platform
                    </h1>

                    <p>
                        Streamlining healthcare management for doctors and patients with
                        secure, accessible, and efficient digital solutions.
                    </p>

                    {!token && (
                        <div className="hero-buttons">
                            <button className="primary-btn" onClick={handleDoctorLogin}>
                                Doctor Login / Signup
                            </button>

                            <button className="secondary-btn" onClick={handlePatientLogin}>
                                Patient Login / Signup
                            </button>
                        </div>
                    )}
                    {token && (
                        <button className="secondary-btn" onClick={handledashboard}>
                            Move to Your Dashboard
                        </button>
                    )}
                </div>

                {/* Right Image */}
                <div className="hero-image">
                    <img src={heroImage} alt="Healthcare professionals" />
                </div>

            </div>
        </section>
    )
}

export default Hero
