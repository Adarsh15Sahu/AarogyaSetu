import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'
import Home from './Pages/Home';
import Doctor_dashboard from './Pages/DoctorDB/Doctor_dashboard'
import PatientDashboard from './Pages/PatientDb/PatientDashboard';
import PrescriptionView from './Pages/PatientDb/PrescriptionView';
import Login from './Pages/Login';
import ProtectedRoute from './util/Protectroutes';
function App() {

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<h1>Unauthorized path</h1>} />
        
        <Route
          path="/doctor_dashboard" element={
          <ProtectedRoute allowedRole="doctor">
            <Doctor_dashboard />
          </ProtectedRoute>}
        />
        
        <Route path="/patient_dashboard" element={<PatientDashboard />} />
        <Route path="/patient/prescription/:id" element={<PrescriptionView />} />
      </Routes>
    </>
  )
}

export default App
