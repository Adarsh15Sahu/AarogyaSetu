const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    patientcode: {
        type: String,
        
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"]
    },
    profilephoto: {
        type: String, // Cloudinary URL
    },
    dob: {
        type: String,

    },
    gender: {
        type: String,

    },
    role: {
        type: String,
        default: "patient"
    },
    bloodgroup: {
        type: String
    },
    prescriptionlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
    }]

}, { timestamps: true })

PatientSchema.pre("save", function (next) {
    if (!this.patientcode && this._id) {
        this.patientcode =
            "PT-" + this._id.toString().slice(-6).toUpperCase();
    }

});

module.exports = mongoose.model('Patients', PatientSchema);