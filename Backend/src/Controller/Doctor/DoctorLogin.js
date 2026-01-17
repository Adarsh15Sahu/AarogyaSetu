const Doctors = require('../../models/Doctor');
const jwt = require('jsonwebtoken');

exports.doctorLogin = async (req, res) => {
    try {
            const { email, password } = req.body;
            
            const doctor = await Doctors.findOne({ email });
            if (!doctor) {
                return res.status(400).json({
                    message: "Doctor does not exist",
                    success: false
                })
            }
    
        if (doctor.password !== password) {
            console.log("Invalid password");
                return res.status(400).json({
                    message: "Invalid Credentials",
                    success: false
                })
            }
    
            const token = jwt.sign(
                {
                    id: doctor._id,
                    role: doctor.role
                },
                process.env.REACT_APP_JWT_SECRET,
                {expiresIn: '2h'}
            )
    
            res.status(200).json({
                message: "Doctor Logged in successfully",
                success: true,
                token,
                doctor:{
                    id: doctor._id,
                    doctorcode: doctor.doctorcode,
                    role: "doctor"
                },
            });
        }
        catch (err) {
            console.log("Error in Doctor Login", err);
            res.status(500).json({
                message: "Error in Doctor Login",
                success: false
            })
        }
}