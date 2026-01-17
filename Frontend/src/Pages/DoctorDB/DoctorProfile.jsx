import api from "../../api/api";
import { useState, useEffect } from "react";
import "./DoctorProfile.css";
import toast from "react-hot-toast";
export default function DoctorProfile() {
    const [isEdit, setIsEdit] = useState(false);

    const [doctor, setDoctor] = useState({
        id: "",
        doctorcode: "",
        name: "",
        mobile: "",
        clinicName: "",
        address: "",
        doctorImage: "",
        specialization: ""
    });

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setDoctor({ ...doctor, doctorImage: e.target.files[0] });
    };

    const doctorId = localStorage.getItem("userId");
    const getdetail = async () => {
        const toastId = toast.loading("Fetching Details...");
        try {
            const res = await api.get(`/doctor/getdoctordetail/${doctorId}`);

            setDoctor({
                id: res.data.doctor.id,
                doctorcode: res.data.doctor.doctorcode,
                name: res.data.doctor.doctorName,
                mobile: res.data.doctor.mobile || "",
                clinicName: res.data.doctor.clinicname,
                address: res.data.doctor.clinicadd,
                doctorImage: res.data.doctor.profilephoto || "",


            });
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
    const handleUpdateProfile = async () => {
        try {
            const toastId = toast.loading("Updating profile...");
            const formData = new FormData();

            formData.append("name", doctor.name);
            formData.append("mobile", doctor.mobile);
            formData.append("clinicname", doctor.clinicName);
            formData.append("clinicadd", doctor.address);
            formData.append("specialization", doctor.specialization);
            if (doctor.doctorImage) {
                formData.append("profilePhoto", doctor.doctorImage);
            }

            const res = await api.put(
                "/doctor/updateProfile",
                formData
            );

            toast.success("Profile updated successfully ✅", {
                id: toastId,
            });
            setIsEdit(false);

            setDoctor(prev => ({
                ...prev,
                ...res.data.doctor
            }));

        } catch (err) {
            console.error("Profile update error", err);
            alert("Profile update failed ❌");
        }
    };

    return (
        <div className="profile-container">
            {!isEdit ? (

                <div className="profile-view-row">


                    <div className="profile-left">
                        <img
                            className="doctor-img"
                            src={
                                doctor.doctorImage instanceof File
                                    ? URL.createObjectURL(doctor.doctorImage)
                                    : doctor.doctorImage || "https://via.placeholder.com/180"
                            }
                            alt="Doctor"
                        />
                    </div>

                    <div className="profile-right">
                        <h2 className="doctor-name">{doctor.name}</h2>
                        <p className="clinic-title">{doctor.doctorcode}</p>
                        <p className="clinic-title">{doctor.id}</p>
                        <p className="clinic-title">{doctor.address}</p>

                        <div className="info-section">
                            <div className="info-item">
                                <span className="info-label">📱 Mobile</span>
                                <span className="info-value">{doctor.mobile}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">🏥 Clinic</span>
                                <span className="info-value">{doctor.clinicName}</span>
                            </div>

                            <div className="info-item">
                                <span className="info-label">Specialized</span>
                                <span className="info-value">{doctor.specialization}</span>
                            </div>
                        </div>

                        <button className="btn-edit" onClick={() => setIsEdit(true)}>
                            ✏️ Update Profile
                        </button>
                    </div>
                </div>
            ) : (

                <div className="edit">
                    <h2 className="edit-title">✏️ Edit Your Profile</h2>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={doctor.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={doctor.mobile}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Clinic Name</label>
                        <input
                            type="text"
                            name="clinicName"
                            value={doctor.clinicName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Clinic Address</label>
                        <textarea
                            name="address"
                            value={doctor.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Add Specialization</label>
                        <textarea
                            name="specialization"
                            value={doctor.specialization}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Doctor Image</label>
                        <input type="file" accept="image/*" onChange={handleImage} />
                    </div>

                    <div className="actions">
                        <button className="btn-save" onClick={handleUpdateProfile}>
                            💾 Save Changes
                        </button>
                        <button className="btn-cancel" onClick={() => setIsEdit(false)}>
                            ✕ Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
