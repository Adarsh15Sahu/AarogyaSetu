import React, { useState, useEffect } from 'react'
import './prescription.css'
import api from '../../api/api';
import toast from "react-hot-toast";
function Prescription() {
    const [showInput, setShowInput] = useState(true);
    const [patientcode, setPatientcode] = useState('');
    const [doctorname, setdoctorname] = useState('');
    const [doctorid, setdoctorid] = useState('');
    const [doctoremail, setdoctoremail] = useState('');
    const [clinicname, setclinicname] = useState('');
    const [clinicadd, setclinicadd] = useState('');
    const [specialization, setspecialization] = useState('');
    const [medicines, setMedicines] = useState([
        { name: '', dosage: '', duration: '' }
    ]);
    const [symptoms, setSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [advice, setAdvice] = useState("");

    const [patientdetail, setpatientdetail] = useState({
        name: "",
        bloodgroup: "",
        mobile: "",
        gender: "",
        age: ""

    })

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
    };

    const removeMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const updateMedicine = (index, field, value) => {
        const newMeds = [...medicines];
        newMeds[index][field] = value;
        setMedicines(newMeds);
    };

    const handlePatientIdSubmit = async () => {
        if (!patientcode.trim()) return;

        try {
            await getpatientdetail();
            setShowInput(false);
        } catch (err) {
            alert("Invalid patient code ❌");
        }
    };
    console.log(localStorage.getItem("role"));
    const doctorId = localStorage.getItem("userId");

    const getpatientdetail = async () => {
        const toastId = toast.loading("Fetching Details...");
        try {
            const res = await api.get(`/patient/getpatientdetail/${patientcode}`);

            setpatientdetail({
                name: res.data.patient.patientname,
                bloodgroup: res.data.patient.bloodGroup,
                mobile: res.data.patient.mobile,
                gender: res.data.patient.gender,
                age: res.data.patient.age
            })
            toast.success("fetched patient deatails successfully ✅", {
                            id: toastId,
                        });
        }
        catch (err) {
            console.error("Error fetching Patient detail", err);
        }
    }


    const getdetail = async () => {
        const toastId = toast.loading("Fetching Details...");
        try {
            const res = await api.get(`/doctor/getdoctordetail/${doctorId}`);
            setdoctorid(res.data.doctor.id);
            setdoctoremail(res.data.doctor.doctorEmail);
            setdoctorname(res.data.doctor.doctorName);
            setclinicname(res.data.doctor.clinicname);
            setclinicadd(res.data.doctor.clinicadd);
            setspecialization(res.data.doctor.specialization);
            toast.success("fetched successfully ✅", {
                            id: toastId,
                        });
        } catch (err) {
            console.error("Error fetching doctor detail", err);
        }
    }

    useEffect(() => {
        if (doctorId) {
            getdetail();
        }
    }, [doctorId]);

    const createPrescription = async () => {
        try {
            const toastId = toast.loading("Saving Prescription");
            console.log(patientcode);
            const res = await api.post("/doctor/createprescription", {
                doctorId: doctorId,
                patientcode: patientcode,
                symptoms: symptoms,
                diagnosis: diagnosis,
                medicines: medicines,
                advice: advice
            })
            toast.success("PRescription saved successfully ✅", {
                id: toastId,
            });

        }
        catch (err) {
            console.error("Error submiting prescription detail", err);
        }
    }
    if (showInput) {
        return (
            <div className="patient-id-container">
                <div className="patient-id-card">
                    <h2>Enter Patient code</h2>
                    <input
                        type="text"
                        placeholder="Patient code"
                        value={patientcode}
                        onChange={(e) => setPatientcode(e.target.value)}
                    />
                    <button onClick={handlePatientIdSubmit}>Submit</button>
                </div>
            </div>
        );
    }

    return (

        <div className="rx-container">
            <div className="rx-card">

                {/* Header */}
                <div className="rx-header">

                    <div className="rx-clinic">
                        <p>{clinicname}</p>
                        <p>{clinicadd}</p>
                    </div>
                </div>

                <hr />

                {/* Patient Info */}
                <div className="rx-box">
                    <h3>Patient Information</h3>

                    <div className="rx-grid">
                        <div>
                            <span className="label">Patient Code</span>
                            <p>{patientcode}</p>
                        </div>
                        <div>
                            <span className="label">Patient Name</span>
                            <p>{patientdetail.name}</p>
                        </div>
                        <div>
                            <span className="label">Age</span>
                            <p>{patientdetail.age}</p>
                        </div>
                        <div>
                            <span className="label">Gender</span>
                            <p>{patientdetail.gender}</p>
                        </div>
                        <div>
                            <span className="label">Blood Group</span>
                            <p>{patientdetail.bloodgroup}</p>
                        </div>
                        <div>
                            <span className="label">Contact Number</span>
                            <p>{patientdetail.mobile}</p>
                        </div>
                    </div>
                </div>

                {/* Symptoms */}
                <div className="rx-section">
                    <label>Symptoms</label>
                    <textarea value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)} />
                </div>

                {/* Diagnosis */}
                <div className="rx-section">
                    <label>Diagnosis</label>
                    <textarea value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)} />
                </div>

                {/* Medicines */}
                <div className="rx-meds-header">
                    <h3>Medicines</h3>
                    <button className="rx-add" onClick={addMedicine}>Add Medicine</button>
                </div>

                {medicines.map((med, index) => (
                    <div className="rx-medicine" key={index}>
                        <input value={med.name} onChange={(e) => updateMedicine(index, 'name', e.target.value)} />
                        <input value={med.dosage} onChange={(e) => updateMedicine(index, 'dosage', e.target.value)} />
                        <input value={med.duration} onChange={(e) => updateMedicine(index, 'duration', e.target.value)} />
                        <button className="rx-remove" onClick={() => removeMedicine(index)}>✕</button>
                    </div>
                ))}

                {/* Advice */}
                <div className="rx-section">
                    <label>Advice / Notes</label>
                    <textarea value={advice}
                        onChange={(e) => setAdvice(e.target.value)} />
                </div>

                {/* Signature */}
                <div className="rx-sign">
                    {/* <input type="checkbox" /> */}
                    <span>Digital Signature: Dr. {doctorname} </span>
                </div>

                {/* Actions */}
                <div className="rx-actions">
                    <button className="rx-clear">Clear Form</button>
                    <button className="rx-submit" onClick={createPrescription}>Submit Prescription</button>
                </div>

            </div>
        </div>
    )
}

export default Prescription
