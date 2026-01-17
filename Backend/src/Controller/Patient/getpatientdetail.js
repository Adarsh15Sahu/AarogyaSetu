const Patients= require('../../models/Patient')


exports.getPatientDetail = async (req, res) => {
    try {
        const patientcode = req.params.patientcode;

        const patient = await Patients.findOne({ patientcode });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found",
                success: false
            });
        }

    
        const calculateAge = (dob) => {
            const birthDate = new Date(dob);
            const today = new Date();

            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }

            return age;
        };

        res.status(200).json({
            message: "Patient details fetched successfully",
            success: true,
            patient: {
                id: patient._id,
                patientcode: patient.patientcode,
                patientname: patient.name,
                age: calculateAge(patient.dob),   
                gender: patient.gender,
                bloodGroup: patient.bloodgroup,
                mobile: patient.mobile,                   
            }
        });

    } catch (err) {
        console.error("Error in getting patient data", err);
        res.status(500).json({
            message: "Error in getting patient data",
            success: false
        });
    }
};