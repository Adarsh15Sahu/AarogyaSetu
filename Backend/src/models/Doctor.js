const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    doctorcode: {
        type: String,
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require:true
    },
    password: {
        type: String,
        require: true
    },
    clinicname: {
        type: String,
        require: true
    },
    profilephoto: {
        type: String, 
    },
    clinicadd: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"]
    },
    role: {
        type: String,
        default:"doctor"
    },
    mypatients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients'
    }], 
    specialization: {
        type: String,
        require: true
    }
}, { timestamps: true });

DoctorSchema.pre("save", function (next) {
    if (!this.doctorcode && this._id) {
        this.doctorcode =
            "DC-" + this._id.toString().slice(-6).toUpperCase();
    }

});

module.exports = mongoose.model('Doctors', DoctorSchema)

