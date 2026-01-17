const Patients = require('../../models/Patient');
const Doctors = require('../../models/Doctor');


exports.addPrescription = async (req, res) => {
    try {
        const doctorId = req.body.doctorId;
        const patientcode = req.body.patientcode;

        const Patient = await Patients.findOne({ patientcode : patientcode });
        const Doctor = await Doctors.findOne({ _id: doctorId });


        if (!Patient) {
            console.log("Patient not found");
            return res.status(404).json({
                message: "Patient is not Found or registered",
                success: false
            })
        }
        if (!Doctor) {
            console.log("Doctor not found");
            return res.status(404).json({
                message: "Doctor is not Found or registered",
                success: false
            })
        }
        const prescriptionList = Patient.prescriptionlist;
        prescriptionList.push(req.body.prescriptionId);
        const patientList = Doctor.mypatients;
        patientList.push(req.body.prescriptionId);


        await Patient.save();
        await Doctor.save();

        res.status(200).json({
            message: "New Prescription is saved",
            success: true,
            patientId: Patient._id,
            doctorId: Doctor._id,
            prescriptionId: req.body.prescriptionId
        })
    }
    catch (err) {
        console.log("Something is wrong in patient's new prescription",err);
        res.status(500).json({
            message: "Something is wrong in patient's new prescription",
            success: false
        })
    }


}