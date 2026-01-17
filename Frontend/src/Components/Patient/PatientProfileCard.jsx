import React,{
    useState,useEffect
} from 'react'

import api from '../../api/api';
import { Navigate,useNavigate } from 'react-router-dom';
function PatientProfileCard() {
    const navigate = useNavigate();
    const [patientdetail, setpatientdetail] = useState({
                name: "",
                bloodgroup: "",
                mobile: "",
                gender: "",
                age: "",
                profilephoto:""
                
        })
    const patientcode = localStorage.getItem("code");
    const patientid = localStorage.getItem("userId");
        const getpatientdetail = async () => {
                try {
                    const res = await api.get(`/patient/getpatientdetail/${patientcode}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
        
                        },
                    });
                    
                    setpatientdetail({
                        name: res.data.patient.patientname,
                        bloodgroup: res.data.patient.bloodGroup,
                        mobile: res.data.patient.mobile,
                        gender: res.data.patient.gender,
                        age: res.data.patient.age
                    })
                }
                catch (err) {
                    console.error("Error fetching Patient detail", err);
                }
    }

    useEffect(() => {
        if (patientid) {
            getpatientdetail();
        }
    }, [patientid]);
    
    
    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-avatar">👤</div>
                <div className="profile-title">
                    <h3>{patientdetail.name}</h3>
                    <p className="patient-id">{patientid }</p>
                </div>
            </div>

            <div className="profile-grid">
                <div className="profile-item">
                    <span className="item-icon">📅</span>
                    <div>
                        <p className="item-label">Patient Age</p>
                        <strong>{patientdetail.age}</strong>
                    </div>
                </div>

                <div className="profile-item">
                    <span className="item-icon">👥</span>
                    <div>
                        <p className="item-label">Gender</p>
                        <strong>{patientdetail.gender}</strong>
                    </div>
                </div>

                <div className="profile-item">
                    <span className="item-icon">🩸</span>
                    <div>
                        <p className="item-label">Blood Group</p>
                        <strong>{patientdetail.bloodgroup}</strong>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default PatientProfileCard
