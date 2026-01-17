const Prescriptions = require('../../models/Prescription');
const Patients = require('../../models/Patient')
const Doctors = require('../../models/Doctor')
exports.createPrescription = async (req, res) => {
    try {
        const { patientcode, symptoms, diagnosis, medicines, advice } = req.body;

        // Find patient by patientcode
        const patient = await Patients.findOne({ patientcode });
        if (!patient) {
            return res.status(404).json({
                message: "Patient not found",
                success: false
            });
        }

        const newPresription = new Prescriptions({
            patientId: patient._id,
            doctorId: req.user.id,
            symptoms,
            diagnosis,
            medicines,
            advice,
            prescribedOn: new Date()
        })

        await newPresription.save();

        const patientId = patient._id;
        const doctorId = req.user.id;

        const Patient = await Patients.findOne({ _id: patientId });
        const Doctor = await Doctors.findOne({ _id: doctorId });

        const prescriptionList = Patient.prescriptionlist;
        prescriptionList.push(newPresription._id);
        const patientList = Doctor.mypatients;
        patientList.push(newPresription._id);

        await Patient.save();
        await Doctor.save();

        res.status(200).json({
            message: "Prescription Saved Successfully",
            success: true,
            prescription: {
                id: newPresription._id,
                precriptioncode: newPresription.prescriptionCode
            }
        })

    }
    catch (err) {
        console.log("something is wrong in saving prescription", err);
        res.status(500).json({
            message: "Error in Prescription saving",
            success: false
        })
    }
}