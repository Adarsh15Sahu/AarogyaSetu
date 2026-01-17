const express = require('express');
const { doctorSignup } = require('../Controller/Doctor/DoctorSignup');
const { doctorLogin } = require('../Controller/Doctor/DoctorLogin');
const { doctorLogout } = require('../Controller/Doctor/DoctorLogout');
const { createPrescription } = require('../Controller/Doctor/NewPrescription');
const { addPrescription } = require('../Controller/Patient/addprescription');
const { getPatient } = require('../Controller/Doctor/getPatient');

const auth = require('../middlewares/authmiddleware')
const role = require('../middlewares/rolemiddeware');
const ownership = require('../middlewares/ownershipmiddleware');
const { getdoctordetail } = require('../Controller/Doctor/getdoctordetail');
const router = express.Router();



router.post('/signup', doctorSignup);
router.post('/login', doctorLogin);
router.post('/logout', doctorLogout);
router.post('/createprescription',
    auth,
    role("doctor"),
    ownership,
    createPrescription
)
const upload = require("../middlewares/cloudinaryupload");
const { updateDoctorProfile } = require("../Controller/Doctor/updateProfile");

router.put(
    "/updateProfile",
    auth,
    role("doctor"),
    upload.single("profilePhoto"),
    updateDoctorProfile
);

router.post('/addprescription',
    auth,
    role("doctor"),
    addPrescription
)

router.get('/getPatient/:doctorId',
    auth,
    role("doctor"),
    getPatient
)
router.get('/getdoctordetail/:doctorId',
    auth,
    role("doctor"),
    getdoctordetail
)
module.exports = router;