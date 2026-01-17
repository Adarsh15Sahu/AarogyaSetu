const Doctors = require('../../models/Doctor');
const jwt = require('jsonwebtoken');

exports.doctorSignup = async (req, res) => {
    
        try {
            
            const { name, email, password } = req.body;
    
            const varify = await Doctors.findOne({ email: email });
            if (varify) {
                return res.status(400).json({ message: "Dotor already exists", success: false });
            }
            const newDoctor = new Doctors({
                name,
                email,
                password
            })
            const token = jwt.sign(
                {
                    id: newDoctor._id,
                    role: newDoctor.role
                },
                process.env.REACT_APP_JWT_SECRET,
                {expiresIn:'2h'}
            )
            await newDoctor.save();
            res.status(200).json({
                message: "Doctor registered sucessfully",
                success: true,
                token,
                doctor: {
                    id: newDoctor._id,
                    doctorcode: newDoctor.doctorcode,
                    role: "doctor"
                },
            });
        }
        catch (err) {
            console.log("Error in Registration of Doctor", err);
            res.status(500).json({ message: "Doctor is not registered", success: false });
        }
}