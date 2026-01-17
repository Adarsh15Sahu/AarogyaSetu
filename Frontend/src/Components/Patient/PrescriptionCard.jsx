import React from 'react'
import { useNavigate } from 'react-router-dom'

function PrescriptionCard({ data }) {
    const navigate = useNavigate()

    const handleViewPrescription = () => {
        navigate(`/patient/prescription/${data.prescriptionId}`, { state: { prescription: data } })
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Format medicines array
    const formatMedicines = (medicines) => {
        if (!medicines || medicines.length === 0) return 'None';
        return medicines.map(m => m.name).join(', ');
    };

    return (
        <div className="prescription-card" style={{ cursor: 'pointer' }}>
            <div className="card-header">
                <div className="doctor-info">
                    <h4 className="doctor-name">👨‍⚕️ {data.doctor?.name || 'Unknown'}</h4>
                    <p className="clinic">{data.doctor?.clinicName || 'Clinic'}</p>
                </div>
                <span className="date-badge">{formatDate(data.prescribedOn)}</span>
            </div>

            <div className="card-divider"></div>

            <div className="card-content">
                <div className="info-row">
                    <span className="info-icon">🔍</span>
                    <div>
                        <p className="info-label">Diagnosis</p>
                        <p className="info-value">{data.diagnosis || 'N/A'}</p>
                    </div>
                </div>

                <div className="info-row">
                    <span className="info-icon">💊</span>
                    <div>
                        <p className="info-label">Medications</p>
                        <p className="info-value">{formatMedicines(data.medicines)}</p>
                    </div>
                </div>
            </div>

            <div className="card-actions">
                <button className="btn-download" onClick={handleViewPrescription}>
                    👁️ View Details
                </button>
            </div>
        </div>
    )
}

export default PrescriptionCard
