import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Login.css'
import api from "../api/api"
function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const initialRole = location.state?.role || "patient";
    const [role, setRole] = useState(initialRole);
    const [mode, setMode] = useState("signin");


    const [signinData, setSigninData] = useState({ email: '', password: '' });

    const [patientSignupData, setPatientSignupData] = useState({
        fullName: '',
        patientEmail: '',
        dob: '',
        bloodGroup: '',
        mobile: '',
        password: ''
    });

    const [doctorSignupData, setDoctorSignupData] = useState({
        doctorName: '',
        doctorEmail: '',
        clinicName: '',
        mobile: '',
        password: ''
    });

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {

            const url = role === "doctor" ?
                "/doctor/login" :
                "/patient/login"

            const res = await api.post(url, signinData);


            localStorage.setItem("token", res.data.token);
            
            if (role == 'doctor') {
                localStorage.setItem("role", res.data.doctor.role);
                localStorage.setItem("userId", res.data.doctor.id);
                localStorage.setItem("code", res.data.doctor.doctorcode);
            }
            else {
                localStorage.setItem("role", res.data.patient.role);
                localStorage.setItem("userId", res.data.patient.id);
                localStorage.setItem("code", res.data.patient.patientcode);
            }



            navigate(role === "doctor" ?
                "/doctor_dashboard" :
                "/patient_dashboard"
            );

        }
        catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    const handlePatientSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/patient/signup",
                {
                    name: patientSignupData.fullName,
                    email: patientSignupData.patientEmail,
                    password: patientSignupData.password,
                    dob: patientSignupData.dob,
                    bloodGroup: patientSignupData.bloodGroup,
                    mobile: patientSignupData.mobile
                });
            alert("ready to Login");
            setMode('signin')
        }
        catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }
    };

    const handleDoctorSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/doctor/signup", {
                name: doctorSignupData.doctorName,
                email: doctorSignupData.doctorEmail,
                password: doctorSignupData.password
            });
            alert("Doctor is Resgistered Successfully");
            setMode('signin');
        }
        catch (err) {
            alert(err.response?.data?.message || "Signup failed");
        }

    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="logo">
                    <h1>🏥 Aarogya</h1>
                </div>
                <h2>
                    {mode === "signin" ? "Sign In" : "Sign Up"} –{" "}
                    {role === "patient" ? "Patient" : "Doctor"}
                </h2>

                {/* TOGGLES */}
                <div className="toggle-row">
                    <button onClick={() => setMode("signin")} className={mode === "signin" ? "active" : ""}>
                        Sign In
                    </button>
                    <button onClick={() => setMode("signup")} className={mode === "signup" ? "active" : ""}>
                        Sign Up
                    </button>
                </div>

                <div className="toggle-row">
                    <button onClick={() => setRole("patient")} className={role === "patient" ? "active" : ""}>
                        Patient
                    </button>
                    <button onClick={() => setRole("doctor")} className={role === "doctor" ? "active" : ""}>
                        Doctor
                    </button>
                </div>

                {/* FORM */}
                {mode === "signin" ? (
                    <SignInForm data={signinData} setData={setSigninData} onSubmit={handleSignIn} />
                ) : role === "patient" ? (
                    <PatientSignupForm data={patientSignupData} setData={setPatientSignupData} onSubmit={handlePatientSignup} />
                ) : (
                    <DoctorSignupForm data={doctorSignupData} setData={setDoctorSignupData} onSubmit={handleDoctorSignup} />
                )}
            </div>
        </div>
    )
}

function SignInForm({ data, setData, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />
            </div>
            <button type="submit" className="btn">Sign In</button>
            <div className="forgot-password">
                <a href="#forgot">Forgot your password?</a>
            </div>
        </form>
    );
}

function PatientSignupForm({ data, setData, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={data.fullName}
                    onChange={(e) => setData({ ...data, fullName: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="patientEmail">Email Address</label>
                <input
                    id="patientEmail"
                    placeholder="Enter your email"
                    value={data.patientEmail}
                    onChange={(e) => setData({ ...data, patientEmail: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    id="dob"
                    type="date"
                    value={data.dob}
                    onChange={(e) => setData({ ...data, dob: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="bloodGroup">Blood Group</label>
                <select
                    id="bloodGroup"
                    value={data.bloodGroup}
                    onChange={(e) => setData({ ...data, bloodGroup: e.target.value })}
                    required
                >
                    <option value="">Select Blood Group</option>
                    <option>A+</option><option>A-</option>
                    <option>B+</option><option>B-</option>
                    <option>O+</option><option>O-</option>
                    <option>AB+</option><option>AB-</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                    id="mobile"
                    placeholder="Enter your mobile number"
                    value={data.mobile}
                    onChange={(e) => setData({ ...data, mobile: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    placeholder="Enter your Password"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />
            </div>
            <button type="submit" className="btn">Create Account</button>
        </form>
    );
}

function DoctorSignupForm({ data, setData, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="doctorName">Doctor Name</label>
                <input
                    id="doctorName"
                    placeholder="Enter your full name"
                    value={data.doctorName}
                    onChange={(e) => setData({ ...data, doctorName: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="doctorEmail">Doctor Email</label>
                <input
                    id="doctorEmail"
                    placeholder="Enter your Email"
                    value={data.doctorEmail}
                    onChange={(e) => setData({ ...data, doctorEmail: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="clinicName">Clinic Name</label>
                <input
                    id="clinicName"
                    placeholder="Enter clinic name"
                    value={data.clinicName}
                    onChange={(e) => setData({ ...data, clinicName: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                    id="mobile"
                    placeholder="Enter your mobile number"
                    value={data.mobile}
                    onChange={(e) => setData({ ...data, mobile: e.target.value })}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Enter Password</label>
                <input
                    id="password"
                    placeholder="Enter your mobile number"
                    value={data.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    required
                />
            </div>
            <button type="submit" className="btn">Create Account</button>
        </form>
    );
}

export default Login
