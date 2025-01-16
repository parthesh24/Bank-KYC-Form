const express = require('express');
const { addUser, getUserByAadhar, getUserByPan, getUserByLicense } = require('../controllers/userController');
const router = express.Router();

router.post('/',addUser);
router.get('/aadhar/:aadharnumber',getUserByAadhar);
router.get('/pan/:pannumber',getUserByPan);
router.get('/license/:drivinglicensenumber',getUserByLicense);

module.exports = router;