const Patients = require('../../models/Patient');
const jwt = require('jsonwebtoken');
exports.patientsLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const patient = await Patients.findOne({ email });
        if (!patient) {
            return res.status(400).json({
                message: "Patient does not exist",
                success: false
            })
        }

        if (patient.password !== password) {
            return res.status(400).json({
                message: "Invalid Credentials",
                success: false
            })
        }

        const token = jwt.sign(
            {
                id: patient._id,
                role: patient.role
            },
            process.env.REACT_APP_JWT_SECRET,
            {expiresIn: '2h'}
        )

        res.status(200).json({
            message: "Patient Logged in successfully",
            success: true,
            token,
            patient: {
                id: patient._id,
                patientcode: patient.patientcode,
                role:"Patient"
            }
        });
    }
    catch (err) {
        console.log("Error in Patient Login", err);
        res.status(500).json({
            message: "Error in Patient Login",
            success: false
        })
    }
}