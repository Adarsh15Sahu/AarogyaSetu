import React, { useEffect, useState } from "react";
import Item from "../../Components/doctor/Item";
import api from "../../api/api";

function Patient_list() {
    const [my_patient, setmy_patient] = useState([]);
    const doctorId = localStorage.getItem("userId");

    const getlist = async () => {
        try {
            const res = await api.get(`/doctor/getPatient/${doctorId}`);

            setmy_patient(res.data.patientsdetail); // ✅ array store
        } catch (err) {
            console.error("Error fetching doctor's patient list", err);
        }
    };

    useEffect(() => {
        if (doctorId) {
            getlist();
        }
    }, [doctorId]);

    return (
        <div>
            {my_patient.length === 0 ? (
                <p style={{ textAlign: "center", marginTop: "20px", color: "#777" }}>
                    No patient yet
                </p>
            ) : (
                my_patient.map((item, index) => (
                    <Item
                        key={index}
                        Patient_id={item.patient.patientId}
                        Patient_name={item.patient.patientname}
                        Pescription_id={item.presriptionId}
                    />
                ))
            )}
        </div>
    );
}

export default Patient_list;
