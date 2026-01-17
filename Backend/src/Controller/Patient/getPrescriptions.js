const Patients = require('../../models/Patient')
const Prescriptions = require('../../models/Prescription');
exports.getPrescription = async (req, res) => {
    try {
        const patientId = req.params.patientId;
        const patient = await Patients.findOne({ _id: patientId });

        if (!patient) {
            console.log("Patient not found");
            return res.status(404).json({
                message: "Patient is not Found or registered",
                success: false
            })
        }
        
        const prescriptions = await Prescriptions.find({
        _id: { $in: patient.prescriptionlist }
        }).populate("doctorId");

        const result = prescriptions.map((p) => ({
            prescriptionId: p._id,
            prescriptionCode: p.prescriptionCode,
            diagnosis: p.diagnosis,
            symptoms: p.symptoms,
            medicines: p.medicines,
            prescribedOn: p.prescribedOn,
            doctor: {
                doctorId: p.doctorId._id,
                name: p.doctorId.name,
                mobile:p.doctorId.mobile,
                clinicName: p.doctorId.clinicname,
                specialization: p.doctorId.specialization
            }
        }));
        res.status(200).json({
            message: "Prescription are collected successfully",
            success: true,
            prescriptions: result
        });

        
    }
    catch (err) {
        console.log("Something is wrong in getting presriptionlist of patient", err);
        res.status(500).json({
            message: "Something is wrong in getting presriptionlist of patient",
            success: false
        })
    }
}