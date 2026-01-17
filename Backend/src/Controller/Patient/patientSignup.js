const Patients = require('..//../models/Patient');
const jwt = require('jsonwebtoken');

exports.patientSignup = async (req, res) => {

    try {

        const { name, email, password, dob, bloodGroup, mobile } = req.body;

        const varify = await Patients.findOne({ email: email });
        if (varify) {

            return res.status(400).json({ message: "Patient already exists", success: false });
        }

        const newPatient = new Patients({
            name,
            email,
            password
        })
        await newPatient.save();

        const token = jwt.sign(
            { id: newPatient._id, role: newPatient.role },
            process.env.REACT_APP_JWT_SECRET,
            { expiresIn: '2h' }
        )

        res.status(200).json({
            message: "Patient registered successfully",
            success: true,
            token,
            patient: {
                id: newPatient._id,
                patientcode: newPatient.patientcode,
                role: "patient"
            }
        });
    }
    catch (err) {
        console.log("Error in Registration of Patient", err);
        res.status(500).json({ message: "Patient is not registered", success: false });
    }

}

