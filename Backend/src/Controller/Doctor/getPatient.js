const Doctor = require("../../models/Doctor");
const Prescriptions = require("../../models/Prescription")


exports.getPatient = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;

        const doctor = await Doctor.findOne({ _id: doctorId })

        if (!doctor) {
            console.log("Doctor not found");
            res.status(400).json({
                message: "Doctor is not found",
                success: false
            })
        }
        const patients = await Prescriptions.find({
            _id: { $in: doctor.mypatients }
        }).populate("patientId");
        
        const result = patients.map(p => ({
            presriptionId: p._id,
            prescriptionCOde: p.prescriptionCode,
            patient: {
                patientId: p.patientId._id,
                patientname: p.patientId.name,
                patientage: p.patientId.age,
                patientgender: p.patientId.gender
            }
        }));

        res.status(200).json({
            message: "Patient List is successfully achieved",
            success: true,
            patientsdetail: result
        })


    }
    catch (err) {
        console.log("something is wrong in fetching patient data ", err);
        res.status(500).json({
            message: "something is wrong in fetching patient data",
            success: false
        })
    }
}