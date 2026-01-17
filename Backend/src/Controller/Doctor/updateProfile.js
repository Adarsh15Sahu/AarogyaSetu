const Doctors = require("../../models/Doctor");

exports.updateDoctorProfile = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const doctor = await Doctors.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        
        if (req.body.name) doctor.name = req.body.name;
        if (req.body.clinicname) doctor.clinicname = req.body.clinicname;
        if (req.body.clinicadd) doctor.clinicadd = req.body.clinicadd;
        if (req.body.mobile) doctor.mobile = req.body.mobile;
        if (req.body.specialization) doctor.specialization = req.body.specialization;
        if (req.file) {
            doctor.profilephoto = req.file.path;
        }

        await doctor.save();

        res.json({
            success: true,
            message: "Profile updated successfully",
            doctor,
        });
    } catch (err) {
        console.log("Profile update error", err);
        res.status(500).json({
            success: false,
            message: "Profile update failed",
        });
    }
};
