const Doctors = require('../../models/Doctor')


exports.getdoctordetail = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        const Doctor = await Doctors.findOne({ _id: doctorId });

        if (!Doctor) {
            console.log("Doctor is not is find");
            res.status(500).json({
                message: "Doctor is not is find",
                success: false
            })
        }

        res.status(200).json({
            message: "successfully fetched doctor detail",
            success: true,
            doctor: {
                id: doctorId,
                doctorcode: Doctor.doctorcode,
                doctorName: Doctor.name,
                doctorEmail: Doctor.email,
                clinicname: Doctor.clinicname,
                clinicadd: Doctor.clinicadd,
                profilephoto: Doctor.profilephoto,
                mobile: Doctor.mobile,
                specialization: Doctor.specialization
            }
        })
    }
    catch (err) {
        console.log("error in getting data of doctor");
        res.status(400).json({
            message: "error in getting data of doctor",
            success: false
        })
    }
}