import React, { useState, useEffect } from 'react';
import './patient.css';
import PatientProfileCard from '../../Components/Patient/PatientProfileCard';
import PrescriptionCard from '../../Components/Patient/PrescriptionCard';
// import prescriptions from '../../assets/prescriptions';
import api from '../../api/api';
import toast from "react-hot-toast";
function PatientDashboard() {
    const [isEdit, setIsEdit] = useState(false);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const patientId = localStorage.getItem("userId");

    const [patientdetail, setpatientdetail] = useState({
        name: "",
        mobile: "",
        dob: "",
        profilephoto: "",
        gender: "",
        bloodgroup: ""
    });
    const handleImage = (e) => {
        setpatientdetail({
            ...patientdetail,
            profilephoto: e.target.files[0]
        });
    };

    const fetchPrescriptions = async () => {
        const toastId = toast.loading("Fetching Details...");
        try {
            const res = await api.get(
                `/patient/getPrescription/${patientId}`
            );


            setPrescriptions(res.data.prescriptions);
            toast.success("fetched successfully ✅", {
                            id: toastId,
                        });
        } catch (err) {
            console.error("Error fetching prescriptions", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (patientId) {
            fetchPrescriptions();
        }
    }, [patientId]);

    const updateProfile = async () => {
        const toastId = toast.loading("Updateing Profile...");
        try {
            const formData = new FormData();
            formData.append("name", patientdetail.name);
            formData.append("mobile", patientdetail.mobile);
            formData.append("gender", patientdetail.gender);
            formData.append("bloodGroup", patientdetail.bloodgroup);
            formData.append("DOB", patientdetail.dob);

            if (patientdetail.profilephoto) {
                formData.append("profilephoto", patientdetail.profilephoto);
            }

            await api.put(
                "/patient/updateprofile",
                formData
            );

            toast.success("Profile Updated successfully ✅", {
                id: toastId,
            });
            setIsEdit(false);

        } catch (err) {
            console.error(err);
            alert("Profile update failed ❌");
        }
    };


    return (
        <div className="patient-dashboard">


            <div className="dashboard-header">
                <div>
                    <h1>Welcome To HealthConnect</h1>
                    <p>Manage your health records and prescriptions</p>
                </div>
            </div>



            {!isEdit ? (
                <PatientProfileCard />
            ) : (
                <div className="edit-profile">

                    <h2 className="edit-title">✏️ Update Patient Profile</h2>

                    {/* ================= NAME ================= */}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            value={patientdetail.name}
                            onChange={(e) =>
                                setpatientdetail({
                                    ...patientdetail,
                                    name: e.target.value
                                })
                            }
                        />
                    </div>

                    {/* ================= MOBILE ================= */}
                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="text"
                            placeholder="Enter mobile number"
                            value={patientdetail.mobile}
                            onChange={(e) =>
                                setpatientdetail({
                                    ...patientdetail,
                                    mobile: e.target.value
                                })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Your DOB</label>
                        <input
                            type="text"
                            placeholder="Enter mobile number"
                            value={patientdetail.dob}
                            onChange={(e) =>
                                setpatientdetail({
                                    ...patientdetail,
                                    dob: e.target.value
                                })
                            }
                        />
                    </div>

                    {/* ================= GENDER ================= */}
                    <div className="form-group">
                        <label>Gender</label>
                        <select
                            value={patientdetail.gender}
                            onChange={(e) =>
                                setpatientdetail({
                                    ...patientdetail,
                                    gender: e.target.value
                                })
                            }
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* ================= BLOOD GROUP ================= */}
                    <div className="form-group">
                        <label>Blood Group</label>
                        <input
                            type="text"
                            placeholder="e.g. O+, A-"
                            value={patientdetail.bloodgroup}
                            onChange={(e) =>
                                setpatientdetail({
                                    ...patientdetail,
                                    bloodgroup: e.target.value
                                })
                            }
                        />
                    </div>

                    {/* ================= PROFILE PHOTO ================= */}
                    <div className="form-group">
                        <label>Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </div>

                    {/* ================= ACTION BUTTONS ================= */}
                    <div className="actions">
                        <button
                            className="btn-save"
                            onClick={updateProfile}
                        >
                            💾 Save Changes
                        </button>

                        <button
                            className="btn-cancel"
                            onClick={() => setIsEdit(false)}
                        >
                            ✕ Cancel
                        </button>
                    </div>

                </div>
            )}


            {!isEdit && (<div className="profile-actions">
                <button
                    className="action-btn update-btn"
                    onClick={() => setIsEdit(true)}
                >
                    ✏️ Update Profile
                </button>

                <button
                    className="action-btn logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/login";
                    }}
                >
                    🚪 Logout
                </button>
            </div>)}



            {!isEdit && (
                <div className="info-box">
                    <span className="security-icon">🔒</span>
                    <div>
                        <strong>Your Data is Secure</strong>
                        <p>
                            Your health data is protected with advanced encryption
                            and strict privacy controls.
                        </p>
                    </div>
                </div>
            )}


            {!isEdit && (
                <div className="prescriptions-section">
                    <div className="section-header">
                        <h2 className="section-title">📋 Your Prescriptions</h2>
                        <span className="count-badge">{prescriptions.length}</span>
                    </div>

                    {loading ? (
                        <p>Loading prescriptions...</p>
                    ) : prescriptions.length > 0 ? (
                        <div className="prescription-grid">
                            {prescriptions.map((item) => (
                                <PrescriptionCard
                                    key={item.prescriptionId}
                                    data={item}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No prescriptions yet</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PatientDashboard;
