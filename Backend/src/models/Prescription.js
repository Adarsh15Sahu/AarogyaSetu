const mongoose = require('mongoose');


const PrescritionSchema = new mongoose.Schema({
    prescriptionCode: {
        type: String,
        require: true,
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patients',

    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
    },
    symptoms: {
        type: String,
        required: true
    },

    diagnosis: {
        type: String,
        required: true
    },

    medicines: [
        {
            name: {
                type: String,
                required: true
            },
            dosage: {
                type: String,
                required: true
            },
            duration: {
                type: String,
                required: true
            }
        }
    ],

    advice: {
        type: String
    },

    prescribedOn: {
        type: Date,
        required: true
    }


}, { timestamps: true })


PrescritionSchema.pre("save", function (next) {
    if (!this.prescriptionCode && this._id) {
        this.prescriptionCode =
            "RX-" + this._id.toString().slice(-6).toUpperCase();
    }

});

module.exports = mongoose.model("Prescriptions", PrescritionSchema);