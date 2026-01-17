const Patients = require('..//../models/Patient');

exports.patientLogout = async (req, res) => {
    try {
        return res.status(200).json({
            message: "Patient Logout Successfully",
            success: true
        })
    }
    catch (err){
        console.log("Logout error", err);
        return res.status().jso({
            message: "Patient Logout unsuccessfull",
            success: false
        })
    }
}
