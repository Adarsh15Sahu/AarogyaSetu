import React from 'react'
import { useState } from 'react';
function UpdatePatientProfile() {
    const [profile, setProfile] = useState({
        name: "",
        mobile: "",
        address: "",
        bloodGroup: ""
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };
    return (
        <div className="profile-card">
            <h3>Update Profile</h3>

            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="mobile" placeholder="Mobile" onChange={handleChange} />
            <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
            <textarea name="address" placeholder="Address" onChange={handleChange} />

            <button>Save Changes</button>
        </div>
    )
}

export default UpdatePatientProfile
