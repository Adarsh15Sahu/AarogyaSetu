const Patients = require('../../models/Patient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
        const isMatch = await bcrypt.compare(password, patient.password);
        if (! isMatch) {
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
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200).json({
            message: "Patient Logged in successfully",
            success: true,
            token,
            patient: {
                id: patient._id,
                patientcode: patient.patientcode,
                role: "Patient"
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