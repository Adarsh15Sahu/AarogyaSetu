import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function PrescriptionView() {
    const { id } = useParams();
    const location = useLocation();
    const [data, setData] = useState(location.state?.prescription || null);
    const [patientdetail, setpatientdetail] = useState({
        name: "",
        bloodgroup: "",
        mobile: "",
        gender: "",
        age: ""

    })
    const fetchpatientdata = async () => {
        try {
            if (!data) return;

            const patientCode = localStorage.getItem("code");
            const res = await api.get(`/patient/getpatientdetail/${patientCode}`);

            setpatientdetail({
                name: res.data.patient.patientname,
                bloodgroup: res.data.patient.bloodGroup,
                mobile: res.data.patient.mobile,
                gender: res.data.patient.gender,
                age: res.data.patient.age
            })
        }
        catch (err) {
            console.log("fetching patient data error in prescriptionview", err);
        }
    }

    useEffect(() => {
        if (data) {
            fetchpatientdata();
        }
    }, [data]);

    console.log(data);
    if (!data) return <p>Prescription not found</p>;

    return (
        <div className="rx-container">
            <div className="rx-card">

                {/* Header */}
                <div className="rx-header">
                    <h2>Prescription</h2>
                    <div className="rx-clinic">
                        <p>{data.doctor.clinicName}</p>
                        <p>{data.doctor.mobile}</p>
                    </div>
                </div>

                <hr />

                {/* Patient Info */}
                <div className="rx-box">
                    <h3>Patient Information</h3>

                    <div className="rx-grid">
                        <div>
                            <span className="label">Patient ID</span>
                            <p>{data.patientId}</p>
                        </div>

                        <div>
                            <span className="label">Patient Name</span>
                            <p>{patientdetail.name}</p>
                        </div>

                        <div>
                            <span className="label">Age</span>
                            <p>{patientdetail.age} years</p>
                        </div>

                        <div>
                            <span className="label">Gender</span>
                            <p>{patientdetail.gender}</p>
                        </div>
                        <div>
                            <span className="label">contact</span>
                            <p>{patientdetail.mobile}</p>
                        </div>

                        <div>
                            <span className="label">Blood Group</span>
                            <p>{patientdetail.bloodGroup}</p>
                        </div>
                    </div>
                </div>

                {/* Symptoms */}
                <div className="rx-section">
                    <label>Symptoms</label>
                    <div className="rx-static-box">
                        {data.symptoms}
                    </div>
                </div>

                {/* Diagnosis */}
                <div className="rx-section">
                    <label>Diagnosis</label>
                    <div className="rx-static-box">
                        {data.diagnosis}
                    </div>
                </div>

                {/* Medicines */}
                <div className="rx-meds-header">
                    <h3>Medicines</h3>
                </div>

                {data.medicines.map((med, index) => (
                    <div className="rx-medicine static" key={index}>
                        <span>{med.name}</span>
                        <span>{med.dosage}</span>
                        <span>{med.duration}</span>
                    </div>
                ))}

                {/* Advice */}
                <div className="rx-section">
                    <label>Advice / Notes</label>
                    <div className="rx-static-box">
                        {data.advice}
                    </div>
                </div>

                {/* Signature */}
                <div className="rx-sign">
                    <span>✔ Digitally Signed by</span>
                    <strong> {data.doctor.name}, {data.doctor.specialization}</strong>
                </div>

                {/* Footer */}
                <div className="rx-footer">
                    <small>Prescribed On: {data.prescribedOn}</small>
                </div>

            </div>
        </div>
    );
}
