const Patients = require("../../models/Patient")
exports.updatePatientProfile = async (req, res) => {
    try {
        const patientId = req.user.id;

        const { name, mobile, gender, bloodGroup } = req.body;

        const updateData = {
            name,
            mobile,
            gender,
            bloodgroup: bloodGroup
        };

        if (req.file) {
            updateData.profilephoto = req.file.path;
        }

        const updatedPatient = await Patients.findByIdAndUpdate(
            patientId,
            updateData,
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            patient: {
                name: updatedPatient.name,
                mobile: updatedPatient.mobile,
                gender: updatedPatient.gender,
                
                bloodgroup: updatedPatient.bloodgroup,
                profilephoto: updatedPatient.profilephoto
            }
        });

    } catch (err) {
        console.error("Error updating patient profile:", err);
        res.status(500).json({
            success: false,
            message: "Profile update failed",
            error: err.message
        });
    }
};
