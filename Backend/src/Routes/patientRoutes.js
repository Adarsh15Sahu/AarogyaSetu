const express = require('express');
const { patientSignup } = require('../Controller/Patient/patientSignup');
const { patientsLogin } = require('../Controller/Patient/patientLogin');
const { patientLogout } = require('../Controller/Patient/patientLogout');
const { getPrescription } = require('../Controller/Patient/getPrescriptions');
const { getPatientDetail } = require('../Controller/Patient/getpatientdetail');
const { updatePatientProfile } = require('../Controller/Patient/updatepatientprofile');

const auth = require('../middlewares/authmiddleware');
const role = require('../middlewares/rolemiddeware');
const upload = require('../middlewares/cloudinaryupload');


const router = express.Router();

router.post('/signup', patientSignup);
router.post('/login', patientsLogin);
router.post('/logout', patientLogout);
router.get('/getPrescription/:patientId',
    auth,
    role("patient"),
    getPrescription);

router.get('/getpatientdetail/:patientcode',
    auth,
    role("doctor", "patient"),
    getPatientDetail
)
router.put(
    "/updateprofile",
    auth,
    role("patient"),
    upload.single("profilephoto"),
    updatePatientProfile
);

module.exports = router;